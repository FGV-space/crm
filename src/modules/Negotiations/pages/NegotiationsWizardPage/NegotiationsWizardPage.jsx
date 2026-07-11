import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { closeAll, setSitenav, setTitle } from '../../../App/appSlice';
import { createNegotiation, fetchTipCom } from '../../negotiationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Button,
  Paper,
  Grid,
  Box,
  FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { buttonStylePink, buttonStylePinkLight } from '../../../../util/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CityTypeahead from '../../../App/components/CityTypeahead/CityTypeahead';
import ContactTypeahead from '../../../App/components/ContactTypeahead/ContactTypeahead';
import Draft from '../../../App/components/Draft/Draft';
import SelectOrigin from '../../components/SelectOrigin/SelectOrigin';
import ItemsGrid from "../../components/ItemsGrid/ItemsGrid";
import Date from '../../../App/components/Date/Date';
import moment from 'moment';
import DialogSave from '../../../App/components/Dialogs/DialogSave';
import SitesGrid from '../../components/SitesGrid/SitesGrid';
import Dropzone from '../../../App/components/Dropzone/Dropzone';
import AttachmentsTable from "../../../App/components/AttachmentsTable/AttachmentsTable";
import { Input, InputGroupButton } from '../../../App/components/Input/Input';
import { VmsTab, VmsTabs } from '../../../App/components/Tabs/Tabs';
import { StyledMenuItem, StyledSelect } from '../../../App/components/Select/Select';
import SelectUsers from '../../../App/components/SelectUsers/SelectUsers';
import ProvinceTypeahead from '../../../App/components/ProvinceTypeahead/ProvinceTypeahead';

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

function Toolbar(props) {
  const theme = useSelector(state => state.app.theme);
  function handleSave() {
    props.onSave();
  }

  return (
    <div className={'grid-toolbar'}>
      <Stack spacing={2} direction="row">
        <Button
          variant={theme === 'dark' ? 'outlined' : 'contained'}
          style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
          startIcon={<FontAwesomeIcon icon={'fa-duotone fa-floppy-disk'} />}
          onClick={handleSave}
          disableElevation={Boolean(theme === 'light')}
        >
          <FormattedMessage id={'save'} />
        </Button>
      </Stack>
    </div>
  );
}

function PhoneOption({ type, phone }) {
  let icon;

  switch (type) {
    case 'C':
      icon = 'fa-duotone fa-mobile-screen-button';
      break;
    case 'F':
      icon = 'fa-duotone fa-phone-office';
      break;
    case 'X':
      icon = 'fa-duotone fa-fax';
      break;
    default:
      icon = 'fa-duotone fa-mobile-screen-button';
  }

  return (
    <span>
      <FontAwesomeIcon icon={icon} style={{ width: 14, marginRight: '1em' }} />
      {phone}
    </span>
  );
}

class CityTransformer {
  constructor() {
    this.mapping = {
      ctlocal: 'city',
      ctprov: 'province',
      ctcap: 'postalCode',
      pvdescri: 'country',
      rsdescri: 'region'
    };

    // Costruiamo anche la mappatura inversa
    this.reverseMapping = Object.fromEntries(
      Object.entries(this.mapping).map(([key, value]) => [value, key])
    );
  }

  /**
   * Da chiavi dello schema a chiavi standard (es: ctlocal -> city)
   */
  transform(data) {
    const transformed = {};
    for (const key in data) {
      if (this.mapping[key]) {
        transformed[this.mapping[key]] = data[key];
      }
    }
    return transformed;
  }

  /**
   * Da chiavi standard a chiavi dello schema (es: city -> ctlocal)
   */
  reverseTransform(data) {
    const reversed = {};
    for (const key in data) {
      if (this.reverseMapping[key]) {
        reversed[this.reverseMapping[key]] = data[key];
      }
    }
    return reversed;
  }
}

function NegotiationsWizardPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.data);
  const current = useSelector(state => state.negotiations.current);
  const states = useSelector(state => state.negotiations.states);
  const types = useSelector(state => state.negotiations.types);
  const previous = useRef(current);
  const [saveModal, setSaveModal] = useState(false);
  const [city, setCity] = useState({});
  const [date, setDate] = useState(moment());
  const [estimatedStartDate, setEstimatedStartDate] = useState(moment().add(3, 'month'));
  const [status, setStatus] = useState('opened');
  const [type, setType] = useState('');
  const [contact, setContact] = useState({});
  const [phone, setPhone] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [email, setEmail] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(50);
  const [origin, setOrigin] = useState('');
  const [fee, setFee] = useState(0);
  const [items, setItems] = useState([]);
  const [sites, setSites] = useState([]);
  const [totalOffer, setTotalOffer] = useState(0);
  const [tab, setTab] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [files, setSelectedFiles] = useState([]);
  const [shareWithRead, setShareWithRead] = useState([]);
  const [shareWithWrite, setShareWithWrite] = useState([]);

  const customPhoneRef = useRef(null);
  const customEmailRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTipCom());
    dispatch(closeAll());
    dispatch(setTitle(props.intl.messages.newNegotiation));
    dispatch(setSitenav([
      { url: '/negotiations', title: props.intl.messages.negotiations },
      { url: '/negotiations/wizard', title: props.intl.messages.new },
    ]))
  }, []);

  useEffect(() => {
    if (previous.current !== current) {
      navigate('/negotiations');
    }
    previous.current = current;
  }, [current]);

  useEffect(() => {
    if (phone === 'custom') {
      customPhoneRef.current.focus();
    }
  }, [phone]);

  useEffect(() => {
    if (email === 'custom') {
      customEmailRef.current.focus();
    }
  }, [email]);

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

  const handleSave = () => {
    setSaveModal(true);
  };

  const handleSelectCity = (city) => {
    if (city) {
      setCity(new CityTransformer().reverseTransform(city));
    } else {
      setCity({});
    }
  };

  const handleSelectContact = (contact) => {
    if (contact) {
      console.log(contact);
      setContact(contact);

      if ('phones' in contact && contact.phones.length > 0) {
        setPhone(contact.phones[0].phone);
      }

      if ('email' in contact && contact.email.length > 0) {
        setEmail(contact.email[0].email);
      }
    } else {
      setContact({});
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

  const handleSelectOrigin = (origin) => {
    setOrigin(origin);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleChangeDuration = (event) => {
    const newDuration = event.target.value;
    setDuration(newDuration);
  };

  const handleChangeFee = (event) => {
    const { value } = event.target;

    setFee(value);
  };

  const handleCalcFee = () => {
    const newFee = totalOffer / duration;
    setFee(Number(newFee.toFixed(2)));
  };

  const handleChangeTotalOffer = (event) => {
    const { value } = event.target;

    setTotalOffer(value);
  };

  const handleChangeSuccess = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setRate(numericValue);
  };

  const handleCloseSaveModal = () => {
    setSaveModal(false);
  };

  const handleConfirmSaveModal = () => {
    setSaveModal(false);

    const data = {
      city,
      date: date.toDate(),
      estimatedStartDate: estimatedStartDate.toDate(),
      status,
      type,
      contact: contact?.cotitle || '',
      phone: (phone === 'custom') ? customPhone : phone,
      email: (email === 'custom') ? customEmail : email,
      subject,
      description,
      duration,
      rate,
      origin,
      fee,
      totalOffer,
      sites,
      items,
      attachments,
      shareWithRead,
      shareWithWrite,
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

    console.log(data);

    dispatch(createNegotiation({ data, files }));
  };

  const handleSelectTab = (event, newValue) => {
    setTab(newValue);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleCustomPhoneChange = (event) => {
    setCustomPhone(event.target.value);
  };

  const handleShareWithReadChange = (selectedUsers) => {
    setShareWithRead(selectedUsers);
  };

  const handleShareWithWriteChange = (selectedUsers) => {
    setShareWithWrite(selectedUsers);
  };

  const handleCustomPhoneSubmit = (event) => {
    event.preventDefault();
    setContact(oldContact => {
      const { phones } = oldContact;

      phones.push({ type: 'F', phone: customPhone })

      return {
        ...oldContact,
        phones,
      };
    });
    setPhone(customPhone);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCustomEmailChange = (event) => {
    setCustomEmail(event.target.value);
  };

  const handleCustomEmailSubmit = (event) => {
    event.preventDefault();
    setContact(oldContact => {
      const { email } = oldContact;

      email.push({ email: customEmail })

      return {
        ...oldContact,
        email,
      };
    });
    setEmail(customEmail);
  }

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangeEstimatedStartDate = (newValue) => {
    setEstimatedStartDate(newValue);
  };

  const handleItemsOnChange = (items) => {
    setItems(items);
  };

  const handleSitesOnChange = (sites) => {
    setSites(sites);
  };

  const handleChangeDraft = (description) => {
    setDescription(description);
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

  return (
    <div style={{ padding: 16 }}>
      <Toolbar
        onSave={handleSave}
      />
      <DialogSave
        open={saveModal}
        text={'Desideri procedere con il salvataggio della trattativa?'}
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
                  <Input
                    name={'subject'}
                    placeholder={'Oggetto'}
                    className={'pre'}
                    value={subject}
                    onChange={handleChangeSubject}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Draft
                    onChange={handleChangeDraft}
                  />
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'shareWithRead'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  <SelectUsers
                    defaultValue={shareWithRead}
                    onChange={handleShareWithReadChange}
                  />
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'shareWithWrite'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  <SelectUsers
                    defaultValue={shareWithWrite}
                    onChange={handleShareWithWriteChange}
                  />
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
                  <Date
                    value={date}
                    onChange={handleChangeDate}
                    className="date-picker"
                  />
                </Grid>
                <Grid xs={2} item>
                  <label>
                    <FormattedMessage id={'status'} />
                  </label>
                </Grid>
                <Grid xs={4} item>
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
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Data inizio stimata
                  </label>
                </Grid>
                <Grid xs={3} item>
                  <Date
                    value={estimatedStartDate}
                    onChange={handleChangeEstimatedStartDate}
                    className="date-picker"
                  />
                </Grid>
                <Grid xs={6} item>&nbsp;</Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'authority'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  <Item>
                    <CityTypeahead
                      onChange={handleSelectCity}
                    />
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Provincia/Regione
                  </label>
                </Grid>
                <Grid xs={9} item>
                  <ProvinceTypeahead
                    onChange={handleSelectProvince}
                    defaultValue={city}
                  />
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'contact'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  <Item>
                    <ContactTypeahead
                      onChange={handleSelectContact}
                      defaultValue={contact}
                    />
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'telephone'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  <FormControl>
                    {phone !== 'custom' &&
                      <StyledSelect
                        value={phone}
                        onChange={handlePhoneChange}
                      >
                        {contact?.phones && contact.phones.map((option) => (
                          <StyledMenuItem key={option.phone} value={option.phone}>
                            <PhoneOption
                              type={option.type}
                              phone={option.phone}
                            />
                          </StyledMenuItem>
                        ))}
                        <StyledMenuItem key="custom" value="custom">
                          <em>Inserisci nuovo</em>
                        </StyledMenuItem>
                      </StyledSelect>
                    }
                    {phone === 'custom' && (
                      <form onSubmit={handleCustomPhoneSubmit}>
                        <Input
                          className={'pre'}
                          placeholder={'Inserisci nuovo'}
                          type={'text'}
                          value={customPhone}
                          onChange={handleCustomPhoneChange}
                          ref={customPhoneRef}
                        />
                      </form>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'email'} />
                  </label>
                </Grid>
                <Grid xs={9} item>
                  <FormControl>
                    {email !== 'custom' &&
                      <StyledSelect
                        value={email}
                        onChange={handleEmailChange}
                      >
                        {contact?.email && contact.email.map((option) => (
                          <StyledMenuItem key={option.email} value={option.email}>
                            {option.email}
                          </StyledMenuItem>
                        ))}
                        <StyledMenuItem key="custom" value="custom">
                          <em>Inserisci nuova</em>
                        </StyledMenuItem>
                      </StyledSelect>
                    }
                    {email === 'custom' && (
                      <form onSubmit={handleCustomEmailSubmit}>
                        <Input
                          className={'pre'}
                          placeholder={'Inserisci nuova'}
                          type={'text'}
                          value={customEmail}
                          onChange={handleCustomEmailChange}
                          ref={customEmailRef}
                        />
                      </form>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'origin'} />
                  </label>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <SelectOrigin
                      onChange={handleSelectOrigin}
                    />
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Prob. chiusura (%)
                  </label>
                </Grid>
                <Grid xs={3} item>
                  <Input
                    className={'pre'}
                    type={'number'}
                    value={rate}
                    min={0}
                    step={10}
                    max={100}
                    onChange={handleChangeSuccess}
                  />
                </Grid>
                <Grid xs={3} item>
                  <label>
                    <FormattedMessage id={'type'} />
                  </label>
                </Grid>
                <Grid xs={3} item>
                  <Item>
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
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Durata (mesi)
                  </label>
                </Grid>
                <Grid xs={3} item>
                  <Input
                    className={'pre'}
                    type={'number'}
                    value={duration}
                    onChange={handleChangeDuration}
                  />
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Canone mensile
                  </label>
                </Grid>
                <Grid xs={3} item>
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
                </Grid>
                <Grid xs={3} item>
                  <label>
                    Totale offerta
                  </label>
                </Grid>
                <Grid xs={3} item>
                  <Input
                    className={'pre'}
                    type={'number'}
                    value={totalOffer}
                    step={0.01}
                    onChange={handleChangeTotalOffer}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div
          role={'tabpanel'}
          hidden={tab !== 1}
          id={'tabpanel-0'}
        >
          <SitesGrid
            onChange={handleSitesOnChange}
          />
        </div>
        <div
          role={'tabpanel'}
          hidden={tab !== 2}
          id={'tabpanel-1'}
        >
          <ItemsGrid
            onChange={handleItemsOnChange}
            sites={sites}
          />
        </div>
        <div
          role={'tabpanel'}
          hidden={tab !== 3}
          id={'tabpanel-2'}
        >
          <div style={{ marginTop: 16 }}>
            <Dropzone onFilesSelected={handleFilesSelected} />
            {attachments.length > 0 && (
              <AttachmentsTable
                attachments={attachments}
                onChange={handleChangeAttachment}
                edit={true}
              />
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default injectIntl(NegotiationsWizardPage);
