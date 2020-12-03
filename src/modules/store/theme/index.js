import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: colors.common.black,
      default: '#1c1c1c',
      paper: '#1c1c1c'
    },
    primary: {
      main: '#1c1c1c'
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[600],
      secondary: colors.blueGrey[300]
    },
    type: 'dark'
  },
  shadows,
  typography,
});

export default theme;
