import React from 'react';
import { Line } from 'evokit';

import MainSettings from './views/MainSettings';
import Folders from './views/FordersSettings';

const SettingsPage = () => (
    <React.Fragment>
        <MainSettings />
        <Line line-indent='m' />
        <Folders/>
    </React.Fragment>
)

export default SettingsPage;
