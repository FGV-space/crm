import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { client } from '../../util/apiCaller';

const cookies = new Cookies();

const initialState = {
  auth: false,
  data: {},
  users: [],
  message: null,
  showPassword: false,
};

export const loginRequest = createAsyncThunk('user/loginRequest', async (data) => {

  if (import.meta.env.DEV) {
    return {
      user: {
        username: data.user.username || 'dev',
        name: 'Developer',
      },
      token: 'dev-token',
    };
  }

  const response = await client.post('login', data);

  return response.data;
});

export const fetchActiveUsers = createAsyncThunk('user/fetchActiveUsers', async () => {
  const response = await client.get('users/active');

  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.auth = true;
      state.data = { ...payload.user };
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    resetMessage: (state) => {
      state.message = null;
    },
    logOut: (state) => {
      console.log('Loggin out..');
      localStorage.clear();
      cookies.remove('vms');
      state.auth = false;
      state.data = {};
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginRequest.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.token) {
          userSlice.caseReducers.setData(state, action);
          localStorage.setItem('vms.user', JSON.stringify(action.payload.user));
          cookies.set(
            'vms',
            action.payload.token,
            { maxAge: 864e2, path: '/', secure: true, sameSite: 'None', httpOnly: false });
        } else {
          state.message = action.payload.err;
        }
      })
      .addCase(fetchActiveUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      });
  }
});

export const {
  setData,
  logOut,
  toggleShowPassword,
  resetMessage,
} = userSlice.actions;

export default userSlice.reducer;
