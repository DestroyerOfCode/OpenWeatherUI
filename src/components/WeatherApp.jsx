import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import i18n from 'i18next';
import Button from '@material-ui/core/Button';
import { logout } from "../actions/auth.actions";
import { useDispatch } from 'react-redux';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Dashboard from './Dashboard';
import {LoginPage, ProfilePage, RegisterPage, WeatherCurrentPage, WeatherForecastPage} from '../pages'

const useStyles = makeStyles((theme) => ({
    header: {
        "background": "#00022e",
        "height": "50px",
        "color": "#fc86aa",
        "display":"flex",
        "align-items": "center",
        "justify-content": "center"
    },
    footer: {
        "background": "#00022e",
        "height": "50px",
        "color": "#fc86aa",
        "display":"flex",
        "align-items": "center",
        "justify-content": "center",
        "position": 'absolute',
        "width" : "100%",
        "left": 0,
        "bottom": 0

    },
    drawer: {
        background: "#d8dcd6",
        width: "240px"
    },
    icon: {
        padding: "10px"
    },
      
    headerTitle: {
        margin: "auto"
    },

    languageButton: {
        "&.MuiButton-outlined": {
            color: "black",
            background: "white"
        }
    },
    authButton: {
      margin: "5px"
    },
    drawer: {
        "background": "#d8dcd6",
        "width": "0px",
        "transition": "width 0.7s"
    },
      
    opened: {
        width: "240px",
        backgroundColor: "#d8dcd6"
    }

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
        <div>
            <div class="flex">
                <div className="flex-auto" onClick={() => setIsOpened(!isOpened)}>
                    {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
                </div>
                
                <div className="flex-auto">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                        onClick={() => i18n.changeLanguage('en')}
                        disabled={i18n.language === 'en'}
                        value="en"
                    >
                        EN
                    </button>
                    <Button
                        className={classes.languageButton}
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
                        className={classes.languageButton}
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
            <div className="d-flex">
                <aside className={isOpened ? classes.opened : classes.drawer}>
                    <Dashboard isOpened={isOpened}
                        currentUser={currentUser}
                        classes={classes}
                        logout={logOut}
                        handlePath={handlePath}/>
                </aside>
                <main className="container">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={WeatherCurrentPage}
                        />
                        <Route
                            path="/forecast"
                            component={WeatherForecastPage}
                        />
                        <Route
                            exact path="/register"
                            component={RegisterPage}
                        />
                        <Route
                            exact path = "/login"
                            component = {LoginPage}
                        />
                        <Route 
                            exact path = "/profile"
                            component = {ProfilePage}
                        />
                    </Switch>
                </main> 
            </div>
            <div className={classes.footer}>
                footer
            </div>
        </div>
    );
}

export default withTranslation()(WeatherApp);
