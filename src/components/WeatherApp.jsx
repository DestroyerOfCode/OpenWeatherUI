import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import i18n from 'i18next';
import { logout } from '../actions/auth.actions';
import { useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Dashboard from './Dashboard';
import {
    LoginPage,
    ProfilePage,
    RegisterPage,
    WeatherCurrentPage,
    WeatherForecastPage,
} from '../pages';

const useStyles = makeStyles((theme) => ({
    header: {
        background: '#00022e',
        height: '50px',
        color: '#fc86aa',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
    },
    footer: {
        background: '#00022e',
        height: '40px',
        color: '#fc86aa',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        position: 'absolute',
        width: '100%',
        left: 0,
    },
    icon: {
        padding: '10px',
    },

    headerTitle: {
        margin: 'auto',
    },

    languageButton: {
        '&.MuiButton-outlined': {
            color: 'black',
            background: 'white',
        },
    },
    authButton: {
        margin: '5px',
    },
    drawer: {
        background: '#d8dcd6',
        width: '0px',
        transition: 'width 0.7s',
    },

    opened: {
        width: '240px',
        backgroundColor: '#d8dcd6',
    },
}));

function WeatherApp() {
    const [isOpened, setIsOpened] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {
        dispatch(logout());
    };

    const handlePath = (path) => history.push(path);

    const { user: currentUser } = useSelector((state) => state.auth);

    const classes = useStyles();

    return (
        <div className="bg-gray-600 h-8">
            <div className="flow-root">
                <div className="float-left">
                    {isOpened ? (
                        <ChevronLeftIcon
                            onClick={() => setIsOpened(!isOpened)}
                            htmlColor="white"
                            className="hover:bg-blue-700 m-1"
                        />
                    ) : (
                        <MenuIcon
                            onClick={() => setIsOpened(!isOpened)}
                            className="hover:bg-blue-700 m-1"
                            htmlColor="white"
                        />
                    )}
                </div>
                <div className="float-right">
                    <button
                        className={`h-8 text-white mr-1 ml-1
                    font-bold py-2 px-4 rounded-full ${
                        i18n.language === 'en'
                            ? 'text-indigo-300'
                            : 'hover:bg-blue-700 bg-black'
                    }`}
                        onClick={() => i18n.changeLanguage('en')}
                    >
                        EN
                    </button>
                    <button
                        className={`h-8 text-white mr-1 ml-1
                    font-bold py-2 px-4 rounded-full ${
                        i18n.language === 'sk'
                            ? 'text-indigo-300'
                            : 'hover:bg-blue-700 bg-black'
                    }`}
                        onClick={() => i18n.changeLanguage('sk')}
                    >
                        SK
                    </button>
                    <button
                        className={`h-8 text-white 
                    font-bold py-2 px-4 rounded-full ${
                        i18n.language === 'de'
                            ? 'text-indigo-300'
                            : 'hover:bg-blue-700 bg-black'
                    }`}
                        onClick={() => i18n.changeLanguage('de')}
                    >
                        DE
                    </button>
                </div>
            </div>
            <div className="flex">
                <aside className="dashboard">
                    <Dashboard
                        isOpened={isOpened}
                        currentUser={currentUser}
                        logout={logOut}
                        handlePath={handlePath}
                    />
                </aside>
                <main className="w-[100%] relative">
                    <Switch>
                        <Route exact path="/" component={WeatherCurrentPage} />
                        <Route
                            path="/forecast"
                            component={WeatherForecastPage}
                        />
                        <Route
                            exact
                            path="/register"
                            component={RegisterPage}
                        />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/profile" component={ProfilePage} />
                    </Switch>
                </main>
            </div>
            <div className={classes.footer}>footer</div>
        </div>
    );
}

export default withTranslation()(WeatherApp);
