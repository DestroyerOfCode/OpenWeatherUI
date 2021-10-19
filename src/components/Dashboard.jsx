import React from 'react';
import i18n from 'i18next';
import Button from '@material-ui/core/Button';

function Dashboard(props) {
    const {isOpened, classes, logout, handlePath, currentUser} = props;

    return (
        <div className="d-flex flex-column">
            { isOpened && 
                <Button 
                    className={classes.authButton}
                    variant="outlined"
                    size="1g"
                    onClick={() => handlePath("/")}>
                    {i18n.t('auth.home')}
                </Button> 
            }    
            { isOpened && currentUser == null && 
                <Button 
                    className={classes.authButton}
                    variant="outlined"
                    size="1g"
                    onClick={() => handlePath("/register")}>
                    {i18n.t('auth.signUp')}
                </Button>     
            }
            { isOpened && 
                <Button
                    className={classes.authButton}
                    variant="outlined"
                    size="1g"
                    onClick={() => handlePath("/profile")}>
                    {currentUser ? i18n.t('auth.profile') + ` ${currentUser.userName}` 
                    : i18n.t('auth.signIn')}
                </Button>  
            }   
            { isOpened && currentUser && <Button 
                    className={classes.authButton}
                    variant="outlined"
                    size="1g"
                    onClick={logout}>
                    {i18n.t('auth.logOut')}
                </Button>
            }
            </div>
    );
}

export default Dashboard;