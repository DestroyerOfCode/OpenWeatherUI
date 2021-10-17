import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { patchUser } from '../../adapters/UserService';
import i18n from '../../i18n';

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [sendMessage, setSendMessage] = useState(currentUser !== null ? currentUser.sendMessage 
    : false)

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const handleSendMessageCheckbox = () => {
        patchUser(currentUser.userName, {
            sendMessage: !sendMessage
        })
        .then(res => setSendMessage(!sendMessage));
    };


    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.userName}</strong> {i18n.t('profile.profile')}
                </h3>
            </header>
            <label>
                
                <p>{i18n.t('profile.sendMessage')}</p>
                <input
                    type="checkbox"
                    checked={sendMessage}
                    onChange={handleSendMessageCheckbox}
                />
            </label>
        </div>
    );
};

export default Profile;
