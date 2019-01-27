import React from 'react';
import PropTypes from 'prop-types';
import classSet from 'classnames';

import css from './Overlay.sss';

const Overlay = ({children, position }) => (
    <div
        className={classSet(css.root, {
            [css.fixed]: position === 'fixed',
            [css.absolute]: position === 'absolute'
        })}
    >
        {children}
    </div>
);

Overlay.defaultProps = {
    position: 'absolute',
};

Overlay.propTypes = {
    children: PropTypes.node.isRequired,
    position: PropTypes.oneOf(['fixed', 'absolute']),
};

export default Overlay;