import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTitle, setSitenav, closeAll } from '../../../App/appSlice';
import {fetchCurrent, updateNegotiation, addEvent, fetchTipCom, addComment} from '../../negotiationsSlice';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Box, Grid, Checkbox, Tooltip, Stack, Button, FormControlLabel, Switch } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';
import moment from 'moment';
import {
  capitalizeCityLabel,
  capitalizeName, DefaultItem,
  getEuroFromNumber,
  getProvinceAndRegionFromCity
} from '../../../../util/utils';
import HtmlRenderer from '../../../App/components/HtmlRenderer/HtmlRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Location from '../../../App/components/Location/Location';
import AttachmentsTable from '../../../App/components/AttachmentsTable/AttachmentsTable';
import Pre from '../../../App/components/Pre/Pre';
import { styled } from '@mui/material/styles';
import { VmsTabs, VmsTab } from '../../../App/components/Tabs/Tabs';
import { buttonStylePink, buttonStylePinkLight } from '../../../../util/material';
import Date from '../../../App/components/Date/Date';
import DateTime from '../../../App/components/DateTime/DateTime';
import { StyledSelect, StyledMenuItem } from '../../../App/components/Select/Select';
import { Input, InputGroupButton } from '../../../App/components/Input/Input';
import Draft from '../../../App/components/Draft/Draft';
import DialogSave from '../../../App/components/Dialogs/DialogSave';
import SitesGrid from '../../components/SitesGrid/SitesGrid';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import SelectUsers from '../../../App/components/SelectUsers/SelectUsers';
import Reminder from '../../../App/components/Reminder/Reminder';
import Textarea from '../../../App/components/Textarea/Textarea';
import { fetchActiveUsers } from '../../../User/userSlice';
import ContactTypeahead from '../../../App/components/ContactTypeahead/ContactTypeahead';
import Dropzone from '../../../App/components/Dropzone/Dropzone';
import CityTypeahead from '../../../App/components/CityTypeahead/CityTypeahead';
import ProvinceTypeahead from '../../../App/components/ProvinceTypeahead/ProvinceTypeahead';

const StyledDirection = styled('span')(({ theme }) => ({
  color: theme.palette.pre.color,
}));

function Item({ item }) {
  const RefurbishedCheck = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.pre.color,
    '&.Mui-disabled': {
      color: theme.palette.pre.color,
    }
  }));

  return (
    <tr>
      <td>
        <Pre value={(item?.siteId) ? item.siteId : ''} />
      </td>
      <td
        style={{
          width: 200,
        }}
      >
        <Pre value={(item?.code) ? item.code : ''} />
      </td>
      <td>
        <Pre value={(item?.description) ? item.description : ''} />
      </td>
      <td
        style={{
          width: 50,
        }}
      >
        <RefurbishedCheck
          checked={item?.refurbished}
          inputProps={{ 'aria-label': 'controlled' }}
          disabled
        />
      </td>
      <td
        style={{
          width: 100,
        }}
      >
        <Pre value={(item?.quantity) ? item.quantity : ''} align={'center'} />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Pre value={(item?.price) ? getEuroFromNumber(item.price) : ''} align={'right'} />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Pre value={(item?.discount) ? item.discount : ''} align={'right'} />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Pre value={(item?.totalDiscount) ? getEuroFromNumber(item.totalDiscount) : ''} align={'right'} />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Pre value={(item?.totalAmount) ? getEuroFromNumber(item.totalAmount) : ''} align={'right'} />
      </td>
    </tr>
  );
}

const StyledFeaturesTable = styled('table')(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
  width: '100%',
  maxWidth: '500px',
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  th: {
    color: theme.palette.table.th.color,
  },
  td: {
    color: theme.palette.table.td.color,
  },
  'td:first-of-type': {
    paddingLeft: '16px',
  },
}));

const FeatureCheck = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.pre.color,
  '&.Mui-checked': {
    color: theme.palette.pre.color,
  }
}));

const ExpirationChip = styled('h4')(({ theme }) => ({
  color: theme.palette.primary.main,
  position: 'relative',
  display: 'block',
  width: 'auto',
}));

