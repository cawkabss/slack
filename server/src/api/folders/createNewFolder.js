global.XMLHttpRequest = require("xhr2"); // ned for firebase storage

import {db, storage} from '../../db';
import getPosts from '../posts/getPosts';

const createNewFolder = async (iconFile, settings) => {
    const { name, reaction } = settings;
    const ref = storage.ref().child(`images/${iconFile.originalname}`);
    const snapshot = await ref.put(iconFile.buffer);
    const iconUrl = await snapshot.ref.getDownloadURL();
    const folderData = {
        name,
        reaction,
        iconUrl,
    };

    const folderRef = await db.collection('folders').add(folderData);
    const folderSnapshot = await folderRef.get();
    const posts = await getPosts();
    const batch = db.batch();

    posts.forEach(post => {
        const postRef = db.collection('posts').doc(post.id);
        const postFolders = [...post.folders];

        post.reactions.forEach(postReaction => {
            if (postReaction.name === reaction && !post.folders.includes(folderSnapshot.id)) {
                postFolders.push(folderSnapshot.id);
                batch.update(postRef, {'folders': postFolders});
            }
        } );
        
    });

    return await batch.commit()
        .then(() => ({
            id: folderSnapshot.id,
            ...folderSnapshot.data(),
        })
    );
}

export default createNewFolder;