import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTitle, setSitenav, closeAll } from '../../../App/appSlice';
import { fetchData, setSorting, setFilters, toggleFilters, toggleSummary, toggleShowColumn, fetchTipCom } from '../../negotiationsSlice';
import { FormattedMessage, injectIntl } from 'react-intl';
import Grid from '../../../App/components/Grid/Grid';
import { Stack, Avatar, Button, Typography, Box, Chip, Tooltip  } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';
import { buttonStylePink, buttonStyleOrange, buttonStyleOrangeLight, buttonStylePinkLight } from '../../../../util/material';
import moment from 'moment';
import {
  capitalizeCityLabel,
  getEuroFromNumber,
  getLabelFromValues,
  getModelIcon,
  getNameAndSurname
} from '../../../../util/utils';
import { fetchActiveUsers } from '../../../User/userSlice';
import LinearProgress from '@mui/material/LinearProgress';
import FilterItem from "../../../App/components/FilterItem/FilterItem";
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, Tooltip as ReTooltip } from 'recharts';
import ExportToCsv from "../../../App/components/ExportToCsv/ExportToCsv";
import ColumnSelector from "../../../App/components/ColumnSelector/ColumnSelector";
import { styled } from '@mui/material/styles';
import FilterMenu2 from "../../../App/components/FilterMenu/FilterMenu";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.label}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomBar = ({ fill, stroke, ...rest }) => (
  <g>
    <rect {...rest} fill={fill} stroke={stroke} />
  </g>
);

