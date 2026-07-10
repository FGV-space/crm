import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from "../../util/apiCaller";

export const notificationMarkAsRead = createAsyncThunk('app/notificationMarkAsRead', async (user) => {
  await client.put(`notification/mark/${user}`, { read: true });
});

export const searchEngine = createAsyncThunk('app/searchEngine', async (value) => {
  const response = await client.get(`utils/search/${value}`);

  return response.data;
});

export const fetchNotificationsCount = createAsyncThunk('app/fetchNotificationsCount', async (value) => {
  const response = await client.get(`notification/${value}`);

  return response.data;
});

export const fetchNotifications = createAsyncThunk('app/fetchNotifications', async (value) => {
  const response = await client.post('notification', value);

  return response.data;
});

export const toggleNotification = createAsyncThunk('app/toggleNotification', async (value) => {
  const response = await client.put(`notification/${value.id}`, value);

  return response.data;
});

export const fetchInfinityItems = createAsyncThunk('app/fetchInfinityItems', async (value) => {
  const response = await client.get('infinity/items');

  return response.data;
});

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    title: 'VMS³',
    editDashboard: false,
    showOverlay: false,
    showNotifications: false,
    showMenu: false,
    showSearch: false,
    searchStatus: 'idle',
    searchFilters: [
      { label: 'Tutti', icon: 'search', selected: true },
    ],
    searchResults: [],
    value: 0,
    menu: [
      { title: 'dashboard', url: '/dashboard', icon: 'fa-duotone fa-house', duotone: true, active: true, permission: 'everyone' },
      { title: 'map', url: '/map', icon: 'fa-duotone fa-earth-europe', duotone: true, active: false, permission: 'everyone' },
      { title: 'inspections', url: '/inspections', icon: 'fa-duotone fa-map-marked-alt', duotone: true, active: true, permission: 'everyone' },
      { title: 'negotiations', url: '/negotiations', icon: 'fa-duotone fa-handshake', duotone: true, active: true, permission: 'everyone' },
      { title: 'offers', url: '/offers', icon: 'fa-duotone fa-money-check-dollar-pen', duotone: true, active: true, permission: 'everyone' },
      { title: 'jobCards', url: '/job-cars', icon: 'fa-duotone fa-inbox-full', duotone: true, active: true, permission: 'everyone' },
    ],
    sitenav: [],
    notificationCount: 0,
    notifications: [],
    items: [],
    theme: 'dark',
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = `VMS³ - ${action.payload}`
    },
    setSitenav: (state, action) => {
      state.sitenav = action.payload
    },
    closeAll: (state) => {
      state.showMenu = false;
      state.showSearch = false;
      state.showNotifications = false;
      state.showOverlay = false;
    },
    setSearchStatus: (state, action) => {
      state.searchStatus = action.payload
    },
    selectSearchFilter: (state, action) => {
      state.searchFilters = state.searchFilters.map(item => {
        if (item.label === action.payload) {
          return {
            ...item,
            selected: true,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      });
    },
    toggleSubmenu: (state, action) => {
      state.menu = state.menu.map(item => {
        if (item.submenu) {
          if (item.title === action.payload) {
            return {
              ...item,
              toggled: !item.toggled,
            };
          }
          return {
            ...item,
            toggled: false,
          };
        }
        return item;
      });
    },
    toggleNotificationArea: (state) => {
      state.showNotifications = !state.showNotifications
      state.showSearch = false;
      state.showMenu = false;
      state.showOverlay = state.showNotifications;
    },
    showSearch: (state) => {
      state.showSearch = true;
      state.showMenu = false;
      state.showNotifications = false;
      state.showOverlay = true;
    },
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu
      state.showSearch = false;
      state.showNotifications = false;
      state.showOverlay = state.showMenu;
    },
    toggleDashboard: (state) => {
      state.editDashboard = !state.editDashboard
    },
    switchTheme: (state) => {
      state.theme = (state.theme === 'dark') ? 'light' : 'dark'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(notificationMarkAsRead.fulfilled, (state) => {
        state.notificationCount = 0
      })
      .addCase(searchEngine.pending, (state) => {
        state.searchStatus = 'loading'
      })
      .addCase(searchEngine.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded'
        state.searchResults = action?.payload.results || []
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action?.payload.data;
      })
      .addCase(fetchNotificationsCount.fulfilled, (state, action) => {
        state.notificationCount = action.payload.data;
      })
      .addCase(toggleNotification.fulfilled, (state, action) => {
        state.notificationCount += (action.payload.data.read) ? -1 : 1;
        state.notifications = state.notifications.map(notification => {
          if (notification._id === action.payload.data._id) {
            return action.payload.data;
          }

          return notification;
        })
      })
      .addCase(fetchInfinityItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  }
});

// Action creators are generated for each case reducer function
export const {
  setTitle,
  setSitenav,
  toggleDashboard,
  toggleNotificationArea,
  toggleMenu,
  showSearch,
  selectSearchFilter,
  closeAll,
  setSearchStatus,
  toggleSubmenu,
  switchTheme,
} = appSlice.actions;

export default appSlice.reducer;
