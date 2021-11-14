import React from 'react';
import i18n from 'i18next';

function Dashboard(props) {
    const { isOpened, logout, handlePath, currentUser } = props;
    return (
        <>
            {isOpened && (
                <button className="authButton" onClick={() => handlePath('/')}>
                    {i18n.t('auth.home')}
                </button>
            )}
            {isOpened && currentUser == null && (
                <button
                    className="authButton"
                    onClick={() => handlePath('/register')}
                >
                    {i18n.t('auth.signUp')}
                </button>
            )}
            {isOpened && (
                <button
                    className="authButton"
                    onClick={() => handlePath('/profile')}
                >
                    {currentUser
                        ? i18n.t('auth.profile') + ` ${currentUser.userName}`
                        : i18n.t('auth.signIn')}
                </button>
            )}
            {isOpened && currentUser && (
                <button className="authButton" onClick={logout}>
                    {i18n.t('auth.logOut')}
                </button>
            )}
        </>
    );
}

export default Dashboard;
