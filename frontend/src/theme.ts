import { createTheme, PaletteOptions, Palette } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export interface ThemeOptions {
  palette?: PaletteOptions;
}

export interface Theme {
  palette: Palette;
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(86, 25, 129)',
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