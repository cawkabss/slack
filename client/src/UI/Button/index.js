import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Button.sss';

const Button = ({onClick, children, type, theme, active, ...rest}) => (
    <button
        className={classNames(css.root,
            {
                [css.active]: active,
                [css.themeGreen]: theme === 'green',
                [css.themeRed]: theme === 'red',
                [css.themeOrange]: theme === 'orange',
                [css.default]: type === 'default',
                [css.bordered]: type === 'bordered',
                [css.filled]: type === 'filled',
            }
        )}
        onClick={onClick}
        { ...rest }
    >
        { children }
    </button>
);

Button.defaultProps = {
    type: 'default',
};

Button.propTypes = {
    type: PropTypes.oneOf(['default', 'bordered', 'filled']),
    theme: PropTypes.oneOf(['green', 'red', 'orange']),
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
};

export default Button;