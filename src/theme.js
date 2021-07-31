import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#004ba0',
      light: '#63a4ff'
    },
    secondary: {
      main: '#0084b4',
      dark: '#005784',
      light: '#56b4e6'
    }
  },
  overrides: {
    // Style sheet name ⚛️
    MuiSwitch: {
      root: {
        fontSize: '36px',
        height: '40px'
      }
    },
    MuiFormControlLabel: {
      label: {
        color: '#616161'
      }
    },
    // MuiAppBar: {
    //   // Name of the rule
    //   colorPrimary: {
    //     // Some CSS
    //     backgroundColor: '#000'
    //   }
    // },
    // MuiLinearProgress: {
    //   colorPrimary: {
    //     backgroundColor: 'rgba(0, 132, 180, 0.2)'
    //   },
    //   barColorPrimary: {
    //     backgroundColor: '#0084b4'
    //   }
    // },

    MuiButton: {
      root: {
        minWidth: '32px'
      }
      //   containedPrimary: {
      //     backgroundColor: '#1976d2',
      //     '&:hover': {
      //       backgroundColor: '#11508e'
      //     }
      //   },
      //   containedSecondary: {
      //     backgroundColor: '#0084b4',
      //     '&:hover': {
      //       backgroundColor: '#004c68'
      //     },
      //     '&:focus': {
      //       color: '#fff'
      //     },
      //     '&:active': {
      //       color: '#fff'
      //     }
      //   }
      //   outlinedSecondary: {
      //     borderColor: '#0084b4',
      //     boxShadow:
      //       '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      //     color: '#00719b',
      //     '&:hover': {
      //       borderColor: '#0084b4',
      //       color: '#00212d',
      //       backgroundColor: 'rgba(0, 132, 180, 0.3)'
      //     },
      //     '&:focus': {
      //       borderColor: '#0084b4'
      //     },
      //     '&:active': {
      //       borderColor: '#0084b4',
      //       color: '#fff'
      //     },
      //     '&.Mui-disabled': {
      //       borderColor: '#d1d1d1',
      //       color: '#d1d1d1',
      //       backgroundColor: '#f4f4f4'
      //     }
      //   }
      // },
      // MuiIconButton: {
      //   colorPrimary: {
      //     color: '#0084b4'
      //   }
      // },
      // MuiCircularProgress: {
      //   colorPrimary: {
      //     color: '#0084b4'
      //   }
      // },
      // MuiSvgIcon: {
      //   colorPrimary: {
      //     color: '#0084b4'
      //   }
    },
    MuiTypography: {
      h4: {
        color: '#616161',
        fontFamily: 'Montserrat, sans-serif'
      },
      h5: {
        color: '#616161',
        fontFamily: 'Montserrat, sans-serif'
      },
      h6: {
        color: '#616161',
        fontFamily: 'Montserrat, sans-serif'
      },
      subtitle1: {
        color: '#616161'
      }
    }
  }
})

export const muiTheme = responsiveFontSizes(theme, { factor: 3 }) // default is 2
