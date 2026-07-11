import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { fetchInfinityItems } from '../../appSlice';
import { styled } from '@mui/material/styles';

const headCells = [
  {
    id: 'arkeyart',
    label: '',
    minWidth: 80,
  },
  {
    id: 'arcodart',
    label: 'Codice',
    minWidth: 100,
  },
  {
    id: 'ardesart',
    label: 'Descrizione',
    minWidth: 'auto',
  },
  {
    id: 'arunmis',
    label: 'UM',
    minWidth: 50,
  },
  {
    id: 'arcodfam',
    label: 'Famiglia',
    minWidth: 120,
  },
  {
    id: 'lanes',
    label: 'Corsie',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'red',
    label: 'Red',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'speed',
    label: 'Speed',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'freeflow',
    label: 'FreeFlow',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'media',
    label: 'Media',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'ztl',
    label: 'Ztl',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'mmcr',
    label: 'MMCR',
    minWidth: 80,
    align: 'center',
  },
];

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.pre.backgroundColor,
  fontWeight: 'bold',
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.pre.color,
  '&.Mui-disabled': {
    color: theme.palette.pre.color,
  },
  '&.Mui-checked': {
    color: theme.palette.pre.color,
  }
}));

export default function ItemsTable(props) {
  const [selected, setSelected] = useState([]);
  const [tableHeight, setTableHeight] = useState(0);
  const [search, setSearch] = useState(props.search);
  const rows = useSelector(state => state.app.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setTableHeight(window.innerHeight - 66);
    };

    window.addEventListener('resize', handleResize);
    setTableHeight(window.innerHeight - 66);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchInfinityItems());
  }, [dispatch]);

  useEffect(() => {
    setSearch(props.search);
  }, [props.search]);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    props.onSelect(rows.filter(row => newSelected.includes(row.arkeyart)));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const getData = () => {
    if (search === '') {
      return rows;
    }

    const results = rows.filter(row => {
      const { arcodart, ardesart } = row;

      return arcodart.toLowerCase().includes(search.toLowerCase) || ardesart.toLowerCase().includes(search.toLowerCase());
    });

    return results;
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: tableHeight, width: '100%' }}>
        <Table
          size="small"
          stickyHeader
          aria-label="Item table"
        >
          <TableHead
            sx={{
              width: '100%'
            }}
          >
            <TableRow>
              {headCells.map((column) => (
                <StyledTableHeadCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.align || 'left'}
                >
                  {column.label}
                </StyledTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <StyledTableBody>
            {getData().map((row, index) => {
              const isItemSelected = isSelected(row.arkeyart);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.arkeyart)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.arkeyart}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <StyledTableCell padding="checkbox">
                    <StyledCheckbox
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.arcodart}
                  </StyledTableCell>
                  <StyledTableCell>{row.ardesart}</StyledTableCell>
                  <StyledTableCell>{row.arunimis}</StyledTableCell>
                  <StyledTableCell>{row.arcodfam}</StyledTableCell>
                  <StyledTableCell
                    align={'center'}
                  >
                    {(row.lanes === 0) ? '' : row.lanes}
                  </StyledTableCell>
                  <StyledTableCell
                    align={'center'}
                  >
                    {(row.red === 0) ? '' : row.red}
                  </StyledTableCell>
                  <StyledTableCell
                    align={'center'}
                  >
                    {(row.speed === 0) ? '' : row.speed}
                  </StyledTableCell>
                  <StyledTableCell
                    align={'center'}
                  >
                    {(row.freeflow === 0) ? '' : row.freeflow}
                  </StyledTableCell>
                  <StyledTableCell
                    align={'center'}
                  >
                    {(row.media === 0) ? '' : row.media}
                  </StyledTableCell>
                  <StyledTableCell
                    align={'center'}
                  >
                    {(row.ztl === 0) ? '' : row.ztl}
                  </StyledTableCell>
                  <StyledTableCell
                    align={'center'}
                  >
                    {(row.mmcr) ? 'SÌ' : 'NO'}
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </StyledTableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
