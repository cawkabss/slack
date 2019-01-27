import React from 'react';
import { Box } from 'evokit';

import Header from './Header';
import Spinner from 'UI/Spinner';

import css from './Section.sss';

const SettingsSection = ({loading, icon, title, children}) => (
    <Box box-margin-top='l'>
        <Header
            title={title}
            icon={icon}
        />
        {
            loading ? (
                <div className={css.spinner} >
                    <Spinner
                        theme='blue'
                        size='small'
                    />
                </div>
            ) : children
        }
    </Box>
);

export default SettingsSection;
