import {db} from '../../db';

const getFolders = async () => {
    const folders = [];
    const snapshot = await db.collection('folders').get();
    snapshot.forEach(folder => folders.push({id: folder.id, ...folder.data()}));
    return folders;
};

export default getFolders;