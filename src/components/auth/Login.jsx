import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth.actions';
import { authConstants } from '../../_constants';
import i18n from '../../i18n';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object({
        userName: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogin = (data) => {
        const { userName, password } = data;

        dispatch(login(userName, password)).then(() => {
            history.push('/profile');
        });
    };

    const { isLoggedIn } = useSelector((state) => state.auth);

    const { message } = useSelector((state) => state.messages);

    useEffect(() => {
        dispatch({
            type: authConstants.CLEAR_MESSAGE,
        });
    }, []);

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    }

    return (
        <form
            className="authForm"
            onSubmit={handleSubmit((data) => handleLogin(data))}
        >
            <div>
                <label className="authLabel">{i18n.t('auth.userName')}</label>
                <input className="authTextField" {...register('userName')} />
                {errors.userName && (
                    <p className="text-red-500">{errors.userName.message}</p>
                )}
            </div>

            <div>
                <label className="authLabel">{i18n.t('auth.password')}</label>
                <input className="authTextField" {...register('password')} />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}
            </div>

            <input className="authButton" type="submit" />

            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </form>
    );
}

export default Login;
