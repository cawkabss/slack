import React from 'react';
import { Grid } from 'evokit';
import classSet from 'classnames';

import Tooltip from '../../../../../UI/Tooltip';
import InputField from '../../../../../UI/InputFileld';
import Button from '../../../../../UI/Button';
import SvgIcon from '../../../../../UI/SvgIcon';
import Spinner from '../../../../../UI/Spinner';
import FileUploadHOC from '../../../../../HOC/UploadFileHOC';

import imageIcon from './add-image.svg';
import css from './FolderForm.sss';

let FolderIcon = ({iconUrl, onChoiceFile, holderClassName, iconClassName, errors}) => {
    const icon = (
        <div
            className={classSet(holderClassName, {
                [css.iconError]: errors
            })}
            onClick={onChoiceFile}
        >
            {
                iconUrl ? (
                    <img
                        className={iconClassName}
                        src={iconUrl}
                    />
                ) : (
                    <SvgIcon
                        className={css.noIcon}
                        icon={imageIcon}
                    />
                )
            }
        </div>
    );

    if (errors) {
        return (
            <Tooltip
                content={errors}
                placement='top'
                theme='black'
                isFixed
                isHover
            >
                { icon }
            </Tooltip>
        );
    }

    return icon;
};

FolderIcon = FileUploadHOC(FolderIcon);

const FolderForm = ({iconUrl, name, reaction, errors, isEdited, isSaving, changeIconHandler, changeDataHandler, saveFolderHandler, deleteFolderHandler}) => (
    <div className={classSet(css.root, {
            [css.stateLodaing]: isSaving,
        })}
    >
        <Grid grid-wrap='nowrap' grid-indent='s' grid-valign='bottom'>
            <Grid.Item>
                <InputField
                    label='Папка:'
                    type='text'
                    value={name}
                    name='name'
                    onChange={changeDataHandler}
                    errors={errors && errors.name}
                />
            </Grid.Item>
            <Grid.Item>
                <InputField
                    label='Реакция:'
                    type='text'
                    value={reaction}
                    name='reaction'
                    onChange={changeDataHandler}
                    errors={errors && errors.reaction}
                />
            </Grid.Item>
            <Grid.Item>
                <FolderIcon
                    holderClassName={css.iconHolder}
                    iconClassName={css.icon}
                    iconUrl={iconUrl}
                    onChange={changeIconHandler}
                    name='icon'
                    errors={errors && errors.icon}
                />
            </Grid.Item>
            {
                isEdited && (
                    <Grid.Item>
                        <Button
                            onClick={saveFolderHandler}
                            theme='green'
                        >
                            Сохранить
                        </Button>
                    </Grid.Item>
                )
            }
            <Grid.Item>
                <Button
                    onClick={deleteFolderHandler}
                    theme='red'
                >
                    Удалить
                </Button>
            </Grid.Item>
            {
                isSaving && (
                    <Spinner
                        theme='blue'
                        size='small'
                    />
                )
            }
        </Grid>
    </div>
);

export default FolderForm;