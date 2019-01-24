import axios from 'axios';

import config from '../config';

const sendMessage =  (channel, timestamp) => {
    const data = {
        channel,
        text: 'Jge,kиковано на  http://localhost:4000/dasda',
        thread_ts: timestamp,
    };

    const configuration = {
        method: 'post',
        url: `${config.slackApiUrl}/chat.postMessage`,
        headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${config.botToken}`},
        data: JSON.stringify(data),
      }

    return axios(configuration).then(res => console.log(res));
};

export default sendMessage;