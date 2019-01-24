import express from 'express';
import bodyParser from 'body-parser';

import addReactions from './addReactions';
import checkReactions from './checkReactions';

const app = express();

app.use(bodyParser());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api', function (req, res) {
    res.end('Hello World!');
});

app.post('/', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));
    
    if (req.body.event.type === 'message' && req.body.event.subtype !== 'bot_message' && !req.body.event.thread_ts) {
        addReactions(req.body.event.channel, req.body.event.event_ts);
    } else if (req.body.event.type === 'reaction_added') {
        checkReactions(req.body.event.item.channel, req.body.event.item.ts);
    }
});

app.listen(4000, function () {
    console.log('Example app listening on port 3000!');
});