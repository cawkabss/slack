import React from 'react';
import PropTypes from 'prop-types';

const FileUploadHOC = (WrappedComponent) => {
    return class extends React.Component {
        onChoiceFile = () => {
            this.refs.fileField.click();
        }

        render() {
            const { name, onChange } = this.props;

            return (
                <React.Fragment>
                    <input
                        style={{display: 'none'}}
                        ref='fileField'
                        type='file'
                        name={name}
                        onChange={onChange}
                    />
                    <WrappedComponent
                        { ...this.props }
                        onChoiceFile={this.onChoiceFile}
                    />
                </React.Fragment>
            )
        }
    };
};

FileUploadHOC.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default FileUploadHOC;