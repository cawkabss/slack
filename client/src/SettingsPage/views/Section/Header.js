import React from 'react';
import { Grid, Box, Text } from 'evokit';

import SvgIcon from 'UI/SvgIcon';
import css from './Header.sss';

const Header = ({title, icon}) => (
    <Box box-margin-bottom='l'>
        <Grid grid-indent='s' grid-wrap='nowrap'>
            <Grid.Item>
                <SvgIcon
                    className={css.icon}
                    icon={icon}
                />
            </Grid.Item>
            <Grid.Item>
                <Text text-size='h2'>
                    { title }
                </Text>
            </Grid.Item>
        </Grid>
    </Box>
);

export default Header;