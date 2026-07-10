import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getKbFromBytes, getLocatDateTimeFromTimestamp } from '../../../../util/utils';
import MimeTypeIcon from '../MimeTypeIcon/MimeTypeIcon';
import FileViewer from '../FileViewer/FileViewer';
import { Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pre from '../Pre/Pre';
import { Input } from '../Input/Input';

function AttachmentsTable({ attachments, edit, onChange }) {
  const [open, setOpen] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const theme = useSelector(state => state.app.theme);
  const length = attachments.length;

  const getAttachmentIndex = () => {
    return attachments.findIndex(obj => obj.name === attachment.name);
  }

  const handleOnClose = () => {
    setOpen(false);
    setAttachment(null)
  };

  const showAttachment = (event, attachment) => {
    event.preventDefault();

    setAttachment(attachment);
    setOpen(true);
  };

  const handleChangeDescription = (event, index) => {
    const description = event.target.value;
    onChange(description, index);
  };

  const handleOnPreviousClick = () => {
    const index = getAttachmentIndex();

    if (index === 0) {
      setAttachment(attachments[length - 1]);
    } else {
      setAttachment(attachments[index - 1]);
    }
  };

  const handleOnNextClick = () => {
    const index = getAttachmentIndex() + 1;

    if (index === length) {
      setAttachment(attachments[0]);
    } else {
      setAttachment(attachments[index]);
    }
  };

  return (
    <div>
      {attachment && (
        <FileViewer
          open={open}
          onClose={handleOnClose}
          attachment={attachment}
          showChevron={attachments.length > 1}
          onPrevious={handleOnPreviousClick}
          onNext={handleOnNextClick}
        />
      )}
      <table
        className={'table-grid'}
      >
        {attachments.length > 0 && (
          <thead>
          <tr>
            <th
              style={{
                width: 50,
              }}
            >
              Tipo
            </th>
            <th
              style={{
                width: 600,
              }}
            >
              Nome
            </th>
            <th>Descrizione</th>
            <th
              style={{
                width: 150,
              }}
            >
              Dimensione
            </th>
            <th
              style={{
                width: 200,
              }}
            >
              Ultima modifica
            </th>
          </tr>
          </thead>
        )}
        <tbody>
        {attachments.length === 0 && (
            <tr>
              <td colSpan={5}>
                <Pre
                  style={{ marginTop: '16px' }}
                  className={'pre'}
                  value={'Nessun allegato'}
                />
              </td>
            </tr>
        )}
        {attachments.length > 0 && attachments.map((attachment, index) => (
          <tr key={`attachment-${index}`}>
            <td
              style={{
                width: 50,
                textAlign: 'center',
                fontSize: 24,
              }}
            >
              <Tooltip title={attachment.type}>
                <MimeTypeIcon type={attachment.type} />
              </Tooltip>
            </td>
            <td
              style={{
                width: 600,
              }}
            >
              <Pre className={'pre'}>
                {attachment.name}
                <a
                  style={{
                    color: (theme === 'dark') ? '#9FEF00' : '#017bb0',
                    transition: 'color linear 0.2s',
                    display: 'block',
                    position: 'absolute',
                    right: 12,
                    top: 9,
                  }}
                  href={'#'}
                  onClick={(event) => showAttachment(event, attachment)}
                >
                  <FontAwesomeIcon icon={'magnifying-glass'} />
                </a>
              </Pre>
            </td>
            <td>
              {edit && (
                <Input
                  type={'text'}
                  className={'pre'}
                  value={attachment.description}
                  onChange={(event) => handleChangeDescription(event, index)}
                />
              )}
              {!edit && (
                <Pre className={'pre'} value={attachment.description} />
              )}
            </td>
            <td
              style={{
                width: 150,
                textAlign: 'right'
              }}
            >
              <Pre className={'pre'} value={`${getKbFromBytes(attachment.size)} KB`} />
            </td>
            <td
              style={{
                width: 200,
              }}
            >
              <Pre className={'pre'} value={getLocatDateTimeFromTimestamp(attachment.lastModified)} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttachmentsTable;
