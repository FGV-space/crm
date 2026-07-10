import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../util/apiCaller';

export const fetchCameras = createAsyncThunk('camera/list', async () => {
  const response = await client.get('camera/list');

  return response.data;
});

export const fetchModels = createAsyncThunk('camera/models', async () => {
  const response = await client.get('camera/models');

  return response.data;
});

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    data: [],
    models: [],
    columns: [
      { key: 'sn', label: 'serialNumber', width: '150px' },
      { key: 'model', label: 'model', width: '150px' },
      { key: 'hwRevision', label: 'hwRevision', width: '120px' },
      { key: 'authority', label: 'authority', width: 'auto' },
      { key: 'site', label: 'site', width: 'auto' },
      { key: 'heightAboveTheRoad', label: 'height', width: '120px' },
      { key: 'yellowPointDistance', label: 'distance', width: '120px' },
      { key: 'ocr', label: 'Ocr', width: '120px' },
      { key: 'ctx', label: 'Ctx', width: '120px' },
      { key: 'lane1', label: 'L1', width: '40px' },
      { key: 'lane2', label: 'L2', width: '40px' },
      { key: 'lane3', label: 'L3', width: '40px' },
      { key: 'licence', label: 'MMR', width: '40px', align: 'center' },
      { key: 'configured', label: 'Con.', width: '40px', align: 'center' },
      { key: 'activated', label: 'Act.', width: '40px', align: 'center' },
      { key: 'installed', label: 'Ins.', width: '40px', align: 'center' },
      { key: 'monitored', label: 'Mon.', width: '40px', align: 'center' },
      { key: 'scrapped', label: 'Rot.', width: '40px', align: 'center' },
      { key: 'firmware', label: 'firmware', width: '270px' },
    ]
  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.models = action.payload.data;
      })
  },
});

export default cameraSlice.reducer;
