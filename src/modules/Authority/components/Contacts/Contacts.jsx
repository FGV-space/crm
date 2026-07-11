import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import {fetchContacts} from "../../authoritySlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from '@mui/material/Chip';
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";
import {FormattedMessage} from "react-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#21252b',
    color: '#45c3ec',
    fontWeight: 'bold',
    padding: 12,
    borderBottom: '1px solid #abb2bf',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 8,
    color: '#ffffff',
    borderBottom: '1px solid #abb2bf',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#21252b',
  '&:nth-of-type(odd)': {
    backgroundColor: '#2f333d',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Contacts(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.authority.contacts);

  useEffect(() => {
    if (props.companyId) {
      dispatch(fetchContacts(props.companyId));
    }
  }, [dispatch, props.companyId]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <FormattedMessage id={'role'} defaultMessage={'Role'} />
              </StyledTableCell>
              <StyledTableCell>
                <FormattedMessage id={'title'} defaultMessage={'Title'} />
              </StyledTableCell>
              <StyledTableCell>
                <FormattedMessage id={'telephone'} defaultMessage={'Telephone'} />
              </StyledTableCell>
              <StyledTableCell>
                <FormattedMessage id={'cellular'} defaultMessage={'Cellular'} />
              </StyledTableCell>
              <StyledTableCell>
                eMail
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((row, index) => (
              <StyledTableRow key={`contact-${index}`}>
                <StyledTableCell>
                  {row.role || ''}
                </StyledTableCell>
                <StyledTableCell component={'th'} scope={'row'}>
                  {row.title || ''}
                </StyledTableCell>
                <StyledTableCell>
                  {row.telephone[0] &&
                    <Stack direction={'row'} spacing={1}>
                      <Chip
                        icon={<FontAwesomeIcon icon={'phone'} />}
                        color={'primary'}
                        variant={'outlined'}
                        label={row.telephone[0]}
                        component={'a'}
                        href={`call:${row.telephone[0]}`}
                        clickable
                      />
                    </Stack>
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {row.mobile[0] &&
                    <Stack direction={'row'} spacing={1}>
                      <Chip
                        icon={<FontAwesomeIcon icon={'mobile-retro'} />}
                        color={'primary'}
                        variant={'outlined'}
                        label={row.mobile[0]}
                        component={'a'}
                        href={`call:${row.mobile[0]}`}
                        clickable
                      />
                    </Stack>
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {row.eMail[0] &&
                    <Stack direction={'row'} spacing={1}>
                      <Chip
                        icon={<FontAwesomeIcon icon={'envelope'} />}
                        color={'primary'}
                        variant={'outlined'}
                        label={row.eMail[0]}
                        component={'a'}
                        href={`mailto:${row.eMail[0]}`}
                        clickable
                      />
                    </Stack>
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
