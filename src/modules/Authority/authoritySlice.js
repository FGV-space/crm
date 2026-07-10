import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from "../../util/apiCaller";

export const fetchAuthorityById = createAsyncThunk('authority/fetchAuthority', async (id) => {
  const response = await client.get(`authority/${id}`);

  return response.data;
});

export const fetchSiteById = createAsyncThunk('authority/fetchSite', async (id) => {
  const response = await client.get(`authority/site/${id}`);

  return response.data;
});

export const fetchSubject = createAsyncThunk('authority/fetchSubject', async (companyId) => {
  const response = await client.get(`infinity/subject/${companyId}`);

  return response.data;
});

export const fetchSubjectLocations = createAsyncThunk('authority/fetchSubjectLocations', async (companyId) => {
  const response = await client.get(`infinity/subject/locations/${companyId}`);

  return response.data;
});

export const fetchContacts = createAsyncThunk('authority/fetchContacts', async (companyId) => {
  const response = await client.get(`infinity/subject/contacts/${companyId}`);

  return response.data;
});

export const authoritySlice = createSlice({
  name: 'authority',
  initialState: {
    current: {},
    subject: {},
    locations: [],
    contacts: [],
    site: {},
  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthorityById.fulfilled, (state, action) => {
        state.current = action.payload.data;
      })
      .addCase(fetchSiteById.fulfilled, (state, action) => {
        state.site = action.payload.data;
      })
      .addCase(fetchSubject.fulfilled, (state, action) => {
        state.subject = action.payload.data;
      })
      .addCase(fetchSubjectLocations.fulfilled, (state, action) => {
        state.locations = action.payload.data;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.data;
      })
  }
});

export default authoritySlice.reducer;
