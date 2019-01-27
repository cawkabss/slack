import {db} from '../../db';
import getFolderByName from '../folders/getFolderByName';

const getPosts = async (folderName) => {
    const posts = [];
    const folder = folderName ? await getFolderByName(folderName) : null;
    let postsSnaphot;
    if (folder) {
        postsSnaphot = await db.collection('posts').where("folders", "array-contains", folder.id).get();
    } else {
        postsSnaphot = await db.collection('posts').get();
    }
    postsSnaphot.forEach((post) => {
        posts.push({
            id: post.id,
            ...post.data(),
        })
    });

    return posts;
}
export default getPosts;