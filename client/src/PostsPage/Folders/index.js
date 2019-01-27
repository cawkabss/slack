import React from 'react';
import { Grid } from 'evokit';
import { Link } from "@reach/router";

import Button from 'UI/Button';

const Folder = ({ children, folderName }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentFolder = urlParams.get('folder');
    const url = folderName ? `/?folder=${folderName}`: '/';

    return (
        <Link to={url}>
            <Button
                active={currentFolder === folderName || !folderName && !currentFolder}
            >
                {children}
            </Button>
        </Link>
    );
};

const Folders = ({ folders }) => (
    <Grid
        grid-wrap='wrap'
        grid-indent='m'
    >
        <Grid.Item>
            <Folder
                default
            >
                Все
            </Folder>
        </Grid.Item>
        { folders.map(folder => {
            return (
                <Grid.Item key={folder.id}>
                    <Folder
                        folderName={folder.name}
                        onClick={() => onFolderClick(folder.name)}
                    >
                        {folder.name}
                    </Folder>
                </Grid.Item>
            )})
        }
    </Grid>
);

export default Folders;