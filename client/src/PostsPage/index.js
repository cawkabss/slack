import React from 'react';
import axios from 'axios';
import { Grid, Box, Line } from 'evokit';

import Spinner from 'UI/Spinner';
import Folders from './Folders';
import PostCard from './PostCard';

import css from './PostsPage.sss';

class PostsPage extends React.Component {
    state = {
        posts: [],
        folders: [],
        cachedPosts: {},
        activeFolder: null,
        postsLoaded: false,
        foldersLoaded: false,
    }

    componentDidMount() {
        const activeFolder = this.getActiveFolderName(location.search);

        this.getPosts(activeFolder);
        
        axios.get('/api/folders')
            .then(({ data }) => this.setState({
                folders: data.map(folder => folder),
                foldersLoaded: true,
                activeFolder,
            }));
    };

    getActiveFolderName = (queryString) => {
        const params = new URLSearchParams(queryString);
        return params.get('folder');
    }

    componentDidUpdate(prevProps) {
        const currentFolder = this.getActiveFolderName(prevProps.location.search);
        const nextFolder = this.getActiveFolderName(this.props.location.search);
        if (nextFolder !== currentFolder) {
            this.setState({
                activeFolder: nextFolder,
            })
            return this.getPosts(nextFolder);
        }
    }

    getPosts = (folderName) => {
        const { cachedPosts } = this.state;
        const postUrl = folderName ? `/api/posts?folder=${folderName}` : '/api/posts';

        if ( cachedPosts[folderName] ) {
            return this.setState({
                posts: cachedPosts[folderName],
                postsLoaded: true,
            });
        }
        
        this.setState({
            postsLoaded: false,
        });

        axios.get(postUrl)
            .then(({ data }) => {
                const { activeFolder } = this.state;
                if (activeFolder === folderName) {
                    return this.setState((state) => ({
                        posts: data.map(post => post),
                        cachedPosts: {
                            ...state.cachedPosts,
                            [folderName]: data.map(post => post),
                        },
                        postsLoaded: true,
                    }))
                }
                this.setState(state => ({
                    cachedPosts: {
                        ...state.cachedPosts,
                        [folderName]: data.map(post => post),
                    },
                }))
            });
    }

    renderPost = (postData) => {
        const { id, text, likesCount, folders, attachments, permalink } = postData;

        const title = (attachments && (attachments[0].title || attachments[0].text)) ||
            text.replace(/<https?.*>/, '');
        const link = attachments && attachments[0].from_url || text.match(/https?.*\w/)[0];

        const transformedData = {
            title,
            link,
            likesCount,
            folders,
            permalink,
        };

        return (
            <Grid.Item key={id}>
                <PostCard {...transformedData }/>
            </Grid.Item>
        );
    }

    render() {
        const { folders, foldersLoaded, posts, postsLoaded } = this.state;

        return (
                <React.Fragment>
                    <Box box-margin-tb='l'>
                        {
                            !foldersLoaded ? (
                                <div className={css.spinner}>
                                    <Spinner
                                        theme='blue'
                                        size='small'
                                        centered
                                    />
                                </div>
                            ) : (
                                <Folders
                                    folders={folders}
                                />
                            )
                        }
                    </Box>
                    <Line line-indent='l'/>
                    <Grid
                        grid-indent='m'
                        grid-column='4'
                    >
                        {
                            !postsLoaded ? (
                                <div className={css.spinner}>
                                    <Spinner
                                        theme='blue'
                                        size='small'
                                        centered
                                    />
                                </div>
                            ) : (
                                posts.map(post => this.renderPost(post))
                            )
                        }
                    </Grid>
                </React.Fragment>
        )
    }
};

export default PostsPage;