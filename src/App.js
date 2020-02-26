import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Routes from './Routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d1d9ff',
      main: '#9fa8da',
      dark: '#6f79a8',
      contrastText: '#000',
    },
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  );
}

export default App;
