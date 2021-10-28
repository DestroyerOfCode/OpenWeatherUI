    import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchUser } from '../../actions';
import i18n from '../../i18n';

const Profile = () => {
    let { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [sendMessage, setSendMessage] = useState(currentUser !== null ? currentUser.sendMessage
    : false);

    const [phoneNumber, setPhoneNumber] = useState(currentUser !== null ? currentUser.phoneNumber 
        : "");

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const handleSendMessageCheckbox = () => {
        dispatch(
            patchUser(currentUser.userName, {
                sendMessage: !sendMessage
        }))
        .then(res => {
            setSendMessage(!sendMessage);
        });
    };

    const handlePhone = (e) => {
        dispatch(
            patchUser(currentUser.userName, {
                "phoneNumber": e.target.value
        }))
        .then((res) => {
            setPhoneNumber(e.target.value);
        });
    };

    return (
        <main className="">
            <div className=" h-8 bg-gray-500 justify-center text-center">
                <header>
                    <h3>
                        <strong>{currentUser.userName}</strong> {i18n.t('profile.profile')}
                    </h3>
                </header>
            </div>
            <div className="ml-3 mb-4">
                <label className="mp-4">{i18n.t('profile.sendMessage')}</label>
                <input
                    type="checkbox"
                    checked={sendMessage}
                    onChange={handleSendMessageCheckbox}
                    className="ml-4"
                />
            </div>
            <div className="ml-3 mt-4">
                <label className="mp-4">{i18n.t('profile.telephone')}</label>
                <input
                    type="textField"
                    onChange={handlePhone}
                    defaultValue={phoneNumber}
                    className="ml-4 border-black font-extralight box-border border-4 border-solid"
                />
            </div>
        </main>
    );
};

export default Profile;
