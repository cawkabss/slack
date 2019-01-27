import {db} from '../../db';

import getFoldersFromReactions from '../folders/getFoldersFromReactions';

const savePost = async (messageData, likesCount) => {
    const postFolders = await getFoldersFromReactions(messageData.reactions);
    const postFoldersId = postFolders.map(folder => folder.id);

    const postData = {
        ...messageData,
        folders: postFoldersId,
        likesCount,
    };

    return db.collection('posts').doc(postData.client_msg_id).set(postData);
};

export default savePost;