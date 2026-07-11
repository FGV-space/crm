import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Button, ButtonGroup, Dialog, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  buttonStyleGreen,
  buttonStyleOrange,
  buttonStyleOrangeLight,
  buttonStylePink,
  buttonStylePinkLight
} from '../../../../util/material';
import { FormattedMessage } from 'react-intl';
import MimeTypeIcon from "../MimeTypeIcon/MimeTypeIcon";
import { showAttachment, downloadAttachment, streamAttachment } from '../../../../util/apiCaller';
import code from '../../../../util/codeStyle';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { isPdfFile, isTextFile, isImageFile, isVideoFile } from '../../../../util/utils';
import { styled } from '@mui/material/styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction={'up'} ref={ref} {...props} />;
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.appBar.backgroundColor,
}));

const StyledSpan = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

function FileViewer({ open, onClose, attachment, showChevron, onNext, onPrevious }) {
  const videoRef = useRef(null);
  const [fileUrl, setFileUrl] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const theme = useSelector(state => state.app.theme);

  useEffect(() => {
    const updateContainerDimensions = () => {
      const viewportHeight = window.innerHeight;
      const containerWidth = window.innerWidth;
      const newContainerHeight = viewportHeight - 68;
      setContainerHeight(newContainerHeight);
      setContainerWidth(containerWidth);
    };

    window.addEventListener('resize', updateContainerDimensions);
    updateContainerDimensions();

    return () => {
      window.removeEventListener('resize', updateContainerDimensions);
    };
  }, []);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await showAttachment(attachment);

        if (isTextFile(attachment.type)) {
          setFileContent(response);
        } else {
          const url = URL.createObjectURL(response);
          setFileUrl(url);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVideo = async () => {
      try {
        const response = await streamAttachment(attachment);
        const videoUrl = URL.createObjectURL(response);
        videoRef.current.src = videoUrl;
      } catch (error) {
        console.log(error);
      }
    };

    if (isVideoFile(attachment.type)) {
      fetchVideo();
    } else {
      fetchFile();
    }
  }, [attachment]);

  const handleClose = () => {
    onClose();
  };

  const handleDownload = async () => {
    try {
      const response = await downloadAttachment(attachment);
      const url = URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachment.name;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Errore nel download del file:', error);
    }
  };

  const handleClickOnPrevious = () => {
    onPrevious();
  };

  const handleClickOnNext = () => {
    onNext();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StyledAppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ width: '100%' }}
            >
             <Stack spacing={2} direction={'row'}>
               <StyledSpan
                 style={{
                   fontSize: 24,
                 }}
               >
                 <MimeTypeIcon type={attachment.type} />
                </StyledSpan>
                <StyledSpan
                  style={{
                    paddingTop: 4,
                    fontSize: 16,
                  }}
                >
                 {attachment.name}
                </StyledSpan>
             </Stack>
              <Stack spacing={2} direction="row">
                {showChevron && (
                  <ButtonGroup
                    variant={theme === 'dark' ? 'outlined' : 'contained'}
                    disableElevation={Boolean(theme === 'light')}
                  >
                    <Button
                      onClick={handleClickOnPrevious}
                      style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
                      disableElevation={Boolean(theme === 'light')}
                    >
                      <FontAwesomeIcon icon={'fa-chevron-left'} />
                    </Button>
                    <Button
                      onClick={handleClickOnNext}
                      style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
                      disableElevation={Boolean(theme === 'light')}
                    >
                      <FontAwesomeIcon icon={'fa-chevron-right'} />
                    </Button>
                  </ButtonGroup>
                )}
                <Button
                  variant={theme === 'dark' ? 'outlined' : 'contained'}
                  style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
                  startIcon={<FontAwesomeIcon icon={'fa-duotone fa-download'} />}
                  onClick={handleDownload}
                  disableElevation={Boolean(theme === 'light')}
                >
                  <FormattedMessage id={'download'} />
                </Button>
                <Button
                  variant={theme === 'dark' ? 'outlined' : 'contained'}
                  style={theme === 'dark' ? buttonStyleOrange : buttonStyleOrangeLight}
                  startIcon={<FontAwesomeIcon icon={'fa-duotone fa-xmark'} />}
                  onClick={handleClose}
                  disableElevation={Boolean(theme === 'light')}
                >
                  <FormattedMessage id={'close'} />
                </Button>
              </Stack>
            </Stack>
          </Toolbar>
        </StyledAppBar>
        <div
          style={{
            height: `${containerHeight}px`,
            maxHeight: `${containerHeight}px`,
            maxWidth: `${containerWidth}px`,
            textAlign: 'center',
            backgroundColor: '##21252b',
          }}
        >
          <div
            style={{
              height: '100%',
              overflow: 'hidden',
              margin: 0,
              padding: 0,
            }}
          >
            {isPdfFile(attachment.type) && fileUrl && (
              <embed
                src={fileUrl}
                type={attachment.type}
                style={{
                  width: '100%',
                  height: '100%',
                  padding: 0,
                }}
              />
            )}
            {isTextFile(attachment.type) && fileContent && (
              <SyntaxHighlighter
                language="text"
                style={code}
              >
                {fileContent}
              </SyntaxHighlighter>
            )}
            {isImageFile(attachment.type) && fileUrl && (
              <img
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                src={fileUrl}
                alt="Anteprima immagine"
              />
            )}
            {isVideoFile(attachment.type) && (
              <video style={{ height: '100%' }} ref={videoRef} controls />
            )}
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default FileViewer;
