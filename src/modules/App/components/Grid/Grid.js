import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {styled} from "@mui/material/styles";

const Container = styled('div')(({ theme }) => ({
 table: {
   th: {
     color: theme.palette.table.th.color,
     backgroundColor: theme.palette.table.th.backgroundColor,
     borderTop: theme.palette.table.th.borderTop,
     borderBottom: theme.palette.table.th.borderBottom,
   },
   td: {
     color: theme.palette.table.td.color,
     backgroundColor: theme.palette.table.td.backgroundColor,
     borderTop: theme.palette.table.td.borderTop,
   }
 }
}));

function Grid(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [columnWidths, setColumnWidths] = useState([]);

  useEffect(() => {
    const headerColumns = document.querySelectorAll('.table thead th');
    const widths = Array.from(headerColumns).map((column) => column.offsetWidth);
    setColumnWidths(widths);
  }, [props.columns]);

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
  };

  const handleSort = (column) => {
    if (column.sortable) {
      props.onSort(column);
    }
  };

  const sortIcon = (value) => {
    const item = (props.sorting || []).find(item => item[0] === value);

    if (item) {
      if (item[1] === 1) {
        return (
          <FontAwesomeIcon icon={'arrow-down-a-z'} />
        );
      }
      return (
        <FontAwesomeIcon icon={'arrow-down-z-a'} />
      );
    }
    return null;
  }

  return (
    <Container
      className={'grid-container'}
      onScroll={handleScroll}
    >
      <table className={'table'} style={{ width: '100%' }}>
        <thead>
          <tr>
            {props.columns.filter(column => column.show).map((column, index) => (
              <th
                key={column.key}
                style={{ width: column.width, textAlign: (column.align) ? column.align : 'left' }}
                onClick={() => handleSort(column)}
              >
                <span className={column.sortable ? 'cursor--pointer' : ''}>
                  {props.intl.messages[column.label] || column.label}
                </span>
                <span style={{ marginLeft: 4, color: '#c58af9' }}>
                  {sortIcon(column.key)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={'scrollable'}>
          {props.data.map((row, index) => (
            <tr
              key={index}
            >
              {props.columns.filter(column => column.show).map((column, columnIndex) => (
                <td
                  key={column.key}
                  style={{ width: columnWidths[columnIndex], textAlign: (column.align) ? column.align : 'left' }}
                >
                  {props.renderRow ? props.renderRow(row[column.key], column, row._id) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default injectIntl(Grid);
