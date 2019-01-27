import {db} from '../../db';

const saveSettings = async (settings) => {
    return await db.collection('settings').doc('main').set(settings).then(() => settings);
};

export default saveSettings;
