import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { authConstants } from "../../_constants";
import i18n from 'i18next';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../actions";

const schema = yup.object({
  userName: yup.string().min(5).max(30).required(),
  password: yup.string().required().max(20).min(4),
  email: yup.string().email().required()
}).required();


function Register() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [successful, setSuccessful] = useState(false);
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type : authConstants.CLEAR_MESSAGE
    })
  }, []);

  const handleRegister = (data) => {
    const {userName, email, password} = data;
    setSuccessful(false);
    dispatch(
      registerUser(userName, email, password)
    )
    .then(() =>
      setSuccessful(true)
    )
    .catch(() => 
      setSuccessful(false)
    );
  }
    return (
            <form className="authForm" onSubmit={handleSubmit((data) => handleRegister(data))}>
            {!successful && (
              <div>
                  <label className="authLabel" > {i18n.t('auth.userName')}</label>
                  <input className="authTextField"  {...register("userName")}/>
                  {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}

                  <label className="authLabel" > Email</label>
                  <input className="authTextField"  {...register("email")}/>
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                  <label className="authLabel" >{i18n.t('auth.password')}</label>
                  <input className="authTextField"  {...register("password")}/>
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <input className="authButton" type="submit" />
              </div>
            )}

          </form>
    );

}


export default Register;