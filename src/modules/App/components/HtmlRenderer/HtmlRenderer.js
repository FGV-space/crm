import React from 'react';

function HtmlRenderer({ htmlCode }) {
  return <div className={'inner--html'} dangerouslySetInnerHTML={{ __html: htmlCode }} />;
}

export default HtmlRenderer;
