import React from 'react';
import WeatherApp from './components/WeatherApp';

function App() {
    const dotenv = require('dotenv');
    dotenv.config();
    
    return (
        <WeatherApp />
    )
}

export default App;
