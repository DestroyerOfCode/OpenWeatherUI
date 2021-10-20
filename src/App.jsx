import React from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp';
// import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

function App() {
    const theme = createMuiTheme();

    return (
        <ThemeProvider theme = {theme}>
            <WeatherApp />
        </ThemeProvider>);
}

export default App;
