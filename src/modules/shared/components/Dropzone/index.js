import React, { forwardRef } from 'react'
import { SnackbarProvider } from 'notistack'
import DropzoneComponent from './DropzoneComponent'

export const Dropzone = forwardRef((props, ref) => {
    const onDrop = props.onDrop;
    const defaultValue = props.defaultValue;
    const onChange = props.onChange
    const fileExtensions = props.fileExtensions;
    const textDropzone = props.textDropzone;
    const progressColor = props.progressColor;
    const progressBarColor = props.progressBarColor;
    const files = props.files;
    const messages = props.messages;

    return (
        <SnackbarProvider maxSnack={3}>
            <DropzoneComponent
                progressBarColor={progressBarColor}
                progressColor={progressColor}
                textDropzone={textDropzone}
                fileExtensions={fileExtensions}
                files={files}
                messages={messages}
                onDrop={onDrop}
                defaultValue={defaultValue}
                onChange={onChange} />
        </SnackbarProvider>
    )
})