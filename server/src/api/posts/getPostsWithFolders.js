import getPostFolders from './getPostFolders';
import getPosts from './getPosts';

const getPostsWithFolders = async (folderName) => {
    const posts = await getPosts(folderName);
    const postsWithFolders = [];

    for (const post of posts) {
        const postFolders = await getPostFolders(post.folders);
        postsWithFolders.push({...post, folders: postFolders});
    }
    return postsWithFolders;
}
export default getPostsWithFolders;