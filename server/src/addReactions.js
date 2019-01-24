import axios from 'axios';

import config from '../config';

const addReactions =  (channel, timestamp) => {
    const data = {
        channel,
        timestamp,
        name: 'fire',
    };

    const configuration = {
        method: 'post',
        url: `${config.slackApiUrl}/reactions.add`,
        headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${config.botToken}`},
        data: JSON.stringify(data),
      }

    return axios(configuration);
};

export default addReactions;