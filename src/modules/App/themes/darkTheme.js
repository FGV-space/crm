import { createTheme } from '@mui/material/styles';

const fontFamily = '\'Menlo\', \'Consolas\', \'DejaVu Sans Mono\', monospace';
const fontSize = 14;
const fontWeight = 800;

export const dark = createTheme({
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
  },
  palette: {
    fontFamily,
    fontSize,
    fontWeight,
    primary: {
      main: '#45c3ec',
    },
    secondary: {
      main: '#ffffff',
    },
    header: {
      backgroundColor: '#181a1f',
    },
    aside: {
      backgroundColor: '#2f333d',
    },
    widget: {
      backgroundColor: 'rgba(0,0,0,.3)',
      border: '1px solid rgba(0,0,0,.5)',
      boxShadow: '0 0 13px rgba(0,0,0,.22)',
    },
    logo: {
      fill: '#9da5b4',
    },
    clock: {
      color: '#ffffff',
      backgroundColor: '#2f333d',
    },
    searchResults: {
      backgroundColor: '#2f333d',
    },
    table: {
      th: {
        color: '#45C3EC',
        backgroundColor: '#1a1e22',
        borderTop: '2px solid #FFFFFF1F',
        borderBottom: '1px solid #FFFFFF1F',
      },
      td: {
        color: '#ffffff',
        backgroundColor: '#1a1e22',
        borderTop: '1px solid #FFFFFF1F',
      },
    },
    tableGrid: {
      th: {
        color: '#45C3EC',
      },
    },
    summaryBox: {
      backgroundColor: '#181A1F',
      border: '2px solid #2F333D',
    },
    summaryHeader: {
      color: '#45C3EC',
    },
    summaryTotal: {
      color: '#45C3EC',
    },
    pre: {
      border: '1px solid #181a1f',
      color: '#9FEF00',
      backgroundColor: '#2F333D'
    },
    buttonFilterOptions: {
      backgroundColor: '#21252B',
      backgroundColorHover: '#2F333D',
      border: '1px solid #181A1F',
    },
    tab: {
      border: '1px solid rgba(157,165,180,.3)',
    },
    tabSelected: {
      border: '1px solid #9DA5B4',
    },
    checkbox: {
      disabled: '#9da5b4',
    },
    datePicker: {
      weekDayLabel: {
        color: '#9da5b4',
      },
      dayOutsideMonth: {
        color: '#b0b2b6'
      },
    },
    appBar: {
      backgroundColor: '#21252b',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#9da5b4',
          backgroundColor: '#21252b',
          fontFamily,
          fontSize: 14,
          fontWeight: 800,
          padding: 0,
          margin: 0,
        },
        a: {
          color: '#abb2bf',
        },
        input: {
          color:  '#9FEF00',
          backgroundColor: '#2F333D',
          border: '1px solid #181A1F',
        },
        label: {
          color: '#ffffff',
        }
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          color:  '#9FEF00',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#2F333D',
          border: '1px solid #181a1f',
          boxShadow: 'none',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.15rem',
          fontWeight: 'bold',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#9FEF00',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#9FEF00',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize,
          fontWeight,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          border: '1px solid #181a1f',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '16px',
        },
      },
    },
    MuiMultiSectionDigitalClockSection: {
      styleOverrides: {
        root: {
          color: '#9FEF00',
        }
      }
    }
  },
});
