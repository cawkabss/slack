import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import addReactions from './addReactions';
import checkReactions from './checkReactions';
import getPostsWithFolders from './api/posts/getPostsWithFolders';
import createNewFolder from './api/folders/createNewFolder';
import getFolders from './api/folders/getFolders';
import updateFolder from './api/folders/updateFolder';
import getSettings from "./api/settings/getSettings";
import saveSettings from "./api/settings/saveSettings";
import deleteFolder from './api/folders/deleteFolder';

const upload = multer();
const app = express();

app.use(bodyParser.json());

app.get('/api/posts', function (req, res) {
    const folderName = req.query.folder;
    getPostsWithFolders(folderName).then(posts => res.send(posts));
});

app.post('/api/folders', upload.single('iconFile'), function (req, res) {
    createNewFolder(req.file, req.body).then(folderData => res.send(folderData));
});

app.put('/api/folders/:id', upload.single('iconFile'), function (req, res) {
    updateFolder(req.params.id, req.file, req.body).then(folderData => res.send(folderData));
});

app.get('/api/folders', (req, res) => {
    getFolders().then(folders => res.send(folders));
});

app.delete('/api/folders/:id', (req, res) => {
    deleteFolder(req.params.id).then(folderData => res.send({}));
});

app.get('/api/settings', (req, res) => {
    getSettings().then(settings => res.send({...settings}));
});

app.put('/api/settings', (req, res) => {
    saveSettings(req.body).then(settings => res.send(settings));
});

app.post('/', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

    if (!req.body.event) return;

    if (req.body.event.type === 'message' && req.body.event.subtype !== 'bot_message' && !req.body.event.thread_ts) {
        addReactions(req.body.event.channel, req.body.event.event_ts);
    } else if (req.body.event.type === 'reaction_added') {
        checkReactions(req.body.event.item);
    }
});

app.listen(4000, function () {
    console.log('Example app listening on port 3000!');
});

export default app;