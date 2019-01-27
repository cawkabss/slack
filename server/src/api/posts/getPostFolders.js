import getFolder from "../folders/getFolder";

const getPostFolders = (foldersIds) => {
    const postFolders = foldersIds.map(folderId => getFolder(folderId));

    return Promise.all(postFolders);
};

export default getPostFolders;
