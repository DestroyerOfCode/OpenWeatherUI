import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import WeatherCurrentComponent from './current/WeatherCurrent';
import { withTranslation } from 'react-i18next';
import WeatherForecastComponent from './forecast/daily/WeatherForecastDaily';
import { TemperatureDropdownList } from '../buildingBlocks/Temperature';
import TemperatureCtx from '../buildingBlocks/Temperature';
import i18n from 'i18next';
import Button from '@material-ui/core/Button';

import '../i18n';
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './auth/Profile';
import { logout } from "../actions/auth.actions";
import { useDispatch } from 'react-redux';

function WeatherApp() {
    const [temperature, setTemperature] = useState({
        units: 'celsius',
        abbreviation: '°C',
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {
        dispatch(logout());
      };

    const handlePath = (path) => history.push(path);
    
    const user = JSON.parse(localStorage.getItem('user'));

    const temperatureDropdown = () => (
        <TemperatureDropdownList
            changeTemperatureUnitsState={(units, abbreviation) => {
                setTemperature({
                    units: units,
                    abbreviation: abbreviation,
                });
            }}
        />                          
    );

    return (
        <main className="container">
            <div className = "d-flex justify-content-start">
                <div className="d-flex justify-content-start">
                    <Button 
                        variant="outlined"
                        size="1g"
                        onClick={() => handlePath("/")}>
                        {i18n.t('auth.home')}
                    </Button>     
                    <Button 
                        variant="outlined"
                        size="1g"
                        onClick={() => handlePath("/register")}>
                        {i18n.t('auth.signUp')}
                    </Button>     
                    <Button 
                        variant="outlined"
                        size="1g"
                        onClick={() => handlePath("/profile")}>
                        {user ? i18n.t('auth.profile') : i18n.t('auth.signIn')}
                    </Button>     
                    <Button 
                        variant="outlined"
                        size="1g"
                        onClick={logOut}>
                        {i18n.t('auth.logOut')}
                    </Button>
                </div>
                <div className="d-flex ml-auto p-2 col-example">
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
                </div>
            </div>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <>
                            {temperatureDropdown()}
                            <TemperatureCtx.Provider value={temperature}>
                                <WeatherCurrentComponent {...props} />
                            </TemperatureCtx.Provider>
                        </>
                    )}
                />
                <Route
                    path="/forecast"
                    render={(props) => (
                        <>
                            {temperatureDropdown()}
                            <TemperatureCtx.Provider value={temperature}>
                                <WeatherForecastComponent {...props} />
                            </TemperatureCtx.Provider>
                        </>
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
