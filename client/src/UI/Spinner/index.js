import React from 'react';
import PropTypes from 'prop-types';
import classSet from 'classnames';

import css from './Spinner.sss';

const Spinner = ({ theme, size }) => (
    <span className={classSet(css.root, {
        [css.themeBlue]: theme === 'blue',
        [css.sizeSmall]: size === 'small',
    })}
    >
        Loading...
    </span>
);

Spinner.defaultProps = {
    theme: 'blue',
    size: 'default',
};

Spinner.propTypes = {
    theme: PropTypes.oneOf(['blue']),
    size: PropTypes.oneOf(['small', 'default']),
}

export default Spinner;