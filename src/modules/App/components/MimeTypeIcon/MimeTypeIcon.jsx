import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MimeTypeIcon = forwardRef((props, ref) => {
  const getIcon = () => {
    switch (props.type) {
      case 'application/pdf':
        return 'fa-duotone fa-file-pdf';

      case 'image/png':
      case 'image/jpeg':
        return 'fa-duotone fa-file-image';

      case 'application/vnd.ms-excel':
        return 'fa-duotone fa-file-csv';

      case 'video/avi':
      case 'video/mp4':
      case 'video/quicktime':
        return 'fa-duotone fa-file-video';

      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'fa-duotone fa-file-excel';

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'fa-duotone fa-file-word';

      default:
        return 'fa-duotone fa-file';
    }
  };

  return (
    <div {...props} ref={ref}>
      <FontAwesomeIcon icon={getIcon()}/>
    </div>
  );
});

export default MimeTypeIcon;
