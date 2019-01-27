import {db} from '../../db';

const getPost = async (id) => {
    const post = await db.collection('folders').doc(id).get();
    return {
        id,
        ...post.data(),
    };
};

export default getPost;