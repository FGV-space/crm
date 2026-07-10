import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client, uploadAttachments } from '../../util/apiCaller';
import { updateSorting } from '../../util/utils';

export const fetchOrigins = createAsyncThunk('negotiations/origin', async () => {
  const response = await client.get('infinity/categories/SOURCE');

  return response.data;
});

export const fetchTipCom = createAsyncThunk('negotiations/tipcom', async () => {
  const response = await client.get('infinity/tipcom');

  return response.data;
});

export const fetchData = createAsyncThunk('negotiations/data', async (data) => {
  const response = await client.post('negotiations', data);

  return response.data;
});

export const fetchCurrent = createAsyncThunk('negotiations/current', async (id) => {
  const response = await client.get(`negotiation/${id}`);

  return response.data;
});

export const createNegotiation = createAsyncThunk('negotiations/create', async (data) => {
  const response = await client.post('negotiation', data.data);
  const { id } = response.data.data;

  if (data.files) {
    const formData = new FormData();

    data.files.forEach((file) => {
      formData.append('files', file);
    });

    await uploadAttachments(`negotiation/upload/${id}`, formData);
  }

  return response.data;
});

export const updateNegotiation = createAsyncThunk('negotiations/update', async (data) => {
  const response = await client.put(`negotiation/${data.data.id}`, data.data);
  const { id } = response.data.data;

  if (data.files) {
    const formData = new FormData();

    data.files.forEach((file) => {
      formData.append('files', file);
    });

    await uploadAttachments(`negotiation/upload/${id}`, formData);
  }

  return response.data;
});

export const addEvent = createAsyncThunk('negotiations/event', async (data) => {
  const response = await client.put(`negotiation/event/${data.data.id}`, data.data);

  return response.data;
});

export const addComment = createAsyncThunk('negotiations/comment', async (data) => {
  const response = await client.put(`negotiation/comment/${data.data.id}`, data.data);

  return response.data;
});

const states = [
  'opened',
  'suspended',
  'negativelyClosed',
  'successfullyClosed',
];

const features = [
  'freeflow',
  'red',
  'speed',
  'media',
  'ztl',
  'mmcr',
]

export const negotiationsSlice = createSlice({
  name: 'negotiations',
  initialState: {
    columns: [
      { key: 'status', label: 'status', width: '80px', align: 'center', sortable: true, type: 'multiselect', values: states, show: true },
      { key: 'id', label: 'id', width: '80px', align: 'center', sortable: true, type: 'number', show: true },
      { key: 'date', label: 'date', width: '120px', align: 'center', sortable: true, type: 'date', show: true },
      { key: 'subject', label: 'subject', width: 'auto', sortable: true, type: 'text', show: false },
      { key: 'rate', label: 'rate', width: '140px', align: 'center', sortable: true, type: 'number', show: true },
      { key: 'type', label: 'type', width: '120px', align: 'center', sortable: true, type: 'multiselect', values: [], valuesKey: 'vlcodtab', valuesLabel: 'vldestab', show: true },
      { key: 'numberOfSites', label: 'sites', width: '100px', align: 'center', sortable: true, type: 'number', show: true },
      { key: 'items', label: 'items', alias: 'items.description', width: '200px', align: 'center', type: 'text', sortable: false, show: true },
      { key: 'features', label: 'features', width: '200px', align: 'center', type: 'multiselect', values: features, sortable: false, show: true },
      { key: 'city', label: 'authority', width: 'auto', sortable: true, type: 'text', show: true },
      { key: 'province', label: 'country', width: '240px', sortable: true, type: 'text', show: true },
      { key: 'region', label: 'region', width: '240px', sortable: true, type: 'text', show: true },
      { key: 'totalOffer', label: 'totalNegotiation', width: '240px', align: 'right', sortable: true, type: 'number', show: true },
      { key: 'createdBy', label: 'createdBy', width: '100px', align: 'center', sortable: true, type: 'users', rbac: 'negotiationsAdmin', show: true },
      { key: 'shareWithRead', label: 'shareR', width: '100px', align: 'center', sortable: true, type: 'users', show: true },
      { key: 'shareWithWrite', label: 'shareW', width: '100px', align: 'center', sortable: true, type: 'users', show: true },
    ],
    types: [],
    states,
    showFilters: false,
    showSummary: false,
    grid: {
      filters: {},
      sorting: [],
    },
    current: {},
    history: [],
    data: [],
    origins: [],
  },
  reducers: {
    setFilters: (state, action) => {
      state.grid.filters = { ...action.payload };
    },
    setSorting: (state, action) => {
      state.grid.sorting = [ ...updateSorting(state.grid.sorting, action.payload) ]
    },
    toggleFilters: (state, action) => {
      state.showFilters = !state.showFilters;
    },
    toggleSummary: (state, action) => {
      state.showSummary = !state.showSummary;
    },
    toggleShowColumn: (state, action) => {
      state.columns = state.columns.map(column => {
        if (column.key === action.payload.key) {
          return {
            ...column,
            show: !column.show,
          };
        }

        return column;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchOrigins.fulfilled, (state, action) => {
        state.origins = action.payload.data;
      })
      .addCase(fetchCurrent.fulfilled, (state, action) => {
        state.current = action.payload.data;
        state.history = action.payload.history;
      })
      .addCase(createNegotiation.fulfilled, (state, action) => {
        state.current = action.payload.data;
        state.history = action.payload.history;
      })
      .addCase(updateNegotiation.fulfilled, (state, action) => {
        state.current = action.payload.data;
        state.history = action.payload.history;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.history = action.payload.history;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.history = action.payload.history;
      })
      .addCase(fetchTipCom.fulfilled, (state, action) => {
        state.types = action.payload;
        state.columns = state.columns.map(column => {
          if (column.key === 'type') {
            return {
              ...column,
              values: action.payload,
            };
          }
          return column;
        });
      })
  }
});

export const {
  setFilters,
  setSorting,
  toggleFilters,
  toggleSummary,
  toggleShowColumn,
} = negotiationsSlice.actions;
export default negotiationsSlice.reducer;
