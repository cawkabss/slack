const getFoldersFromReactions = async (reactions) => {
    const rNames = reactions.map(reaction => reaction.name);
    const rNamesSet = new Set(rNames);
    const folders = await getFolders();

    return folders.filter(folder => rNamesSet.has(folder.name));
};

export default getFoldersFromReactions;