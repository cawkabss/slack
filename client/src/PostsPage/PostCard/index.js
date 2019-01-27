import React from 'react';
import { Grid, Box, Text } from 'evokit';

import SvgIcon from '../../UI/SvgIcon';
import slackIcon from './slack.svg';
import likeIcon from './like.svg';
import css from './PostCard.sss';

const PostHeader = ({ likesCount, folders }) => (
    <Box box-margin-bottom='m'>
        <Grid
            grid-wrap='wrap'
            grid-indent='xxs'
            grid-valign='middle'
        >
            <Grid.Item>
                <div className={css.likes}>
                    { likesCount }
                </div>
            </Grid.Item>
            <Grid.Item>
                <SvgIcon
                    className={css.likeIcon}
                    icon={likeIcon}
                />
            </Grid.Item>
            {
                folders.map(folder => (
                    <Grid.Item key={folder.id}>
                        <img
                            className={css.folderIcon}
                            src={folder.iconUrl}
                            alt='folder'
                        />
                    </Grid.Item>
                ))
            }
        </Grid>
    </Box>
);

const PostCard = ({ title, permalink, link, likes, folders }) => (
    <div className={css.root}>
        <Grid className={css.card}>
            <Grid.Item mix-width='expand'>
                <a
                    className={css.link}
                    href={link}
                    target='_blank'
                >

                    <PostHeader
                        likes={likes}
                        folders={folders}
                    />
                    <div className={css.content}>
                        {
                            title && (
                                <p className={css.title}>
                                    {title}
                                </p>
                            )
                        }
                        <p className={css.linkUrl}>
                            {link}
                        </p>
                    </div>
                </a>
            </Grid.Item>
            <Grid.Item>
                <a
                    className={css.link}
                    href={permalink}
                    target='_blank'
                >
                    <SvgIcon
                        className={css.slackIcon}
                        icon={slackIcon}
                    />
                </a>
            </Grid.Item>
        </Grid>
    </div>
);

PostCard.defaultProps = {
    likes: 0,
    folders: [],
}


export default PostCard;
