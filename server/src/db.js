import xhr2 from 'xhr2';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
global.XMLHttpRequest = xhr2; // ned for firebase storage

import config from '../config';

const app = firebase.initializeApp(config.firebase);

export const db = app.firestore();
export const storage = app.storage();