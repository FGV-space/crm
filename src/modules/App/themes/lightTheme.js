import { createTheme } from '@mui/material/styles';

const fontFamily = '\'Menlo\', \'Consolas\', \'DejaVu Sans Mono\', monospace';
const fontSize = 14;
const fontWeight = 800;

export const light = createTheme({
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
      main: '#017bb0',
    },
    secondary: {
      main: '#535c6a',
    },
    header: {
      backgroundColor: '#535c7e',
    },
    aside: {
      backgroundColor: '#535c6a',
    },
    widget: {
      backgroundColor: 'rgba(255,255,255,.3)',
      border: '1px solid rgba(255,255,255,.5)',
      boxShadow: '0 0 13px rgba(255,255,255,.22)',
    },
    logo: {
      fill: '#eef2f4',
    },
    clock: {
      color: '#535c7e',
      backgroundColor: '#eef2f4',
    },
    searchResults: {
      backgroundColor: '#eef2f4',
    },
    table: {
      th: {
        color: '#017bb0',
        backgroundColor: '#ffffff',
        borderTop: '2px solid #535c7e',
        borderBottom: '1px solid #535c7e',
      },
      td: {
        color: '#535c7e',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #535c7e',
      },
    },
    tableGrid: {
      th: {
        color: '#017bb0',
      },
    },
    summaryBox: {
      backgroundColor: '#ffffff',
      border: '2px solid #535c7e',
    },
    summaryHeader: {
      color: '#017bb0',
    },
    summaryTotal: {
      color: '#017bb0',
    },
    pre: {
      border: '1px solid #535c7e',
      color: '#017bb0',
      backgroundColor: '#ffffff'
    },
    buttonFilterOptions: {
      backgroundColor: '#ffffff',
      backgroundColorHover: '#E6E6E6',
      border: '1px solid #535c7e',
    },
    tab: {
      border: '1px solid rgba(83,92,126,.3)',
    },
    tabSelected: {
      border: '1px solid #535c7e',
    },
    checkbox: {
      disabled: '#535c7e',
    },
    datePicker: {
      weekDayLabel: {
        color: '#535c7e',
      },
      dayOutsideMonth: {
        color: '#b0b2b6'
      },
    },
    appBar: {
      backgroundColor: '#eef2f4',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#535c7e',
          backgroundColor: '#eef2f4',
          fontFamily,
          fontSize: 14,
          fontWeight: 800,
          padding: 0,
          margin: 0,
        },
        a: {
          color: '#535c7e',
        },
        input: {
          color:  '#017bb0',
          backgroundColor: '#eef2f4',
          border: '1px solid #181A1F',
        },
        label: {
          color: '#535c7e',
        }
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          color:  '#017bb0',
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: '1px solid #535c7e',
          backgroundColor: '#ffffff',
          boxShadow: 'none',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.15rem',
          fontWeight: 'bold',
        }
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#017bb0',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#017bb0',
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
          border: '1px solid #535c7e',
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
          color: '#017bb0',
        }
      }
    }
  },
});
