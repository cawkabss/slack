import {db} from '../../db';

const getFolder = async (id) => {
    const folder = await db.collection('folders').doc(id).get();
    return {
        id: folder.id,
        ...folder.data(),
    };
};

export default getFolder;