import axios from 'axios';

import config from '../config';
import sendMessage from './sendMessage'
import savePost from './api/posts/savePost';
import getSettings from './api/settings/getSettings';


const checkReactions = async ({channel, ts}) => {
    const data = {
        channel,
        timestamp: ts,
    };

    const configuration = {
        method: 'get',
        url: `${config.slackApiUrl}/reactions.get`,
        headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${config.botToken}`},
        params: data,
      }

    const { message, channel: messageChannel } = await axios(configuration).data;
    const { likeReaction, reactionCount } = await getSettings();
    const likesCount = message.reactions.find(reaction => reaction.name === likeReaction).count;

    if (likesCount >= reactionCount) {
        savePost(message, likesCount).then(() => sendMessage( messageChannel, message.ts));
    }
};

export default checkReactions;