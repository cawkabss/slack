import React from 'react';

import css from './Container.sss';

const Container = (props) => (
    <div className={css.root}>
        { props.children }
    </div>
);

export default Container;