import {db} from '../../db';

const getFolderByName = async (name) => {
    const folderList = await db.collection('folders').where('name', '==', name).get();
    let folder = {};
    folderList.forEach(folderSnapshot => {
        folder = {
            id: folderSnapshot.id,
            ...folderSnapshot.data(),
        }
    });

    return folder;
};

export default getFolderByName;