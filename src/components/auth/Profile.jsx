import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchUser } from '../../actions';
import UserService from '../../adapters/UserService';
import i18n from '../../i18n';

const Profile = () => {
    let { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [sendMessage, setSendMessage] = useState(false);
    const [cityName, setCityName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (currentUser) {
            UserService.getUser(currentUser.userName).then((response) => {
                setPhoneNumber(response.data.phoneNumber);
                setSendMessage(response.data.sendMessage);
                setCityName(response.data.cityName);
            });
        }
    });

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const handleSendMessageCheckbox = () => {
        dispatch(
            patchUser(currentUser.userName, {
                sendMessage: !sendMessage,
            })
        ).then((res) => {
            setSendMessage(!sendMessage);
        });
    };

    const handlePhone = (e) => {
        dispatch(
            patchUser(currentUser.userName, {
                phoneNumber: e.target.value,
            })
        ).then((res) => {
            setPhoneNumber(e.target.value);
        });
    };

    const handleCityName = (e) => {
        dispatch(
            patchUser(currentUser.userName, {
                cityName: e.target.value,
            })
        ).then((res_) => {
            setCityName(e.target.value);
        });
    };

    return (
        <main className="">
            <div className=" h-8 bg-gray-500 justify-center text-center">
                <header>
                    <h3>
                        <strong>{currentUser.userName}</strong>{' '}
                        {i18n.t('profile.profile')}
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
            <div className="ml-3 mt-4">
                <label className="mp-4">{i18n.t('profile.city')}</label>
                <input
                    type="textField"
                    onChange={handleCityName}
                    defaultValue={cityName}
                    className="ml-4 border-black font-extralight box-border border-4 border-solid"
                />
            </div>
        </main>
    );
};

export default Profile;