function TypeChart(props) {
  const theme = useSelector(state => state.app.theme);

  const data = [
    { name: 'Vendita', label: 'Vendita', value: 0, color: (theme === 'dark') ? '#45c3ec' : '#017bb0' },
    { name: 'Noleggio', label: 'Noleggio', value: 0, color: '#9Fef00' },
  ];

  if (props.data) {
    props.data.forEach(item => {
      switch (item.type) {
        case 'VE':
          data[0].value += 1;
          break;
        case 'NO':
          data[1].value += 1;
          break;
        default:
          null;
      }
    });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={80} data={data} margin={{ bottom: -10 }}>
        <XAxis dataKey="name" />
        <ReTooltip
          cursor={{fill: 'transparent'}}
          content={<CustomTooltip />}
          wrapperStyle={{ margin: 0, padding: 0, color: '#FFFFFF', background: '#5b5b5c', borderRadius: 4 }}
        />
        <Bar dataKey="value" shape={<CustomBar />}>
          {data.map((entry, index) =>
            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} fillOpacity={0.5} />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function RateChart(props) {
  const theme = useSelector(state => state.app.theme);

  const data = [
    { name: '0', label: '0%', value: 0, color: '#ec4545' },
    { name: '25', label: '25%', value: 0, color: '#ecad45' },
    { name: '50', label: '50%', value: 0, color: '#ecec45' },
    { name: '75', label: '75%', value: 0, color: '#45ec45' },
    { name: '100', label: '100%', value: 0, color: '#4545ec' },
  ];

  if (props.data) {
    props.data.forEach(item => {
      if (item.rate >= 0 && item.rate < 25) {
        data[0].value += item.totalOffer;
      } else if (item.rate >= 25 && item.rate < 50) {
        data[1].value += item.totalOffer;
      } else if (item.rate >= 50 && item.rate < 75) {
        data[2].value += item.totalOffer;
      } else if (item.rate >= 75 && item.rate < 100) {
        data[3].value += item.totalOffer;
      } else if (item.rate >= 100) {
        data[4].value += item.totalOffer;
      }
    });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={80} data={data} margin={{ bottom: -10 }}>
        <XAxis dataKey="name" />
        <ReTooltip
          cursor={{fill: 'transparent'}}
          content={<CustomTooltip />}
          wrapperStyle={{ margin: 0, padding: 0, color: '#FFFFFF', background: '#5b5b5c', borderRadius: 4 }}
        />
        <Bar dataKey="value" shape={<CustomBar />}>
          {data.map((entry, index) =>
            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} fillOpacity={0.5} />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function StatusChart(props) {
  const theme = useSelector(state => state.app.theme);

  const data = [
    { name: 'A', label: 'Aperte', value: 0, color: (theme === 'dark') ? '#45c3ec' : '#017bb0' },
    { name: 'CP', label: 'Chiuse positivamente', value: 0, color: '#9Fef00' },
    { name: 'CN', label: 'Chiuse negativamente', value: 0, color: '#ff3e3e' },
    { name: 'S', label: 'Sospese', value: 0, color: '#ffaf00' },
  ];

  if (props.data) {
    props.data.forEach(item => {
      switch (item.status) {
        case 'opened':
          data[0].value += 1;
          break;
        case 'successfullyClosed':
          data[1].value += 1;
          break;
        case 'negativelyClosed':
          data[2].value += 1;
          break;
        case 'suspended':
          data[3].value += 1;
          break;
        default:
          null;
      }
    });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={80} data={data} margin={{ bottom: -10 }}>
        <XAxis dataKey="name" />
        <ReTooltip
          cursor={{fill: 'transparent'}}
          content={<CustomTooltip />}
          wrapperStyle={{ margin: 0, padding: 0, color: '#FFFFFF', background: '#5b5b5c', borderRadius: 4 }}
        />
        <Bar dataKey="value" shape={<CustomBar />}>
          {data.map((entry, index) =>
            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} fillOpacity={0.5} />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function Toolbar({ intl }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(state => state.negotiations.data);
  const [convertedData, setConvertedData] = useState([]);
  const [showColumns, setShowColumns] = useState(false);
  const columns = useSelector(state => state.negotiations.columns);
  const showFilters = useSelector(state => state.negotiations.showFilters);
  const showSummary = useSelector(state => state.negotiations.showSummary);
  const users = useSelector(state => state.user.users);
  const theme = useSelector(state => state.app.theme);

  useEffect(() => {
    dispatch(fetchActiveUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0 && data.length > 0 && data && data.length > 0) {
      setConversion();
    }
  }, [users, data]);

  const setConversion = () => {
    const getItems = (items) => {
      const data = items.filter(item => item.code !== '');
      const counts = {};

      // Conteggio degli oggetti
      data.forEach(obj => {
        const code = obj.code;
        if (counts[code]) {
          counts[code]++;
        } else {
          counts[code] = 1;
        }
      });

      const result = Object.keys(counts).map(code => {
        return `${code} (${counts[code]})`;
      });

      return result.join(',');
    };

    const newData = data.map(item => {
      return {
        [intl.messages.status]: item.status,
        [intl.messages.date]: moment(item.date).format('DD-MM-YYYY'),
        [intl.messages.subject]: item.subject,
        [intl.messages.rate]: item.rate,
        [intl.messages.type]: item.type,
        [intl.messages.items]: getItems(item.items),
        [intl.messages.authority]: capitalizeCityLabel(item.city),
        [intl.messages.country]: capitalizeCityLabel(item.province),
        [intl.messages.region]: capitalizeCityLabel(item.region),
        [intl.messages.totalNegotiation]: item.totalOffer,
        [intl.messages.user]: getNameAndSurname(users, item.createdBy),
      };
    });

    setConvertedData(newData);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const handleToggleSummary = () => {
    dispatch(toggleSummary());
  };

  const handleToggleColumn = (column) => {
    dispatch(toggleShowColumn(column));
  };

  return (
    <div className={'grid-toolbar'}>
      <Stack spacing={2} direction="row">
        <Button
          variant={theme === 'dark' ? 'outlined' : 'contained'}
          style={theme === 'dark' ? buttonStyleOrange : buttonStyleOrangeLight}
          startIcon={<FontAwesomeIcon icon={['fa-regular', (showFilters) ? 'fa-eye' : 'fa-eye-slash'].join(' ')} />}
          onClick={handleToggleFilters}
          disableElevation={Boolean(theme === 'light')}
        >
          Filtri
        </Button>
        <ColumnSelector columns={columns} onToggle={handleToggleColumn} />
        <Button
          variant={theme === 'dark' ? 'outlined' : 'contained'}
          style={theme === 'dark' ? buttonStyleOrange : buttonStyleOrangeLight}
          startIcon={<FontAwesomeIcon icon={['fa-regular', (showSummary) ? 'fa-eye' : 'fa-eye-slash'].join(' ')} />}
          onClick={handleToggleSummary}
          disableElevation={Boolean(theme === 'light')}
        >
          Sommario
        </Button>
        <ExportToCsv data={convertedData} />
        <Button
          variant={theme === 'dark' ? 'outlined' : 'contained'}
          style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
          startIcon={<FontAwesomeIcon icon={'fa-plus'} />}
          onClick={() => navigate('/negotiations/wizard')}
          disableElevation={Boolean(theme === 'light')}
        >
          Nuova
        </Button>
      </Stack>
    </div>
  );
}

function Summary(props) {
  const data = useSelector(state => state.negotiations.data);

  const SummaryBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.summaryBox.backgroundColor,
    border: theme.palette.summaryBox.border,
  }));

  const SummaryHeader = styled('div')(({ theme }) => ({
    color: theme.palette.summaryHeader.color,
  }));

  const SummaryTotal = styled('div')(({ theme }) => ({
    color: theme.palette.summaryTotal.color,
  }));

  const SummaryIcon = styled('div')(({ theme }) => ({
    color: theme.palette.summaryTotal.color,
  }));

  const getTotal = (key) => {
    const sum = data.reduce((acc, value) => {
      return acc + value[key];
    }, 0);

    return sum;
  };

  const getAverage = (key) => {
    const sum = data.reduce((acc, value) => {
      return acc + value[key];
    }, 0);

    const average = (sum / data.length).toFixed(2);

    return average;
  };

  const getCount = (key, value) => {
    const count = data.filter(item => item[key] === value).length;

    return count;
  };

  return (
    <div className={'summary'}>
      <SummaryBox className={'summary-box'}>
        <SummaryHeader className={'summary-header'}>
          <FormattedMessage id={'status'} />
        </SummaryHeader>
        <div className="summary-content">
          <StatusChart data={data} />
        </div>
      </SummaryBox>
      <SummaryBox className={'summary-box'}>
        <SummaryHeader className={'summary-header'}>
          <FormattedMessage id={'type'} />
        </SummaryHeader>
        <div className="summary-content">
          <TypeChart data={data} />
        </div>
      </SummaryBox>
      <SummaryBox className={'summary-box'}>
        <SummaryHeader className={'summary-header'}>
          <FormattedMessage id={'rate'} />
        </SummaryHeader>
        <div className="summary-content">
          <RateChart data={data} />
        </div>
      </SummaryBox>
      <SummaryBox className={'summary-box'}>
        <SummaryHeader className={'summary-header'}>
          Totale trattative
        </SummaryHeader>
        <div className="summary-content">
          <div className={'summary-wrapper'}>
            <SummaryTotal className={'summary-total'}>
              {getEuroFromNumber(getTotal('totalOffer'))}
            </SummaryTotal>
          </div>
          <SummaryIcon className={'summary-icon'}>
            <FontAwesomeIcon icon={'fa-duotone fa-wallet'} />
          </SummaryIcon>
        </div>
      </SummaryBox>
    </div>
  );
}

function Filters(props) {
  const dispatch = useDispatch();
  const columns = useSelector(state => state.negotiations.columns);
  const filters = useSelector(state => state.negotiations.grid.filters);

  const handleOnApply = (query) => {
    const newFilters = Object.assign({}, filters, query);
    dispatch(setFilters(newFilters));
  };

  const handleOnRemoveKey = (key) => {
    let newFilters = Object.assign({}, filters);
    delete newFilters[key];

    dispatch(setFilters(newFilters));
  };

  return (
    <div
      style={{
        marginLeft: 14
      }}
    >
      <FilterMenu2
        columns={columns}
        onApply={handleOnApply}
      />
      <FilterItem
        columns={columns}
        filters={filters}
        onRemoveKey={(key) => handleOnRemoveKey(key)}
      />
    </div>
  );
}

function LinearProgressWithLabel(props) {
  const Container = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
  }));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Container
          variant="body2"
        >
          {`${Math.round(props.value)}%`}
        </Container>
      </Box>
    </Box>
  );
}

function ItemClips({ items }) {
  const Container = styled(Chip)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '12px',
    fontFamily: 'Menlo,Consolas,DejaVu Sans Mono,monospace !important',
  }));

  return (
    <Stack direction="column" spacing={1}>
      {items.map((item, index) => (
        <Container
          key={index}
          icon={<FontAwesomeIcon icon={getModelIcon(item.code)} />}
          label={`${item.code} (${item.count})`}
          variant="outlined"
        />
      ))}
    </Stack>
  );
}

