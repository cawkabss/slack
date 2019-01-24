import axios from 'axios';

import config from '../config';
import sendMessage from './sendMessage'

const checkReactions =  (channel, timestamp) => {
    const data = {
        channel,
        timestamp,
    };

    const configuration = {
        method: 'get',
        url: `${config.slackApiUrl}/reactions.get`,
        headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${config.botToken}`},
        params: data,
      }

    return axios(configuration).then(res => {
        const thumsupReaction = res.data.message.reactions.find(reaction => reaction.name === 'fire')
        if (thumsupReaction.count >= 3) {
            // console.log(res.data)
            sendMessage( res.data.channel, res.data.message.ts)
            // save to DB and post message with link
            /*

            // only TEXT
            { client_msg_id: 'efcfbf86-a7d5-4c3a-943a-d2e68f79920a',
                type: 'message',
                text: 'asda',
                user: 'UFC781DGA',
                ts: '1547296690.030100',
                permalink: 'https://frontend-p2p6847.slack.com/archives/GFC7AFFPU/p1547296690030100',
                reactions: [ { name: '+1', users: [Array], count: 3 } ] }


            //with Link

            { client_msg_id: '6ad273f4-6b51-4ecf-a908-0ddd6588b665',
                type: 'message',
                text: 'asdasd\n<https://beta.observablehq.com/@pallada-92/sql-3d-engine>',
                user: 'UFC781DGA',
                ts: '1547296780.030600',
                attachments:
                [ { title: 'SQL 3d engine (interactive preview)',
                    title_link: 'https://beta.observablehq.com/@pallada-92/sql-3d-engine',
                    text: 'An Observable notebook by Yaroslav Sergienko.',
                    fallback: 'SQL 3d engine (interactive preview)',
                    image_url: 'https://static.observableusercontent.com/thumbnail/93df0b13099c8204d7fa96b1c437e069d1d5938732a7c77f60f04a1e637ffc1e.jpg',
                    from_url: 'https://beta.observablehq.com/@pallada-92/sql-3d-engine',
                    image_width: 400,
                    image_height: 250,
                    image_bytes: 55678,
                    service_icon: 'https://static.observablehq.com/favicon-512.e994d8ef78e387a9715cc1aab4dfdbc250bf565186e1165a931b055d1e02e84d.png',
                    service_name: 'beta.observablehq.com',
                    id: 1,
                    original_url: 'https://beta.observablehq.com/@pallada-92/sql-3d-engine' } ],
                permalink: 'https://frontend-p2p6847.slack.com/archives/GFC7AFFPU/p1547296780030600',
                reactions: [ { name: '+1', users: [Array], count: 3 } ] }



            // with YOUTUBE
            { client_msg_id: 'af25170b-2784-442c-acad-265c82caf46b',
                type: 'message',
                text: 'asdsadasd <https://www.youtube.com/watch?v=Kpgz6OPHNkI>',
                user: 'UFC781DGA',
                ts: '1547296594.029500',
                attachments:
                [ { service_name: 'YouTube',
                    service_url: 'https://www.youtube.com/',
                    title: 'Виталий Бабушко – Хата на тата 7 сезон. Выпуск 2 от 03.09.2018',
                    title_link: 'https://www.youtube.com/watch?v=Kpgz6OPHNkI',
                    author_name: 'Хата на тата',
                    author_link: 'https://www.youtube.com/user/hatanatata',
                    thumb_url: 'https://i.ytimg.com/vi/Kpgz6OPHNkI/hqdefault.jpg',
                    thumb_width: 480,
                    thumb_height: 360,
                    fallback: 'YouTube Video: Виталий Бабушко – Хата на тата 7 сезон. Выпуск 2 от 03.09.2018',
                    video_html: '<iframe width="400" height="225" src="https://www.youtube.com/embed/Kpgz6OPHNkI?feature=oembed&autoplay=1&iv_load_policy=3" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    video_html_width: 400,
                    video_html_height: 225,
                    from_url: 'https://www.youtube.com/watch?v=Kpgz6OPHNkI',
                    service_icon: 'https://a.slack-edge.com/2089/img/unfurl_icons/youtube.png',
                    id: 1,
                    original_url: 'https://www.youtube.com/watch?v=Kpgz6OPHNkI' } ],
                permalink: 'https://frontend-p2p6847.slack.com/archives/GFC7AFFPU/p1547296594029500',
                reactions: [ { name: '+1', users: [Array], count: 3 } ] }

            */
        }
    });
};

export default checkReactions;