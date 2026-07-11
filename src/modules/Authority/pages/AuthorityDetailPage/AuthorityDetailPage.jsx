import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuthorityById, fetchSubject, fetchSubjectLocations } from '../../authoritySlice';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Contacts from '../../components/Contacts/Contacts';
import { setTitle, setSitenav, closeAll } from '../../../App/appSlice';

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

function AuthorityDetailPage(props) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const current = useSelector(state => state.authority.current);
  const subject = useSelector(state => state.authority.subject);
  const locations = useSelector(state => state.authority.locations);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(closeAll());
      dispatch(fetchAuthorityById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (current.companyId) {
      dispatch(setTitle(`${props.intl.messages.authority} - ${current.authority}`));
      dispatch(setSitenav([
        { url: '/authority', title: props.intl.messages.authorities },
        { url: `/authority/${id}`, title: current.authority },
      ]));
      dispatch(fetchSubject(current.companyId));
      dispatch(fetchSubjectLocations(current.companyId));
    }
  }, [current]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderBlock = (options) => {
    return ([
      <Grid
        key={`block-label-${options.label.id}`}
        xs={options.label.size}
        item
      >
        <Item>
          <label>
            <FormattedMessage
              id={options.label.id}
            />
          </label>
        </Item>
      </Grid>,
      <Grid
        key={`block-value-${options.label.id}`}
        xs={options.value.size}
        item
      >
        <Item>
          {options.value.key
            ? <pre className={'pre'}>{options.value.key}</pre>
            : <Skeleton animation={'wave'} />
          }
        </Item>
      </Grid>
    ]);
  };

  return (
    <div className={'component'}>
      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 2, sm: 2, md: 2}}
        >
          <Grid container item xs={6} rowSpacing={1} spacing={2}>
            {renderBlock({
              label: { size: 3, id: 'authority' },
              value: { size: 9, key: (subject?.description) ? subject.description : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'address' },
              value: { size: 9, key: (locations[0]?.address) ? locations[0].address : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'location' },
              value: { size: 9, key: (locations[0]?.city) ? locations[0].city : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'zipCode' },
              value: { size: 3, key: (locations[0]?.postalCode) ? locations[0].postalCode : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'region' },
              value: { size: 3, key: (locations[0]?.region) ? locations[0].region : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'subjectCode' },
              value: { size: 3, key: (subject.subjectCode) ? subject.subjectCode : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'companyCode' },
              value: { size: 3, key: (subject.companyCode) ? subject.companyCode : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'fiscalCode' },
              value: { size: 3, key: (subject.fiscalCode) ? subject.fiscalCode : false }
            })}
            {renderBlock({
              label: { size: 3, id: 'vatNumber' },
              value: { size: 3, key: (subject.vatNumber) ? subject.vatNumber : false }
            })}
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Skeleton
                variant={'rectangular'}
                height={260}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: '#ffffff' }}>
          <Tabs
            value={value}
            onChange={handleChange}
          >
            <Tab
              label={'Siti'}
              icon={<FontAwesomeIcon icon={'info-circle'} />}
              iconPosition={'start'}
            />
            <Tab
              label={'Commesse'}
              icon={<FontAwesomeIcon icon={'file-contract'} />}
              iconPosition={'start'}
            />
            <Tab
              label={'Contatti'}
              icon={<FontAwesomeIcon icon={'address-book'} />}
              iconPosition={'start'}
            />
            <Tab
              label={'Datacenter'}
              icon={<FontAwesomeIcon icon={'server'} />}
              iconPosition={'start'}
            />
            <Tab
              label={'Activity Tracker'}
              icon={<FontAwesomeIcon icon={'clipboard-list'} />}
              iconPosition={'start'}
            />
            <Tab
              label={'Documenti'}
              icon={<FontAwesomeIcon icon={'archive'} />}
              iconPosition={'start'}
            />
          </Tabs>
        </Box>
        <div
          role={'tabpanel'}
          hidden={value !== 0}
          id={'tabpanel-0'}
        >
          Siti
        </div>
        <div
          role={'tabpanel'}
          hidden={value !== 1}
          id={'tabpanel-1'}
        >
          Commesse
        </div>
        {value === 2 &&
          <div
            role={'tabpanel'}
            id={'tabpanel-2'}
          >
            {current?.companyId &&
              <Contacts companyId={current.companyId} />
            }
          </div>
        }
        <div
          role={'tabpanel'}
          hidden={value !== 3}
          id={'tabpanel-3'}
        >
          Datacenter
        </div>
        <div
          role={'tabpanel'}
          hidden={value !== 4}
          id={'tabpanel-4'}
        >
          Activity tracker
        </div>
        <div
          role={'tabpanel'}
          hidden={value !== 5}
          id={'tabpanel-5'}
        >
          Documenti
        </div>
      </Box>
    </div>
  );
}

export default injectIntl(AuthorityDetailPage);
