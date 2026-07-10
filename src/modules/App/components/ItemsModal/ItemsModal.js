import React, { forwardRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ItemsTable from '../ItemsTable/ItemsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buttonStyleGreen, buttonStyleOrange, buttonStyleOrangeLight, buttonStyleGreenLight } from '../../../../util/material';
import { Stack, Button, Dialog, AppBar, Toolbar, Slide } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Input } from '../Input/Input';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.pre.backgroundColor,
  }
}));

const StyledSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default function ItemsModal(props) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const theme = useSelector(state => state.app.theme);

  useEffect(() => {
    setSearch(props.search);
  }, [props.search]);

  const handleClose = () => {
    props.onClose();
  };

  const handleInsert = () => {
    props.onInsert(items);
  };

  const generateFeatures = (item) => {
    const lanes = [];

    for (let i = item.lanes; i > 0; i--) {
      const config = {
        lane: i,
        direction: 'departing'
      };

      if (item.red) config.red = false;
      if (item.speed) config.speed = false;
      if (item.freeflow) config.freeflow = false;
      if (item.media) config.media = false;
      if (item.ztl) config.ztl = false;
      if (item.mmcr) config.mmcr = false;

      lanes.push(config)
    }

    return lanes;
  }

  const handleOnSelect = (items) => {
    const data = items.map(item => {
      const data = {
        code: item.arcodart,
        description: item.ardesart,
        quantity: 1,
        price: 0.00,
        discount: 0,
        totalDiscount: 0.00,
        totalAmount: 0.00,
        lanes: item.lanes,
        red: item.red,
        speed: item.speed,
        freeflow: item.freeflow,
        ztl: item.ztl,
        media: item.media,
        mmcr: item.mmcr,
      }

      if (['AGUIA', 'VRS-EVO'].includes(item.arcodfam)) {
        data.features = generateFeatures(data);
      }

      return data;
    });

    setItems(data);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <StyledDialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ width: '100%' }}
            >
              <Stack spacing={2} direction="row">
                <StyledSpan
                  style={{ fontSize: 18 }}
                >
                  <FontAwesomeIcon
                    icon={'magnifying-glass'}
                    style={{ color: '#eeeeee' }}
                  />
                </StyledSpan>
                <span>
                  <Input
                    type="text"
                    name="search"
                    value={search}
                    placeholder={'Ricerca articolo'}
                    onChange={handleSearch}
                    style={{
                      fontSize: 16,
                      border: 'none'
                    }}
                  />
                </span>
              </Stack>
              <Stack spacing={2} direction="row">
                <Button
                  variant={theme === 'dark' ? 'outlined' : 'contained'}
                  style={theme === 'dark' ? buttonStyleOrange : buttonStyleOrangeLight}
                  startIcon={<FontAwesomeIcon icon={'fa-duotone fa-xmark'} />}
                  onClick={handleClose}
                  disableElevation={Boolean(theme === 'light')}
                >
                  Chiudi
                </Button>
                <Button
                  variant={theme === 'dark' ? 'outlined' : 'contained'}
                  style={theme === 'dark' ? buttonStyleGreen: buttonStyleGreenLight}
                  startIcon={<FontAwesomeIcon icon={'fa-duotone fa-diagram-successor'} />}
                  onClick={handleInsert}
                  disableElevation={Boolean(theme === 'light')}
                >
                  Inserisci
                </Button>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
        <ItemsTable
          onSelect={handleOnSelect}
          search={search}
        />
      </StyledDialog>
    </div>
  );
}
