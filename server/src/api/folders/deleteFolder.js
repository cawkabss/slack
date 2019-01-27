import getPosts from '../posts/getPostsWithFolders';
import {db} from '../../db';


const deleteFolder = async (id) => {
    const posts = await getPosts();
    const batch = db.batch();
    const folderRef = db.collection('folders').doc(id);
    batch.delete(folderRef);

    posts.forEach(post => {
        const postRef = db.collection('posts').doc(post.id);
        const foldersIds = post.folders.map(folder => folder.id);
        batch.update(postRef, {'folders': foldersIds.filter(folderId => folderId !== id)});
    })
    
    return await batch.commit().then(res => console.log(res));
}


export default deleteFolder;