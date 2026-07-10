import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { MenuItem, Select, Checkbox, Tooltip } from '@mui/material';
import ItemsModal from '../../../App/components/ItemsModal/ItemsModal';
import ItemSubmenuButton from '../../../App/components/ItemSubmenuButton/ItemSubmenuButton';
import { Input } from '../../../App/components/Input/Input';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { DefaultItem } from '../../../../util/utils';

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  color: theme.palette.pre.color,
  borderRadius: 0,
  '.MuiInputBase-input': {
    padding: '6px 16px',
  },
  '.MuiSelect-icon': {
    color: theme.palette.pre.color,
  },
}));

const StyledMenuItem =styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  color: theme.palette.pre.color,
}));

const InputGroupButton = styled('div')(({ theme }) => ({
  button: {
    color: theme.palette.pre.color,
  }
}));

const StyledCheck = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.pre.color,
  '&.Mui-disabled': {
    color: theme.palette.pre.color,
  },
  '&.Mui-checked': {
    color: theme.palette.pre.color,
  }
}));

const FeatureCheck = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.pre.color,
  '&.Mui-disabled': {
    color: theme.palette.checkbox.disabled,
  },
  '&.Mui-checked': {
    color: theme.palette.pre.color,
  }
}));

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

const StyledDirection = styled('span')(({ theme }) => ({
  color: theme.palette.pre.color,
}));