function Features({ item, intl }) {
  const { features } = item;

  const Direction = () => {
    const directionIcon = (item) => {
      switch (item.direction) {
        case 'approaching':
          return (
            <FontAwesomeIcon icon={'arrow-down'} />
          );

        case 'both':
          return (
            <FontAwesomeIcon icon={'arrows-up-down'} />
          );

        default:
          return (
            <FontAwesomeIcon icon={'arrow-up'} />
          );
      }
    };

    if (features.length) {
      return (
        <tr>
          <td>Senso di marcia</td>
          {features.map((item, index) => (
            <td
              key={`direction-${index}`}
              align={'center'}
              width={'100px'}
            >
              <StyledDirection>
                <Tooltip title={intl.messages[item.direction]}>
                  {directionIcon(item)}
                </Tooltip>
              </StyledDirection>
            </td>
          ))}
        </tr>
      )
    }

    return null;
  };

  const Feature = ({ feature, label }) => {
    const isAvailable = Boolean(item[feature] > 0);

    if (features.length && isAvailable) {
      return (
        <tr>
          <td>{label}</td>
          {features.map((item, index) => (
            <td
              key={`${feature}-${index}`}
              align={'center'}
              width={'100px'}
            >
              <FeatureCheck
                checked={item[feature]}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          ))}
        </tr>
      );
    }
  };

  const Mmcr = () => {
    const isAvailable = Boolean(item.mmcr);

    if (features.length && isAvailable) {
      return (
        <tr>
          <td>MMCR</td>
          {features.map((item, index) => (
            <td
              key={`mmcr-${index}`}
              align={'center'}
              width={'100px'}
            >
              <FeatureCheck
                checked={item.mmcr}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          ))}
        </tr>
      );
    }

    return null;
  };

  const Table = () => {
    return (
      <StyledFeaturesTable>
        <thead>
        <tr>
          <th>&nbsp;</th>
          {features.map((item, index) => (
            <th
              key={`lane-${index}`}
              width={'100px'}
            >
              {`CORSIA ${item.lane}`}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
          <Direction key={'direction'} />
          <Feature label={'Red'} feature={'red'} />
          <Feature label={'Speed'} feature={'speed'} />
          <Feature label={'Lettura targhe'} feature={'freeflow'} />
          <Feature label={'Media'} feature={'media'} />
          <Feature label={'Ztl'} feature={'ztl'} />
          <Mmcr key={'mmcr'} />
        </tbody>
      </StyledFeaturesTable>
    );
  };

  return (
    <tr>
      <td colSpan={2}>&nbsp;</td>
      <td colSpan={7}>
        <Table />
      </td>
    </tr>
  );
}

function SitesContainer({ sites }) {
  const theme = useSelector(state => state.app.theme);

  return (
    <div>
      <table
        style={{ width: '100%' }}
      >
        <tbody>
        {(sites.map((site, index) => (
          <tr
            key={index}
          >
            <td>
              <Box>
                <div style={{ display: 'block', width: '100%', marginTop: 12, marginBottom: 8 }}>
                  <Grid
                    container
                    alignItems="flex-start"
                    columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                    rowSpacing={2}
                    columns={9}
                  >
                    <Grid xs={1} item>
                      <label>
                        Id sito
                      </label>
                    </Grid>
                    <Grid xs={1} item>
                      <Pre value={site.siteId} />
                    </Grid>
                    <Grid xs={1} item>
                      <label>
                        Località
                      </label>
                    </Grid>
                    <Grid xs={3} item>
                      <Pre value={capitalizeCityLabel(site.city.ctlocal)} />
                    </Grid>
                    <Grid xs={1} item>
                      <label>
                        Posizione
                      </label>
                    </Grid>
                    <Grid xs={2} item>
                      <Location location={site.location} />
                    </Grid>
                  </Grid>
                </div>
                <div style={{ display: 'block', width: '100%', marginBottom: 8 }}>
                  <Grid
                    container
                    alignItems="flex-start"
                    columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                    rowSpacing={2}
                    columns={9}
                  >
                    <Grid xs={1} item>
                      <label>
                        Strada
                      </label>
                    </Grid>
                    <Grid xs={2} item>
                      <Pre value={site.street} />
                    </Grid>
                    <Grid xs={1} item>
                      <label>
                        Chilometrica
                      </label>
                    </Grid>
                    <Grid xs={2} item>
                      <Pre value={site.milestone || ''} />
                    </Grid>
                    <Grid xs={1} item>
                      <label>
                        Intersezione
                      </label>
                    </Grid>
                    <Grid xs={2} item>
                      <Pre value={site.intersection || ''} />
                    </Grid>
                  </Grid>
                </div>
                <div style={{
                  display: 'block',
                  width: '100%',
                  paddingBottom: 12,
                  marginBottom: 8,
                  borderBottom: (theme === 'dark') ? '1px solid hsla(0,0%,100%,.06)' : '1px solid #535c7e',
                }}>
                  <Grid
                    container
                    alignItems="flex-start"
                    columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                    rowSpacing={2}
                    columns={9}
                  >
                    <Grid xs={1} item>
                      <label>
                        Dir. allontanamento
                      </label>
                    </Grid>
                    <Grid xs={2} item>
                      <Pre value={site.departing || ''} />
                    </Grid>
                    <Grid xs={1} item>
                      <label>
                        Dir. avvicinamento
                      </label>
                    </Grid>
                    <Grid xs={2} item>
                      <Pre value={site.approaching || ''} />
                    </Grid>
                    <Grid xs={1} item>
                      <label>
                        Limite di velocità
                      </label>
                    </Grid>
                    <Grid xs={1} item>
                      <Pre value={site.speedLimit || ''} />
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </td>
          </tr>
        )))}
        </tbody>
      </table>
    </div>
  );
}

function ItemsContainer({ items, intl }) {
  const TableGrid = styled('table')(({ theme }) => ({
    color: theme.palette.tableGrid.color,
  }));

  const Row = ({ item, index }) => {
    if (item.lanes) {
      return ([
        <Item
          key={`item-${index}`}
          item={item}
        />,
        <Features
          key={`features-${index}`}
          item={item}
          intl={intl}
        />,
      ]);
    }

    return (
      <Item
        key={`item-${index}`}
        item={item}
      />
    );
  };

  return (
    <div>
      <TableGrid
        className={'table-grid'}
      >
        <thead>
        <tr>
          <th
            style={{
              width: 200,
            }}
          >
            Sito
          </th>
          <th
            style={{
              width: 200,
            }}
          >
            Codice
          </th>
          <th>
            Descrizione
          </th>
          <th
            title={'Ricondizionato'}
            style={{
              width: 50,
            }}
          >
            Ric.
          </th>
          <th
            style={{
              width: 100,
            }}
          >
            Quantità
          </th>
          <th
            style={{
              width: 160,
            }}
          >
            Prezzo
          </th>
          <th
            style={{
              width: 160,
            }}
          >
            Sconto (%)
          </th>
          <th
            style={{
              width: 160,
            }}
          >
            Totale sconto
          </th>
          <th
            style={{
              width: 160,
            }}
          >
            Totale Importo
          </th>
        </tr>
        </thead>
        <tbody>
        {items.map((item, index) => (
          <Row key={index} item={item} />
        ))}
        </tbody>
      </TableGrid>
    </div>
  )
}

function Toolbar(props) {
  const theme = useSelector(state => state.app.theme);
  function handleSave() {
    props.onSave();
  }

  return (
    <div className={'grid-toolbar'}>
      <Stack spacing={2} direction="row">
        {props.edit && (
          <Button
            variant={theme === 'dark' ? 'outlined' : 'contained'}
            style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
            startIcon={<FontAwesomeIcon icon="fa-duotone fa-floppy-disk" />}
            onClick={handleSave}
            disableElevation={Boolean(theme === 'light')}
          >
            <FormattedMessage id={'save'} />
          </Button>
        )}
      </Stack>
    </div>
  );
}

function CustomizedTimeline({ history }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    dispatch(fetchActiveUsers());
  }, []);

  const getUserName = (username) => {
    const user = users.find(user => user.username === username);

    return (user) ? `${user.name} ${user.surname}` : username;
  };

  const Container = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.pre.backgroundColor,
    border: theme.palette.pre.border,
    minHeight: '338px',
    height: '338px',
    overflowY: 'auto',
    display: 'block',
    position: 'relative',
  }));

  function HistoryTitle({ title }) {
    const Element = styled('strong')(({ theme }) => ({
      color: theme.palette.pre.color,
    }));

    return (
      <Element>
        {title &&
          <FormattedMessage id={title} defaultMessage={''} />
        }
      </Element>
    );
  }

  function HistoryDot({ item }) {
    switch (item.type) {
      case 'change':
        return (
          <TimelineDot>
            <div className={'history-dot'}>
              <FontAwesomeIcon icon="fa-solid fa-pencil" />
            </div>
          </TimelineDot>
        );
      case 'start':
        return (
          <TimelineDot color="secondary">
            <div className={'history-dot'}>
              <FontAwesomeIcon icon="fa-solid fa-play" />
            </div>
          </TimelineDot>
        );
      case 'comment':
        return (
          <TimelineDot color="primary">
            <div className={'history-dot'}>
              <FontAwesomeIcon icon="fa-solid fa-comment" />
            </div>
          </TimelineDot>
        );
      case 'event':
        return (
          <TimelineDot color="primary">
            <div className={'history-dot'}>
              <FontAwesomeIcon icon="fa-solid fa-calendar" />
            </div>
          </TimelineDot>
        );
      default:
        return (
          <TimelineDot>
            <div className={'history-dot'}>
              <FontAwesomeIcon icon="fa-solid fa-tag" />
            </div>
          </TimelineDot>
        );
    }
  }

  function HistoryItem({ item }) {
    if (item.type === 'comment') {
      return (
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
          >
            <HistoryTitle title={item.type} />
            <HtmlRenderer htmlCode={item.comment} />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <HistoryDot item={item} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <h6>
              {moment(item.createdOn).format('DD-MM-YY HH:mm')}
            </h6>
            <h6>{getUserName(item.createdBy)}</h6>
          </TimelineContent>
        </TimelineItem>
      );
    }

    if (item.type === 'event') {
      return (
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
          >
            <HistoryTitle title={item.type} />
            <div>
              <Tooltip
                title={moment(item.start).calendar()}
                placement="top"
              >
                <ExpirationChip>
                  <FontAwesomeIcon icon="fa-duotone fa-alarm-clock" />
                  {` ${moment(item.start).format('llll')}`}
                </ExpirationChip>
              </Tooltip>
              <strong>{item.subject}</strong>
            </div>
            <HtmlRenderer htmlCode={item.comment} />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <HistoryDot item={item} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <h6>
              {moment(item.createdOn).format('DD-MM-YY HH:mm')}
            </h6>
            <h6>{getUserName(item.createdBy)}</h6>
          </TimelineContent>
        </TimelineItem>
      );
    }

    return (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
        >
          <h6>
            {moment(item.createdOn).format('DD-MM-YY HH:mm')}
          </h6>
          <h6>{getUserName(item.createdBy)}</h6>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <HistoryDot item={item} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <HistoryTitle title={item.type} />
          <HtmlRenderer htmlCode={item.comment} />
        </TimelineContent>
      </TimelineItem>
    );
  }

  return (
    <Container>
      <Timeline>
        {history && history.length && history.slice().reverse().map(item => (
          <HistoryItem key={item._id} item={item} />
        ))}
      </Timeline>
    </Container>
  );
}