function FeaturesClips({ features }) {
  const Container = styled(Chip)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '12px',
    fontFamily: 'Menlo,Consolas,DejaVu Sans Mono,monospace !important',
  }));

  return (
    <Stack direction="column" spacing={1}>
      {features.map((item, index) => (
        <Container
          key={index}
          label={item.toUpperCase()}
          variant="outlined"
        />
      ))}
    </Stack>
  );
}

function NegotiationsListPage(props) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const user = useSelector(state => state.user.data);
  const columns = useSelector(state => state.negotiations.columns);
  const data = useSelector(state => state.negotiations.data);
  const grid = useSelector(state => state.negotiations.grid);
  const showFilters = useSelector(state => state.negotiations.showFilters);
  const showSummary = useSelector(state => state.negotiations.showSummary);
  const theme = useSelector(state => state.app.theme);

  useEffect(() => {
    dispatch(closeAll());
    dispatch(setTitle(props.intl.messages.negotiations));
    dispatch(setSitenav([
      { url: '/negotiations', title: props.intl.messages.negotiations }]))
    dispatch(fetchTipCom());
  }, [dispatch]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchActiveUsers());
    }
  }, [dispatch]);

  useEffect(() => {
    const newFilters = { ...grid.filters };
    const newSorting = [ ...grid.sorting ];

    if (user && !user.roles.includes('negotiationsAdmin')) {
      newFilters.createdBy = { $eq: user.username };
      newFilters.shareWithRead = { $in: [user.username] };
      newFilters.shareWithWrite = { $in: [user.username] };
    }

    dispatch(fetchData({ filters: newFilters, sorting: newSorting }));
  }, [grid]);

  const userAvatar = (string) => {
    try {
      if (!users || users.length === 0) {
        return null;
      }

      const userData = users.find(item => item.username === string);
      const children = `${userData.name[0]}${userData.surname[0]}`
      const { color } = userData;

      return {
        sx: {
          width: 24,
          height: 24,
          color,
          fontSize: '12px',
          fontFamily: 'Menlo,Consolas,DejaVu Sans Mono,monospace !important',
          bgcolor: 'transparent',
          border: `2px solid ${color}`
        },
        children,
      };
    } catch (e) {
      console.log(e);
      return {
        sx: {
          width: 24,
          height: 24,
          color: '#eee',
          fontSize: '12px',
          fontFamily: 'Menlo,Consolas,DejaVu Sans Mono,monospace !important',
          bgcolor: 'transparent',
          border: '2px solid #eee'
        },
        children: 'ND',
      };
    }

  };

  const statusAvatar = (string) => {
    let color;
    let children;

    switch (string) {
      case 'opened':
        children = 'A';
        color = (theme === 'dark') ? '#45c3ec' : '#017bb0';
        break;

      case 'successfullyClosed':
        children = 'CP';
        color = '#9Fef00';
        break;

      case 'negativelyClosed':
        children = 'CN';
        color = '#ff3e3e';
        break;

      default:
        children = 'S';
        color = '#ffaf00';
    }

    return {
      sx: {
        width: 24,
        height: 24,
        color,
        fontSize: '12px',
        fontFamily: 'Menlo,Consolas,DejaVu Sans Mono,monospace !important',
        bgcolor: 'transparent',
        border: `2px solid ${color}`
      },
      children,
    };
  }

  const itemsChip = (items) => {
    const data = items.filter(item => item.code !== '');
    const counts = {};

    // Conteggio degli oggetti
    data.forEach(obj => {
      const code = obj.code;
      if (counts[code]) {
        counts[code]++;
      } else {
        counts[code] = 1;
      }
    });

    const result = Object.keys(counts).map(code => {
      return { code: code, count: counts[code] };
    });

    return (
      <ItemClips items={result} />
    );
  };

  const featuresChip = (items) => {
    return (
      <FeaturesClips features={items} />
    );
  };

  const handleSort = (column) => {
    dispatch(setSorting(column.key));
  };

  const renderRow = (value, column, _id) => {
    const Link = styled(NavLink)(({ theme }) => ({
      color: theme.palette.primary.main,
    }));

    switch (column.key) {
      case 'id':
        return (
          <Link to={`/negotiations/${_id}`}>
            {String(value).padStart(4, '0')}
          </Link>
        );

      case 'createdOn':
      case 'date':
        return (
          <span>
            {moment(value).format('DD-MM-YYYY')}
          </span>
        );

      case 'createdBy':
        return (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Tooltip title={getNameAndSurname(users, value)}>
              <Avatar {...userAvatar(value)} />
            </Tooltip>
          </div>
        );

      case 'shareWithRead':
      case 'shareWithWrite':
        return (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            {value.map((item, index) => (
              <Tooltip key={index} title={getNameAndSurname(users, item)}>
                <Avatar {...userAvatar(item)} />
              </Tooltip>
            ))}
          </Stack>
        );

      case 'city':
      case 'province':
      case 'region':
        return (
          <span>{capitalizeCityLabel(value)}</span>
        );

      case 'items':
        return (
          <div>{itemsChip(value)}</div>
        );

      case 'features':
        return (
          <div>{featuresChip(value)}</div>
        );

      case 'status':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title={props.intl.messages[value]}>
              <Avatar {...statusAvatar(value)} />
            </Tooltip>
          </div>
        );

      case 'type':
        return (
          <span>{getLabelFromValues(column, value)}</span>
        );

      case 'rate':
        return (
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={value} />
          </Box>
        )

      case 'totalOffer':
        return (
          <span>{getEuroFromNumber(value)}</span>
        );

      default:
        return <span>{value}</span>;
    }
  }

  return (
    <div>
      <Toolbar intl={props.intl} />
      {showSummary && (
        <Summary />
      )}
      {showFilters && (
        <Filters />
      )}
      <Grid
        columns={columns}
        data={data}
        onSort={(column) => handleSort(column)}
        sorting={grid.sorting}
        renderRow={renderRow}
      />
    </div>
  );
}

export default injectIntl(NegotiationsListPage);