function Item(props) {
  const theme = useSelector(state => state.app.theme);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    props.onChange('code', newCode);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    props.onChange('description', newDescription);
  };

  const handleRefurbishedChange = (event) => {
    const newStatus = event.target.checked;
    props.onChange('refurbished', newStatus);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    props.onChange('quantity', newQuantity);
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;

    props.onChange('price', newPrice);
  };

  const handleDiscountChange = (event) => {
    const newDiscount = event.target.value;

    props.onChange('discount', newDiscount);
  };

  const handleChangeSite = (event) => {
    const newSiteId = event.target.value;

    props.onChange('siteId', newSiteId);
  };

  const handleOpenItemsModal = () => {
    props.onOpenItemsModal();
  };

  const handlePressEnter = (event) => {
    if (event.key === 'Enter') {
      props.onOpenItemsModal(props.item.code);
    }
  };

  return (
    <tr>
      <td
        style={{
          width: 60,
        }}
      >
        <ItemSubmenuButton
          onAddItemAfter={props.onAddItemAfter}
          onAddItemBefore={props.onAddItemBefore}
          onCloneItemBefore={props.onCloneItemBefore}
          onCloneItemAfter={props.onCloneItemAfter}
          onRemove={props.onRemove}
        />
      </td>
      <td>
        <StyledSelect
          value={props.item.siteId}
          label="siteId"
          name="siteId"
          onChange={handleChangeSite}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: (theme === 'dark') ? '#2F333D' : '#ffffff',
                border: (theme === 'dark') ? '1px solid #181a1f' : '1px solid #535c7e',
                boxShadow: 'none'
              },
            },
          }}
        >
          <StyledMenuItem value={''}></StyledMenuItem>
          {props.sites && props.sites.length > 0 && props.sites.map((site, index) => (
            <StyledMenuItem key={`site-${index}`} value={site.siteId}>{site.siteId}</StyledMenuItem>
          ))}
        </StyledSelect>
      </td>
      <td
        style={{
          width: 200,
        }}
      >
        <div className="input-group">
          <Input
            className={'input-group-input'}
            type={'string'}
            value={props.item.code}
            onChange={handleCodeChange}
            onKeyDown={handlePressEnter}
          />
          <InputGroupButton
            className="input-group-button"
          >
            <button
              onClick={handleOpenItemsModal}
            >
              <FontAwesomeIcon icon="fa-search" />
            </button>
          </InputGroupButton>
        </div>
      </td>
      <td>
        <Input
          className={'pre'}
          type={'text'}
          value={props.item.description}
          onChange={handleDescriptionChange}
        />
      </td>
      <td
        style={{
          width: 50,
        }}
      >
        <StyledCheck
          checked={props.item.refurbished}
          onChange={handleRefurbishedChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </td>
      <td
        style={{
          width: 100,
        }}
      >
        <Input
          className={'pre'}
          style={{
            textAlign: 'right',
          }}
          type={'number'}
          value={props.item.quantity}
          onChange={handleQuantityChange}
        />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Input
          className={'pre'}
          style={{
            textAlign: 'right',
          }}
          type={'number'}
          value={props.item.price}
          onChange={handlePriceChange}
        />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Input
          className={'pre'}
          style={{
            textAlign: 'right',
          }}
          type={'number'}
          value={props.item.discount}
          onChange={handleDiscountChange}
        />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Input
          className={'pre'}
          style={{
            textAlign: 'right',
          }}
          type={'text'}
          value={props.item.totalDiscount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
          readOnly
          disabled
        />
      </td>
      <td
        style={{
          width: 160,
        }}
      >
        <Input
          className={'pre'}
          style={{
            textAlign: 'right',
          }}
          type={'text'}
          value={props.item.totalAmount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
          readOnly
          disabled
        />
      </td>
    </tr>
  );
}

function Features({ item, onChange, intl }) {
  const { features } = item;

  const Feature = ({ feature, label }) => {
    const isAvailable = Boolean(item[feature] > 0);

    const isDisabled = (value) => {
      const max = item[feature];
      const countEnabled = item.features.filter(f => f[feature]).length;

      if (!value && countEnabled >= max) {
        return true;
      }
    };

    const handleChange = (options) => {
      onChange(options)
    };

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
                onChange={() => handleChange({ lane: item.lane, key: feature, value: !item[feature] })}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={isDisabled(item)}
              />
            </td>
          ))}
        </tr>
      )
    }
  }

  const Mmcr = () => {
    const isAvailable = Boolean(item.mmcr);

    const handleChange = (options) => {
      onChange(options)
    };

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
                onChange={() => handleChange({ lane: item.lane, key: 'mmcr', value: !item.mmcr })}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          ))}
        </tr>
      );
    }

    return null;
  };

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

    const handleChange = (feature) => {
      onChange(feature)
    };

    const getValue = (value) => {
      if (value === 'departing') {
        return 'approaching';
      } else if (value === 'approaching') {
        return 'both'
      } else {
        return 'departing'
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
              <StyledDirection
                onClick={() => handleChange({ lane: item.lane, key: 'direction', value: getValue(item.direction) })}
              >
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
    )
  };

  return (
    <tr>
      <td colSpan={3}>&nbsp;</td>
      <td colSpan={7}>
        <Table />
      </td>
    </tr>
  );
}