function NegotiationsDetailPage(props) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const current = useSelector(state => state.negotiations.current);
  const history = useSelector(state => state.negotiations.history);
  const states = useSelector(state => state.negotiations.states);
  const types = useSelector(state => state.negotiations.types);

  const [idNegotiation, setIdNegotiation] = useState(null);
  const [tab, setTab] = useState(0);
  const [actionTab, setActionTab] = useState(0);
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState(null);
  const [estimatedStartDate, setEstimatedStartDate] = useState(null);
  const [type, setType] = useState('');
  const [city, setCity] = useState({});
  const [contact, setContact] = useState({});
  const [status, setStatus] = useState('');
  const [rate, setRate] = useState(0);
  const [duration, setDuration] = useState(0);
  const [comment, setComment] = useState('');
  const [fee, setFee] = useState(0);
  const [totalOffer, setTotalOffer] = useState(0);
  const [saveModal, setSaveModal] = useState(false);
  const [sites, setSites] = useState([]);
  const [items, setItems] = useState([]);
  const [shareWithRead, setShareWithRead] = useState([]);
  const [shareWithWrite, setShareWithWrite] = useState([]);
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment().add(1, 'hours'));
  const [subject, setSubject] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [content, setContent] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [createdOn, setCreatedOn] = useState(moment());
  const [description, setDescription] = useState('');
  const [descriptionKey, setDescriptionKey] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [files, setSelectedFiles] = useState([]);

  const [reminderMinutesBeforeStart, setReminderMinutesBeforeStart] = useState(0);
  const theme = useSelector(state => state.app.theme);

  const darkMode = {
    title: {
      color: '#ffffff',
      backgroundColor: '#2F333D',
      padding: '8px 16px',
      width: '100%',
      border: '1px solid rgba(0,0,0,.5)',
      zIndex: 2,
    },
  };

  const lightMode = {
    title: {
      color: '#ffffff',
      backgroundColor: '#535c7e',
      padding: '8px 16px',
      border: '1px solid rgba(0,0,0,.5)',
      width: '100%',
      zIndex: 2,
    },
  };

  const draftCommentRef = useRef();
  const draftDescriptionRef = useRef();

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrent(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(closeAll());
    dispatch(setTitle(props.intl.messages.negotiations));
    dispatch(fetchTipCom());
    if (current?.id) {
      dispatch(setSitenav([
        { url: '/negotiations', title: props.intl.messages.negotiation },
        { url: `/negotiations/${current._id}`, title: current.id }
      ]));
      if (current.createdBy === user.username || user.roles.includes('negotiationsAdmin') || current?.shareWithWrite.includes(user.username)) {
        editInspection(true);
      } else {
        editInspection(false);
      }
    }
  }, [current]);

  if (!current) return null;

  const getTypeDescription = (type) => {
    if (types) {
      const result = types.find(t => t.vlcodtab === type);

      if (result) {
        return result.vldestab;
      }
    }

    return '';
  };

  const editInspection = (status) => {
    setEdit(status);
    if (status) {
      setSubject(current.subject);
      setDate(moment(current.date));
      setEstimatedStartDate(moment(current.estimatedStartDate));
      setStatus(current.status);
      setRate(current.rate);
      setDuration(current.duration);
      setFee(current.fee);
      setTotalOffer(current.totalOffer);
      setType(current.type);
      setSites(current.sites);
      if (current.items.length === 0) {
        setItems([{...new DefaultItem()}]);
      } else {
        setItems(current.items);
      }
      setShareWithRead(current.shareWithRead);
      setShareWithWrite(current.shareWithWrite);
      setComment('');
      setPhone(current.phone);
      setEmail(current.email);
      setDescription(current.description);
      setCity(current.city);
      setContact({ cotitle: current.contact || '', phones: [], email: [] });
      setDescriptionKey(Math.floor(Math.random() * 100));
      setIdNegotiation(current._id);
    }
  };

  const handleSelectTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleSelectActionTab = (event, newValue) => {
    setActionTab(newValue);
  };

  const handleChangeType = (event) => {
    const { value } = event.target;

    setType(value);
  };

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangeEstimatedStartDate = (newValue) => {
    setEstimatedStartDate(newValue);
  };

  const handleChangeStatus = (event) => {
    const { value } = event.target;
    console.log('Status: ', value);

    setStatus(value);
  };

  const handleChangeSuccess = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setRate(numericValue);
  };

  const handleChangeDuration = (event) => {
    const newDuration = event.target.value;
    setDuration(newDuration);
  };

  const handleChangeFee = (event) => {
    const { value } = event.target;

    setFee(value);
  };

  const handleAddComment = () => {
    const data = {
      id: (current._id) ? current._id : id,
      createdBy: user.username,
      createdOn,
      comment,
    };

    dispatch(addComment({ data }));

    // Reset form
    setComment('');
    setCreatedOn(moment());
    draftCommentRef.current.resetEditorState();
  };

  const handleAddEvent = () => {
    const data = {
      id: current._id,
      createdBy: user.username,
      start,
      end,
      reminderMinutesBeforeStart,
      subject: eventTitle,
      allDay,
      content: `<p>${content}</p>`,
    };

    dispatch(addEvent({ data }));

    // Reset form
    setContent('');
    setAllDay(false);
    setStart(moment());
    setEnd(moment().add(1, 'hours'));
    setEventTitle('');
    setReminderMinutesBeforeStart(0);
  };

  const handleChangeReminderMinutesBeforeStart = (minutes) => {
    setReminderMinutesBeforeStart(minutes);
  };

  const handleChangeAllDay = (event) => {
    setAllDay(event.target.checked);

    const newStart = moment(start).startOf('day');
    const newEnd = moment(newStart).add(1, 'days');

    setStart(newStart);
    setEnd(newEnd);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleCalcFee = () => {
    const newFee = totalOffer / duration;
    setFee(Number(newFee.toFixed(2)));
  };

  const handleChangeTotalOffer = (event) => {
    const { value } = event.target;

    setTotalOffer(value);
  };

  const handleShareWithReadChange = (selectedUsers) => {
    setShareWithRead(selectedUsers);
  };

  const handleShareWithWriteChange = (selectedUsers) => {
    setShareWithWrite(selectedUsers);
  };

  const handleSitesOnChange = (sites) => {
    setSites(sites);
  };

  const handleItemsOnChange = (items) => {
    setItems(items);
  };

  const handleCloseSaveModal = () => {
    setSaveModal(false);
  };

  const handleConfirmSaveModal = () => {
    setSaveModal(false);

    const data = {
      id: current._id,
      subject,
      description,
      date: date.toDate(),
      estimatedStartDate: estimatedStartDate.toDate(),
      status,
      phone,
      city,
      contact: contact?.cotitle || '',
      email,
      duration,
      rate,
      fee,
      totalOffer,
      type,
      sites,
      items,
      attachments,
      shareWithRead,
      shareWithWrite,
      reminderMinutesBeforeStart,
      createdBy: user.username,
    };

    const features = [];

    if (items.length) {
      items.forEach(item => {
        if ('features' in item && item.features.length) {
          item.features.forEach(feature => {
            for (const key in feature) {
              if (['freeflow', 'red', 'speed', 'media', 'ztl', 'mmcr'].includes(key) && feature[key] === true) {
                features.push(key);
              }
            }
          });
        }
      });
    }

    data.features = [...new Set(features)];
    draftDescriptionRef.current.resetEditorState();

    console.log('Data: ', data);

    dispatch(updateNegotiation({ data, files }));
    setAttachments([]);
    setSelectedFiles([]);
  };

  const handleChangeComment = (comment) => {
    setComment(comment);
  };

  const handleChangeDescription = (description) => {
    setDescription(description);
  };

  const handleChangeCreatedOn = (date) => {
    setCreatedOn(date);
  };

  const handleChangeStart = (date) => {
    const newStart = (allDay) ? moment(date).startOf('day') : date;
    const newEnd = (allDay) ? moment(newStart).add(1, 'days') : moment(newStart).add(1, 'hours');
    setStart(newStart);
    setEnd(newEnd);
  };

  const handleChangeEnd = (date) => {
    const newEnd = (allDay) ? moment(date).startOf('day') : date;
    setEnd(newEnd);
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleChangeEventTitle = (event) => {
    setEventTitle(event.target.value);
  };

  const handleSave = () => {
      setSaveModal(true);
  };

  const handleSelectContact = (contact) => {
    if (contact) {
      setContact(contact);

      if (phone === '' && 'phones' in contact && contact.phones.length > 0) {
        setPhone(contact.phones[0].phone);
      }

      if (email === '' && 'email' in contact && contact.email.length > 0) {
        setEmail(contact.email[0].email);
      }
    } else {
      setContact({});
    }
  };

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    const newAttachments = files.map(file => {
      return {
        name: file.name,
        description: '',
        size: file.size,
        type: file.type,
        path: file.path,
        lastModified: file.lastModified,
      }
    });
    setAttachments(newAttachments);
  };

  const handleChangeAttachment = (description, index) => {
    setAttachments(prevState => {
      return prevState.map((item, i) => {
        if (i === index) {
          return { ...item, description };
        }
        return item;
      });
    });
  };

  const handleSelectCity = (city) => {
    if (city) {
      setCity(city);
    } else {
      setCity({});
    }
  };

  const handleSelectProvince = (province) => {
    if (province) {
      setCity({
        ...city,
        pvdescri: province.province,
        rsdescri: province.region,
        ctprov: province.abbreviation,
      });
    }
  };

  const HtmlRendererContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.pre.backgroundColor,
    border: theme.palette.pre.border,
    color: theme.palette.pre.color,
    width: '100%',
    padding: '4px 16px',
    height: 302,
    overflowY: 'auto',
  }));

  return (
    <div style={{ padding: 16 }}>
      <Toolbar
        edit={edit}
        onSave={handleSave}
      />
      <DialogSave
        open={saveModal}
        text={'Desideri procedere con l\'aggiornamento della trattativa?'}
        onUndo={handleCloseSaveModal}
        onConfirm={handleConfirmSaveModal}
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: '#9da5b4' }}>
          <VmsTabs
            value={tab}
            onChange={handleSelectTab}
          >
            <VmsTab
              label={'Info'}
              icon={<FontAwesomeIcon icon="fa duotone fa-info-circle" />}
              iconPosition={'start'}
            />
            <VmsTab
              label={'Siti'}
              icon={<FontAwesomeIcon icon="fa duotone fa-sitemap" />}
              iconPosition={'start'}
            />
            <VmsTab
              label={'Articoli'}
              icon={<FontAwesomeIcon icon="fa duotone fa-cubes-stacked" />}
              iconPosition={'start'}
            />
            <VmsTab
              label={'Allegati'}
              icon={<FontAwesomeIcon icon="fa duotone fa-paperclip" />}
              iconPosition={'start'}
            />
          </VmsTabs>
        </Box>
        <div
          role={'tabpanel'}
          hidden={tab !== 0}
          id={'tabpanel-0'}
        >
          <Box sx={{ marginTop: '16px' }}>
            <Grid
              container
              alignItems="flex-start"
              columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            >
              <Grid
                xs={6}
                container
                item
                spacing={1}
                alignItems="flex-start"
              >
                <Grid xs={12} item>
                  {edit && (
                    <Input
                      name={'subject'}
                      placeholder={'Oggetto'}
                      className={'pre'}
                      value={subject}
                      onChange={handleChangeSubject}
                    />
                  )}
                  {!edit && (
                    <Pre value={current.subject} />
                  )}
                </Grid>
                <Grid xs={12} item>
                  {edit && (
                    <Draft
                      onChange={handleChangeDescription}
                      ref={draftDescriptionRef}
                      value={description}
                      key={descriptionKey}
                    />
                  )}
                  {!edit && (
                    <HtmlRendererContainer>
                      <HtmlRenderer htmlCode={current.description} />
                    </HtmlRendererContainer>
                  )}
                </Grid>
                <Grid xs={12} item>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: '#9da5b4' }}>
                      <VmsTabs
                        value={actionTab}
                        onChange={handleSelectActionTab}
                      >
                        <VmsTab
                          label={'Commento'}
                          icon={<FontAwesomeIcon icon="fa-duotone fa-comment" />}
                          iconPosition={'start'}
                        />
                        <VmsTab
                          label={'Appuntamento'}
                          icon={<FontAwesomeIcon icon="fa-duotone fa-calendar" />}
                          iconPosition={'start'}
                        />
                        <VmsTab
                          label={'Azioni'}
                          icon={<FontAwesomeIcon icon="fa-duotone fa-share-nodes" />}
                          iconPosition={'start'}
                        />
                      </VmsTabs>
                    </Box>
                    <div
                      role={'tabpanel'}
                      hidden={actionTab !== 0}
                      id={'tab-action-panel-0'}
                      style={{ position: 'relative' }}
                    >
                      <div className={'event-toolbar'}>
                        <Stack spacing={2} direction="row">
                          <Button
                            variant={theme === 'dark' ? 'outlined' : 'contained'}
                            style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
                            startIcon={<FontAwesomeIcon icon="fa-duotone fa-comment-plus" />}
                            onClick={handleAddComment}
                            disableElevation={Boolean(theme === 'light')}
                          >
                            <FormattedMessage id={'add'} />
                          </Button>
                        </Stack>
                      </div>
                      <Box sx={{ marginTop: '16px' }}>
                        <Grid
                          container
                          alignItems="flex-start"
                          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                        >
                          <Grid
                            xs={12}
                            container
                            item
                            spacing={1}
                            alignItems="flex-start"
                          >
                            <Grid xs={3} item>
                              <label>
                                <FormattedMessage id={'commentedOn'} />
                              </label>
                            </Grid>
                            <Grid xs={4} item>
                              <DateTime
                                value={createdOn}
                                onChange={handleChangeCreatedOn}
                              />
                            </Grid>
                            <Grid xs={12} item>
                              <Draft
                                onChange={handleChangeComment}
                                ref={draftCommentRef}
                                value={comment}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                    <div
                      role={'tabpanel'}
                      hidden={actionTab !== 1}
                      id={'tab-action-panel-1'}
                      style={{ position: 'relative' }}
                    >
                      <div className={'event-toolbar'}>
                        <Stack spacing={2} direction="row">
                          <Button
                            variant={theme === 'dark' ? 'outlined' : 'contained'}
                            style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
                            startIcon={<FontAwesomeIcon icon="fa-duotone fa-calendar-plus" />}
                            onClick={handleAddEvent}
                            disableElevation={Boolean(theme === 'light')}
                          >
                            <FormattedMessage id={'add'} />
                          </Button>
                        </Stack>
                      </div>
                      <Box sx={{ marginTop: '16px' }}>
                        <Grid
                          container
                          alignItems="flex-start"
                          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                        >
                          <Grid
                            xs={12}
                            container
                            item
                            spacing={1}
                            alignItems="flex-start"
                          >
                            <Grid xs={2} item>
                              <label>
                                <FormattedMessage id={'start'} />
                              </label>
                            </Grid>
                            <Grid xs={4} item>
                              <DateTime
                                value={start}
                                onChange={handleChangeStart}
                              />
                            </Grid>
                            <Grid xs={6} item>
                              <FormControlLabel
                                value={'start'}
                                control={
                                  <Switch
                                    checked={allDay}
                                    onChange={handleChangeAllDay}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                  />
                                }
                                label={'Tutto il giorno'}
                                labelPlacement={'start'}
                              />
                            </Grid>
                            <Grid xs={2} item>
                              <label>
                                <FormattedMessage id={'end'} />
                              </label>
                            </Grid>
                            <Grid xs={4} item>
                              <DateTime
                                value={end}
                                onChange={handleChangeEnd}
                              />
                            </Grid>
                            <Grid xs={2} item>
                              <label>
                                <FormattedMessage id={'reminder'} />
                              </label>
                            </Grid>
                            <Grid xs={4} item>
                              <Reminder
                                value={reminderMinutesBeforeStart}
                                onChange={handleChangeReminderMinutesBeforeStart}
                              />
                            </Grid>
                            <Grid xs={2} item>
                              <label>
                                <FormattedMessage id={'title'} />
                              </label>
                            </Grid>
                            <Grid xs={10} item>
                              <Input
                                type={'text'}
                                className={'pre'}
                                value={eventTitle}
                                onChange={handleChangeEventTitle}
                              />
                            </Grid>
                            <Grid xs={12} item>
                              <Textarea
                                rows={8}
                                value={content}
                                onChange={handleChangeContent}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                    <div
                      role={'tabpanel'}
                      hidden={actionTab !== 2}
                      id={'tab-action-panel-2'}
                    >
                      <Box sx={{ marginTop: '16px' }}>
                        <Grid
                          container
                          alignItems="flex-start"
                          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                        >
                          <Grid
                            xs={12}
                            container
                            item
                            spacing={1}
                            alignItems="flex-start"
                          >
                            <Grid xs={3} item>
                              <label>
                                <FormattedMessage id={'shareWithRead'} />
                              </label>
                            </Grid>
                            <Grid xs={9} item>
                              {edit && (
                                <SelectUsers
                                  defaultValue={shareWithRead}
                                  onChange={handleShareWithReadChange}
                                />
                              )}
                              {!edit && (
                                <SelectUsers
                                  defaultValue={shareWithRead}
                                />
                              )}
                            </Grid>
                            <Grid xs={3} item>
                              <label>
                                <FormattedMessage id={'shareWithWrite'} />
                              </label>
                            </Grid>
                            <Grid xs={9} item>
                              {edit && (
                                <SelectUsers
                                  defaultValue={shareWithWrite}
                                  onChange={handleShareWithWriteChange}
                                />
                              )}
                              {!edit && (
                                <SelectUsers
                                  defaultValue={shareWithWrite}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                xs={6}
                container
                item
                spacing={1}
                alignItems="flex-start"
              >
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'date'} />
                  </label>
                </Grid>
                <Grid xs={3} item>
                  {edit && (
                    <Date
                      value={date}
                      onChange={handleChangeDate}
                      className="date-picker"
                    />
                  )}
                  {!edit && (
                    <Pre
                      value={moment(current.date).format('DD-MM-YYYY')}
                    />
                  )}
                </Grid>
                <Grid xs={2} item>
                  <label>
                    <FormattedMessage id={'status'} />
                  </label>
                </Grid>
                <Grid xs={4} item>
                  {edit && (
                    <StyledSelect
                      value={status}
                      label="status"
                      name="status"
                      onChange={handleChangeStatus}
                    >
                      <StyledMenuItem key={'empty'} value={''}></StyledMenuItem>
                      {states.map((item, index) => (
                        <StyledMenuItem
                          key={index}
                          value={item}
                        >
                          {props.intl.messages[item] || item}
                        </StyledMenuItem>
                      ))}
                    </StyledSelect>
                  )}
                  {!edit && (
                    <Pre
                      value={props.intl.messages[current.status] || current.status}
                    />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Data inizio stimata
                  </label>
                </Grid>
                <Grid xs={3} item>
                  {edit && (
                    <Date
                      value={estimatedStartDate}
                      onChange={handleChangeEstimatedStartDate}
                      className="date-picker"
                    />
                  )}
                  {!edit && (
                    <Pre
                      value={moment(current.estimatedStartDate).format('DD-MM-YYYY')}
                    />
                  )}
                </Grid>
                <Grid xs={6} item>&nbsp;</Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'authority'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  {edit && (
                    <CityTypeahead
                      onChange={handleSelectCity}
                      defaultValue={city}
                    />
                  )}
                  {!edit && current.city && (
                    <Pre value={capitalizeCityLabel(current.city?.ctlocal) || ''} />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Provincia/Regione
                  </label>
                </Grid>
                <Grid xs={9} item>
                  {edit && (
                    <ProvinceTypeahead
                      onChange={handleSelectProvince}
                      defaultValue={city}
                    />
                  )}
                  {!edit && current.city && (
                    <Pre value={getProvinceAndRegionFromCity(current.city)} />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'contact'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  {edit && (
                    <ContactTypeahead
                      onChange={handleSelectContact}
                      defaultValue={contact}
                    />
                  )}
                  {!edit && current.contact && (
                    <Pre value={capitalizeName(current.contact)} />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'telephone'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  {edit && (
                    <Input
                      className={'pre'}
                      type={'text'}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  )}
                  {!edit && current.phone && (
                    <Pre className={'pre'}>
                      <a href={`tel:${current.phone}`}>{current.phone}</a>
                    </Pre>
                  )}
                  {!edit && !current.phone && (
                    <Pre value={''} />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'email'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  {edit && (
                    <Input
                      className={'pre'}
                      type={'text'}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  )}
                  {!edit && current.email && (
                    <Pre className={'pre'}>
                      <a href={`mailto:${current.email}`}>{current.email}</a>
                    </Pre>
                  )}
                  {!edit && !current.email && (
                    <Pre value={''} />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'origin'} />
                  </label>
                </Grid>
                <Grid xs={3} item>
                  <Pre value={current.origin || ''} />
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Prob. chiusura (%)
                  </label>
                </Grid>
                <Grid xs={3} item>
                  {edit && (
                    <Input
                      className={'pre'}
                      type={'number'}
                      value={rate}
                      min={0}
                      step={10}
                      max={100}
                      onChange={handleChangeSuccess}
                    />
                  )}
                  {!edit && (
                    <Pre
                      value={current.rate || ''}
                    />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'type'} />
                  </label>
                </Grid>
                <Grid xs={3} item>
                  {!edit && types && (
                    <Pre
                      value={getTypeDescription(current.type)}
                    />
                  )}
                  {edit && (
                    <StyledSelect
                      value={type}
                      label="Type"
                      name="type"
                      onChange={handleChangeType}
                    >
                      <StyledMenuItem key={'empty'} value={''}></StyledMenuItem>
                      {types.map((item, index) => (
                        <StyledMenuItem
                          key={index}
                          value={item.vlcodtab}
                        >
                          {item.vldestab}
                        </StyledMenuItem>
                      ))}
                    </StyledSelect>
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Durata (mesi)
                  </label>
                </Grid>
                <Grid xs={3} item>
                  {edit && (
                    <Input
                      className={'pre'}
                      type={'number'}
                      value={duration}
                      onChange={handleChangeDuration}
                    />
                  )}
                  {!edit && (
                    <Pre
                      value={current.duration || ''}
                    />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Canone mensile
                  </label>
                </Grid>
                <Grid xs={3} item>
                  {edit && (
                    <div className="input-group">
                      <Input
                        className={'input-group-input'}
                        type={'number'}
                        value={fee}
                        step={0.01}
                        onChange={handleChangeFee}
                      />
                      <InputGroupButton
                        className="input-group-button"
                      >
                        <button
                          onClick={handleCalcFee}
                        >
                          <FontAwesomeIcon icon="fa-calculator" />
                        </button>
                      </InputGroupButton>
                    </div>
                  )}
                  {!edit && (
                    <Pre
                      value={getEuroFromNumber(current.fee) || ''}
                    />
                  )}
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Totale offerta
                  </label>
                </Grid>
                <Grid xs={3} item>
                  {edit && (
                    <Input
                      className={'pre'}
                      type={'number'}
                      value={totalOffer}
                      step={0.01}
                      onChange={handleChangeTotalOffer}
                    />
                  )}
                  {!edit && (
                    <Pre value={getEuroFromNumber(current.totalOffer) || getEuroFromNumber(0)} />
                  )}
                </Grid>
                <Grid xs={12} item>
                  <div
                    style={(theme === 'dark') ? darkMode.title : lightMode.title}
                  >
                    Cronologia
                  </div>
                  <CustomizedTimeline
                    history={history}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div
          role={'tabpanel'}
          hidden={tab !== 1}
          id={'tabpanel-1'}
        >
          {!edit && current?.sites && (
            <SitesContainer sites={current.sites} />
          )}
          {edit && (
            <SitesGrid
              onChange={handleSitesOnChange}
              sites={sites}
            />
          )}
        </div>
        <div
          role={'tabpanel'}
          hidden={tab !== 2}
          id={'tabpanel-3'}
        >
          {!edit && current?.items && (
            <ItemsContainer items={current.items} intl={props.intl} />
          )}
          {edit && (
            <ItemsGrid
              items={items}
              onChange={handleItemsOnChange}
              sites={sites}
              id={idNegotiation}
            />
          )}
        </div>
        <div
          role={'tabpanel'}
          hidden={tab !== 3}
          id={'tabpanel-3'}
        >
          <div style={{ marginTop: 16 }}>
            {edit && (
              <Dropzone onFilesSelected={handleFilesSelected} />
            )}
            {current?.attachments && (
              <AttachmentsTable
                attachments={[...attachments, ...current.attachments]}
                onChange={handleChangeAttachment}
                edit={edit}
              />
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default injectIntl(NegotiationsDetailPage);
