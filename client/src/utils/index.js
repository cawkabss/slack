export const validateFileExtension = (allowedExtensions, fileName) => {
    const regExp = new RegExp(`(${allowedExtensions.map(ext => `\\${ext}`).join('|')})$`);

    return !!regExp.exec(fileName);
}