import React, { useState, useEffect, forwardRef } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buttonStyleGray } from '../../../../util/material';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  width: '100%',
  padding: '0 0 6px 0',
  flexDirection: 'column',
  borderBottom: `1px solid ${theme.palette.header.backgroundColor}`,
  marginBottom: '4px',
  '& > *': {
    m: 1,
  },
}));

const StyledDraft = styled('div')(({ theme }) => ({
  height: 314,
  border: `1px solid ${theme.palette.header.backgroundColor}`,
  '&.DraftEditor-root': {
    backgroundColor: theme.palette.pre.backgroundColor,
    color: theme.palette.pre.color,
  }
}));

const Draft = forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (props.value !== undefined && props.value !== null) {
      setEditorState(EditorState.createWithContent(convertFromHTML(props.value)));
    }
  }, []);

  const resetEditorState = () => {
    setEditorState(EditorState.createEmpty());
  };

  // Passa il riferimento al componente padre
  React.useImperativeHandle(ref, () => ({
    resetEditorState,
  }));

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleOnChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onItalicClick = () => {
    handleOnChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onBoldClick = () => {
    handleOnChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onUnderlineClick = () => {
    handleOnChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onStrikeThroughClick = () => {
    handleOnChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  const onBulletListClick = () => {
    handleOnChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
  };

  const onNumberedListClick = () => {
    handleOnChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
  };

  const keyBindingFn = (event) => {
    if (
      event.keyCode === 66 /* `B` key */ &&
      event.metaKey
    ) {
      return 'bold';
    }

    return getDefaultKeyBinding(event);
  };

  const convertEditorStateToHTML = (editorState) => {
    return convertToHTML(editorState.getCurrentContent());
  };

  const handleOnChange = (newEditorState) => {
    setEditorState(newEditorState);
    props.onChange(convertEditorStateToHTML(newEditorState));
  };

  return (
    <StyledDraft
      className={'DraftEditor-root'}
    >
      <div>
        <StyledBox>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              style={buttonStyleGray}
              onClick={onBoldClick}
            >
              <FontAwesomeIcon icon={'bold'} />
            </Button>
            <Button
              style={buttonStyleGray}
              onClick={onItalicClick}
            >
              <FontAwesomeIcon icon={'italic'} />
            </Button>
            <Button
              style={buttonStyleGray}
              onClick={onUnderlineClick}
            >
              <FontAwesomeIcon icon={'underline'} />
            </Button>
            <Button
              style={buttonStyleGray}
              onClick={onStrikeThroughClick}
            >
              <FontAwesomeIcon icon={'strikethrough'} />
            </Button>
            <Button
              style={buttonStyleGray}
              onClick={onBulletListClick}
            >
              <FontAwesomeIcon icon={'list-ul'} />
            </Button>
            <Button
              style={buttonStyleGray}
              onClick={onNumberedListClick}
            >
              <FontAwesomeIcon icon={'list-ol'} />
            </Button>
          </ButtonGroup>
        </StyledBox>
      </div>
      <div>
        <Editor
          style={{ overflow: 'auto', height: 164 }}
          editorState={editorState}
          onChange={handleOnChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="Scrivi qui..."
          spellCheck
        />
      </div>
    </StyledDraft>
  );
});

export default Draft;
