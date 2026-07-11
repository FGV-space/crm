import React from 'react';

function Legend(props) {
  const items = [
    { color: '#253394', label: 'Alessandro Millefanti' },
    { color: '#81107c', label: 'Andrea Guidolin' },
    { color: '#ffff33', label: 'Mario Beschi' },
    { color: '#f781be', label: 'Michele Sega' },
    { color: '#cd3333', label: 'Paolo Cappello' },
    { color: '#ff8000', label: 'Stefano Bonaspetti' },
    { color: '#0f8553', label: 'Stefano Talenti' },
  ];

  return (
    <div className="legend">
      {items.map((item, index) => (
        <div className="legend-item" key={`item-${index}`}>
          <div
            className="legend-item-color"
            style={{ backgroundColor: item.color }}
          ></div>
          <div className="legend-item-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export default Legend;
