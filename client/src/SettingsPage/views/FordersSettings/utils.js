
import { validateFileExtension } from '../../../utils';

const ALLOWED_ICON_EXTENSIONS = ['.jpg', '.png'];
const ICON_EXTENSIONS_ERROR_MSG = `Неправильный формат иконки!\n
    Доступные форматы: ${ALLOWED_ICON_EXTENSIONS.join(', ')}`;
const EMPTY_FIELD_ERROR_MSG = 'Обязательное поле!';
const FOLDER_ICON_ERROR_MSG = 'Загрузите иконку для папки!';

export const validateFolderData = (data) => {
    const { name, reaction, iconFile, iconUrl } = data;
    const errors = {};

    if (!name || !name.length) {
        errors.name = EMPTY_FIELD_ERROR_MSG;
    }
    if (!reaction || !reaction.length) {
        errors.reaction = EMPTY_FIELD_ERROR_MSG;
    }
    if (!iconFile && !iconUrl) {
        errors.icon = FOLDER_ICON_ERROR_MSG;
    } 

    if (Object.keys(errors).length) throw new Error(JSON.stringify(errors));
};

export const validateFolderIcon = (fileName) => {
    return validateFileExtension(ALLOWED_ICON_EXTENSIONS, fileName) ?
        null : ICON_EXTENSIONS_ERROR_MSG;
};