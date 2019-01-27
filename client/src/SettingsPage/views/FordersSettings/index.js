import React from 'react';
import axios from 'axios';
import { Grid, Box } from 'evokit';

import Section from '../Section';
import Button from '../../../UI/Button';
import FolderForm from './views/FolderForm';
import { validateFolderData, validateFolderIcon } from './utils';

import folderIcon from './folder.svg';
import css from './Folders.sss';

const NEW_FOLDER_STATE = {
    iconFile: null,
    iconUrl: null,
    name: '',
    reaction: '',
};

class FoldersSettings extends React.Component {
    state = {
        folders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('api/folders')
            .then(({ data }) => this.setState({
                folders: data,
                loading: false,
            }));
    }

    setLoadingStatus = (idx) => {
        this.setState(state => ({
            folders: state.folders.map((folder, i) => {
                if (idx === i) {
                    folder.isSaving = true;
                }
                return folder;
            })
        }));
    }

    addNewFolderHandler = () => {
        this.setState(state => ({
            folders: [...state.folders, NEW_FOLDER_STATE],
        }));
    }

    changeFolderIcon = (file, idx) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = ({target}) => {
            this.setState(state => ({
                folders: state.folders.map((folder, i) => {
                    if (idx === i) {
                        folder.iconFile = file;
                        folder.iconUrl = target.result;
                        folder.isEdited = true;
                        folder.errors = {
                            ...folder.errors,
                            icon: null,
                        };
                    }
                    return folder;
                }),
            }));
        };
    }

    onChangeIcon = (e, idx) => {
        e.persist();
        const { files } = e.target;

        const extensionError = validateFolderIcon(files[0].name);

        if (extensionError) {
            return this.setState(state => ({
                folders: state.folders.map((folder, i) => {
                    if (idx === i) {
                        folder.errors = {
                            ...folder.errors,
                            icon: extensionError,
                        };
                    }
                    return folder;
                }),
            }));
        }

        this.changeFolderIcon(files[0], idx);
    }

    onChangeFolderData = (e, idx) => {
        e.persist();
        const { name, value } = e.target;

        this.setState(state => ({
            folders: state.folders.map((folder, i) => {
                if (idx === i) {
                    folder[name] = value;
                    folder.isEdited = true;
                }
                return folder;
            })
        }));
    }

    onDeleteFolder = (idx) => {
        const targetFolder = this.state.folders[idx];
        const isNewFolder = !targetFolder.id;

        if (isNewFolder) {
            return this.setState(state => ({
                folders: state.folders.filter((_, i) => idx !== i)
            }));
        }

        this.setLoadingStatus(idx);
        axios.delete(`api/folders/${targetFolder.id}`)
            .then(() => {
                this.setState(state => ({
                    folders: state.folders.filter(folder => folder.id !== targetFolder.id),
                }));
            });
    }

    createNewFolder = (folderData, idx) => {
        this.setLoadingStatus(idx);

        const requestHeaders = { 'Content-Type': 'multipart/form-data' };
        axios.post(`api/folders`, folderData, { headers: requestHeaders })
            .then(({ data }) => {
                this.setState(state => ({
                    folders: state.folders.map((folder, i) => {
                        if (idx === i) {
                            return data;
                        }
                        return folder;
                    }),
                }));
            });
    }

    updateFolder = (folderData, idx) => {
        this.setLoadingStatus(idx);
        const folderId = folderData.get('id');
        const requestHeaders = { 'Content-Type': 'multipart/form-data' };
        axios.put(`api/folders/${folderId}`, folderData, { headers: requestHeaders })
            .then(({ data }) => {
                this.setState(state => ({
                    folders: state.folders.map((folder) => {
                        if (folderId === folder.id) {
                            return data;
                        }
                        return folder;
                    }),
                }));
            });
    }

    onSaveFolder = (idx) => {
        const folder = this.state.folders[idx];

        try {
            validateFolderData(folder);

            const folderData = new FormData();
            Object.keys(folder).forEach(key => {
                folderData.append([key], folder[key]);
            });

            if (folder.id) {
                return this.updateFolder(folderData, idx);
            }

            this.createNewFolder(folderData, idx);

        } catch (errors) {
            this.setState(state => ({
                folders: state.folders.map((folder, i) => {
                    if (idx === i) {
                        folder.errors = JSON.parse(errors.message);
                    }
                    return folder;
                }),
            }));
        }
    }

    render() {
        const { folders, loading } = this.state;
        return (
            <Section
                loading={loading}
                icon={folderIcon}
                title='Папки'
            >
                <ul className={css.list}>
                    {
                        folders.map((folder, idx) => (
                            <li className={css.item}>
                                <FolderForm
                                    key={idx}
                                    {...folder}
                                    changeIconHandler={(e) => this.onChangeIcon(e, idx)}
                                    changeDataHandler={(e) => this.onChangeFolderData(e, idx)}
                                    saveFolderHandler={() => this.onSaveFolder(idx)}
                                    deleteFolderHandler={() => this.onDeleteFolder(idx)}
                                />
                            </li>
                        ))
                    }
                </ul>
                <Button
                    onClick={this.addNewFolderHandler}
                    type='filled'
                    theme='green'
                >
                    Добавить папку
                </Button>
            </Section>
        )
    }
};

export default FoldersSettings;
