import React from 'react';
import axios from 'axios';
import { Box } from 'evokit';

import FolderForm from '../FolderForm';
import Button from '../../../../../UI/Button';
import { validateFileExtension } from '../../../../../utils';

const ALLOWED_ICON_EXTENSIONS = ['.jpg', '.png'];
const ICON_EXTENSIONS_ERROR_MSG = `Неправильный формат иконки!\n
    Доступные форматы: ${ALLOWED_ICON_EXTENSIONS.join(', ')}`;

const INITIAL_STATE = {
    iconFile: null,
    iconUrl: null,
    name: null,
    reaction: null,
    isFormShow: false,
    isEditing: false,
    isSaving: false,
    errors: null,
};

class NewFolder extends React.Component {
    state = INITIAL_STATE;

    changeFolderIcon = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
            this.setState({
                iconFile: file,
                iconUrl: readerEvent.target.result,
                isEditing: true,
            });
        };
    }

    resetState = () => {
        this.setState(INITIAL_STATE);
    }

    changeIconHandler = (e) => {
        e.persist();
        const { files } = e.target;

        if (validateFileExtension(ALLOWED_ICON_EXTENSIONS, files[0].name)) {
            return this.changeFolderIcon(files[0]);
        }

        this.setState({ errors: { icon: ICON_EXTENSIONS_ERROR_MSG } });
    }

    changeDataHandler = (e) => {
        e.persist();
        const { name, value } = e.target;

        this.setState({
            [name]: value,
            isEditing: true,
        });
    }

    addFolderHandler = () => this.setState({ isFormShow: true })

    createFolderHandler = () => {
        const { iconFile, name, reaction } = this.state;
        const data = new FormData();
        data.append('iconFile', iconFile);
        data.append('name', name);
        data.append('reaction', reaction);

        try {
            this.props.validateData({iconFile, name, reaction}, true);
            this.setState({ isSaving: true });
            const requestHeaders = { 'Content-Type': 'multipart/form-data' };
            axios.post('api/folders', data, { headers: requestHeaders })
                .then(({ data }) => {
                    this.resetState();
                    this.props.onFolderCreated(data);
                });
        }
        catch (errors) {
            this.setState({
                errors: JSON.parse(errors.message),
            });
        }

    }

    render() {
        const { isFormShow, ...folderData } = this.state;

        return (
            <FolderForm
                {...folderData}
                updateFolderHandler={this.createFolderHandler}
                changeIconHandler={this.changeIconHandler}
                changeDataHandler={this.changeDataHandler}
                isNewFolder
            />
        )
    }
};

export default NewFolder;
