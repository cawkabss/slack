global.XMLHttpRequest = require("xhr2"); // ned for firebase storage

import {db, storage} from '../../db';
import getFolder from './getFolder';
import getPosts from '../posts/getPosts';


const saveFolder = async (id, iconFile, settings) => {
    let { name, reaction, iconUrl } = settings;

    if (iconFile) {
        const ref = storage.ref().child(`images/${iconFile.originalname}`);
        const snapshot = await ref.put(iconFile.buffer);
        iconUrl = await snapshot.ref.getDownloadURL();
    }

    const newFolderData = {
        name,
        reaction,
        iconUrl,
    };

    const posts = await getPosts();
    const batch = db.batch();

    const folderRef = db.collection('folders').doc(id);
    const oldFolderData = await folderRef.get()
    const isReactionChanged = oldFolderData.data().reaction !== newFolderData.reaction;

    batch.update(folderRef, newFolderData);

    posts.forEach(post => {
        const postRef = db.collection('posts').doc(post.id);
        const postFolders = isReactionChanged ?
            post.folders.filter((folder) => folder.reaction !== oldFolderData.reaction) :
            [...post.folders];

        post.reactions.forEach(postReaction => {
            if (postReaction.name === reaction && !post.folders.includes(id)) {
                postFolders.push(id);
            }
        });
        batch.update(postRef, {'folders': postFolders});
        
    })

    return await batch.commit().then(async () => await getFolder(id));
}

export default saveFolder;