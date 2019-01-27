import {db} from '../../db';

const getSettings = async () => {
    const document = await db.collection('settings').doc('main').get();
    return document.data();
};

export default getSettings;