function ItemsGrid(props) {
  const [items, setItems] = useState([new DefaultItem()]);
  const [itemsModal, setItemsModal] = useState(false);
  const [totalDiscount, setTotalDiscount] = useState(0.00);
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [itemIndex, setItemIndex] = useState(0);
  const [search, setSearch] = useState('');
  const theme = useSelector(state => state.app.theme);

  useEffect(() => {
    if (props.id && props.items) {
      setGridItems();
    }
  }, [props.id]);

  useEffect(() => {
    const newTotalDiscount = items.reduce((acc, item) => acc + item.totalDiscount, 0);
    const newTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);

    setTotalDiscount(newTotalDiscount);
    setTotalAmount(newTotalAmount);
  }, [items]);

  const setGridItems = () => {
    const clonedItems = [...props.items];

    setItems(clonedItems);
  };

  const handleAddItemBefore = (index) => {
    setItems((prevItems) => {
      if (prevItems.length === 1) {
        return [new DefaultItem(), ...prevItems];
      }
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 0, new DefaultItem());
      return updatedItems;
    });
  };

  const handleCloneItemBefore = (index) => {
    setItems((prevItems) => {
      if (prevItems.length === 1) {
        return [new DefaultItem(), ...prevItems];
      }
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 0, _.cloneDeep(updatedItems[index]));
      return updatedItems;
    });
  };

  const handleAddItemAfter = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index + 1, 0, new DefaultItem());
      return updatedItems;
    });
  };

  const handleCloneItemAfter = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index + 1, 0, _.cloneDeep(updatedItems[index]));
      return updatedItems;
    });
  };

  const handleRemove = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotals = (object) => {
    const quantity = object.quantity;
    const price = object.price;
    const discount = object.discount;

    const totalDiscount = (quantity * price * discount) / 100;
    const totalAmount = quantity * price - totalDiscount;

    return { totalDiscount, totalAmount };
  };

  const handleOnChange = (key, value, index) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [key]: value,
    };

    const { totalDiscount, totalAmount } = calculateTotals(updatedItems[index])
    updatedItems[index]['totalDiscount'] = totalDiscount;
    updatedItems[index]['totalAmount'] = totalAmount;

    setItems(updatedItems);
    props.onChange(updatedItems);
  };

  const handleFeatureChange = (index, feature) => {
    setItems((prevItems) => {
      // const updatedItems = [...prevItems];
      const updatedItems = [..._.cloneDeep(prevItems)];

      updatedItems[index].features = updatedItems[index].features.map(item => {
        if (feature.key === 'mmcr' || item.lane === feature.lane) {
          return {
            ...item,
            [feature.key]: feature.value,
          };
        }

        return item;
      }) ;

      console.log(updatedItems);
      return updatedItems;
    });
    props.onChange(items);
  };

  const handleItemsModal = () => {
    setItemsModal(!itemsModal);
  };

  const handleOpenItemsModal = (index, value) => {
    setItemIndex(index);
    setItemsModal(true);
    if (value) {
      setSearch(value);
    }
  };

  const handleOnInsert = (data) => {
    setItemsModal(false);
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      const siteId = updatedItems[itemIndex]?.siteId || '';

      data.forEach((item, index) => {
        if (index === 0) {
          updatedItems[itemIndex] = { ...updatedItems[itemIndex], ...item };
        } else {
          updatedItems.splice(itemIndex + index, 0, { siteId, ...item });
        }
      });

      updatedItems.push(new DefaultItem());
      return updatedItems;
    });
  };

  return (
    <div>
      <ItemsModal
        open={itemsModal}
        search={search}
        onClose={handleItemsModal}
        onInsert={handleOnInsert}
      />
      <table
        className={'table-grid'}
      >
        <thead>
          <tr>
            <th
              style={{
                width: 60,
              }}
            >
              &nbsp;
            </th>
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
          <React.Fragment key={`row-${index}`}>
            <Item
              key={`item-${index}`}
              item={item}
              sites={props.sites}
              onAddItemAfter={() => handleAddItemAfter(index)}
              onAddItemBefore={() => handleAddItemBefore(index)}
              onCloneItemAfter={() => handleCloneItemAfter(index)}
              onCloneItemBefore={() => handleCloneItemBefore(index)}
              onRemove={() => handleRemove(index)}
              onChange={(key, value) => handleOnChange(key, value, index)}
              onOpenItemsModal={(search) => handleOpenItemsModal(index, search)}
            />
            {item.lanes > 0 && (
              <Features
                item={item}
                key={`features-${index}`}
                onChange={(feature) => handleFeatureChange(index, feature)}
                intl={props.intl}
              />
            )}
          </React.Fragment>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8}>
              &nbsp;
            </td>
            <td
              style={{
                width: 160,
              }}
            >
              <Input
                className={'pre'}
                style={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: (theme === 'dark') ? '#45c3ec': '#017bb0',
                }}
                type={'string'}
                value={totalDiscount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                readOnly
                disabled
              />
            </td>
            <td
              style={{
                width: 160,
              }}
            >
              <Input
                className={'pre'}
                style={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: (theme === 'dark') ? '#45c3ec': '#017bb0',
                }}
                type={'string'}
                value={totalAmount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                readOnly
                disabled
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default injectIntl(ItemsGrid);
