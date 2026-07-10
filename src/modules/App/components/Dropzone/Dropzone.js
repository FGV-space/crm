import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';

const StyledDropzoneContent = styled('div')(({ theme}) => ({
  borderColor: theme.palette.secondary.main,
  color: theme.palette.secondary.main,
}));


function Dropzone({ onFilesSelected }) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const mimeType = file.type;

      // Resto del codice per gestire i file...
    });
    onFilesSelected(acceptedFiles);
  }, [])

  const { isDragActive, getRootProps, getInputProps } = useDropzone({onDrop})

  return (
    <div className={'dropzone'}>
      <StyledDropzoneContent {...getRootProps()} className={'dropzone-content'}>
        <input {...getInputProps()} />
        <p>Trascina qui i file o clicca per selezionarli</p>
      </StyledDropzoneContent>
    </div>
  );
}

export default Dropzone;
