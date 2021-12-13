import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#00203FFF',
    },
    secondary: {
      main: '#ADEFD1FF',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;