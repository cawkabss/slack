import React from 'react';
import { Router } from "@reach/router";
import 'evokit/dist/style.css';
import 'evokit/dist/theme.dark.css';

import Header from './Header';
import Container from './UI/Container';
import PostsPage from './PostsPage';
import SettingsPage from './SettingsPage';

const App = (props) => (
    <React.Fragment>
        <Header/>
        <Container>
            <Router>
                <PostsPage path='/' />
                <SettingsPage path='/settings' />
            </Router>
        </Container>
    </React.Fragment>
);

export default App;