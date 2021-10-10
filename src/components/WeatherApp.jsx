import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import WeatherCurrentComponent from './current/WeatherCurrent';
import { withTranslation } from 'react-i18next';
import WeatherForecastComponent from './forecast/daily/WeatherForecastDaily';
// import { temperatureDropdownList } from "../buildingBlocks/commonBuildingBlocks";
import { TemperatureDropdownList } from '../buildingBlocks/Temperature';
import TemperatureCtx from '../buildingBlocks/Temperature';
import i18n from 'i18next';
import Button from '@material-ui/core/Button';

import '../i18n';
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './auth/Profile';
import { Link } from 'react-router-dom';
import { logout } from "../actions/auth.actions";
import { useDispatch } from 'react-redux';

function WeatherApp() {
    const [temperature, setTemperature] = useState({
        units: 'celsius',
        abbreviation: '°C',
    });

    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout());
      };

    return (
        <main className="container">
            <Button
                variant="outlined"
                onClick={() => i18n.changeLanguage('en')}
                size="small"
                disabled={i18n.language === 'en'}
                color={i18n.language === 'en' ? 'default' : 'primary'}
                value="en"
            >
                EN
            </Button>
            <Button
                variant="outlined"
                onClick={() => i18n.changeLanguage('sk')}
                size="small"
                disabled={i18n.language === 'sk'}
                color={i18n.language === 'sk' ? 'default' : 'primary'}
                value="sk"
            >
                SK
            </Button>
            <Button
                variant="outlined"
                onClick={() => i18n.changeLanguage('de')}
                size="small"
                disabled={i18n.language === 'de'}
                color={i18n.language === 'de' ? 'default' : 'primary'}
                value="de"
            >
                DE
            </Button>
            <TemperatureDropdownList
                changeTemperatureUnitsState={(units, abbreviation) => {
                    setTemperature({
                        units: units,
                        abbreviation: abbreviation,
                    });
                }}
            />       
                <Link
                    to={{
                            pathname: "/register"
                        }}
                        >
                            Register
                </Link>
                <Link
                     to={{
                             pathname: "/login"
                         }}
                         >
                             Log in
                 </Link>
                 <Link
                    onClick={logOut}
                        >
                            Log out
                </Link>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <TemperatureCtx.Provider value={temperature}>
                            <WeatherCurrentComponent {...props} />
                        </TemperatureCtx.Provider>
                    )}
                />
                <Route
                    path="/forecast"
                    render={(props) => (
                        <TemperatureCtx.Provider value={temperature}>
                            <WeatherForecastComponent {...props} />
                        </TemperatureCtx.Provider>
                    )}
                />
                <Route
                    exact path="/register"
                    component={Register}
                />
                <Route
                    exact path = "/login"
                    component = {Login}
                />
                <Route 
                    exact path = "/profile"
                    component = {Profile}
                />
            </Switch>
        </main>
    );
}

export default withTranslation()(WeatherApp);
