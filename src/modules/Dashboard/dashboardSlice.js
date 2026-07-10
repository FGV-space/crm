import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from "../../util/apiCaller";

export const fetchWeather = createAsyncThunk('dashboard/fetchWeather', async () => {
  const response = await client.get('weather/last');

  return response.data;
});

export const fetchMarkers = createAsyncThunk('dashboard/fetchMarkers', async () => {
  const response = await client.get('camera/markers');

  return response.data;
});

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    weather: {},
    markers: [],
  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload.data;
      })
      .addCase(fetchMarkers.fulfilled, (state, action) => {
        state.markers = action.payload.markers;
      })
  },
});

export default dashboardSlice.reducer;
