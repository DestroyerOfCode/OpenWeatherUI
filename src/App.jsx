import React from 'react';
import WeatherApp from './components/WeatherApp';

function App() {
    const dotenv = require('dotenv');
    dotenv.config();
<<<<<<< HEAD

    console.log(process.env);
    return <WeatherApp />;
=======
    
    return (
        <WeatherApp />
    )
>>>>>>> removed unnecessary console.log
}

export default App;
