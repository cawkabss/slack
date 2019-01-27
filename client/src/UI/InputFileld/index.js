import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'evokit';
import classNames from 'classnames';

import Tooltip from '../Tooltip';
import SvgIcon from '../../UI/SvgIcon';
import infoIcon from './info.svg';
import css from './InputField.sss';

const InputField = ({direction, label, value, name, type, disabled, onChange, errors}) => (
    <div className={css.root}>
        <Grid
            grid-indent='m'
            grid-direction={direction}
            grid-valign={direction === 'column' ? 'reset' : 'middle'}
        >
            {
                label && (
                    <Grid.Item>
                        <label className={css.label} htmlFor={name}>
                            { label }
                        </label>
                    </Grid.Item>
                )
            }
            <Grid.Item>
                <div className={css.holder}>
                    <input
                        className={classNames(css.field, {
                            [css.stateError]: errors
                        })}
                        type={type}
                        name={name}
                        value={value}
                        disabled={disabled}
                        onChange={onChange}
                    />
                    {
                        errors && (
                            <div className={css.iconHolder}>
                                <Tooltip
                                    content={errors}
                                    placement='top-left'
                                    theme='black'
                                    isFixed
                                    isHover
                                >
                                    <SvgIcon
                                       className={css.icon}
                                       icon={infoIcon} 
                                    />
                                </Tooltip>
                            </div>
                        )
                    }
                </div>
            </Grid.Item>
        </Grid>
    </div>
);

InputField.defaultProps = {
    value: '',
    label: '',
    type: 'text',
    direction: 'column',
};

InputField.propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.string,
    direction: PropTypes.string,
};

export default InputField;