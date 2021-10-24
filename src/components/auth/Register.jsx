import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authConstants } from "../../_constants";
import i18n from 'i18next';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../actions";

const schema = yup.object({
  userName: yup.string().min(5).max(30).required(),
  password: yup.string().required().max(20).min(4),
  email: yup.string().email().required()
}).required();

const useStyles = makeStyles((theme) => ({
  form : {
    "width": "100%",
    "display": "flex",
    "margin-left": "auto",
    "margin-right": "auto",
    "justify-content": "center",

  },
  input: {
    "display":" block",
    "box-sizing": "border-box",
    "width":" full",
    "border":"4px",
    "border":" 1px solid black",
    "padding":" 10px 15px",
    "margin-bottom": "10px",
    "font-size": "14px",
  },
  label: {
    "line-height":" 2",
    "text-align":" left",
    "display": "block",
    "margin-bottom":" 13px",
    "margin-top":" 20px",
    "font-size":" 14px",
    "font-weight":" 200",
  },
  button: {
    "display":" block",
    "appearance":" none",
    "margin-top": "40px",
    "border":" 1px solid #333",
    "margin-bottom": "20px",
    "text-transform": "uppercase",
    "padding":" 10px 20px",
    "border-radius": "4px",
    "background": "blue",
    "color": "white",
  },
  error: {
    color: "red",
  },
  header: {
    "text-align": "center"
  }
}));

function Register() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [successful, setSuccessful] = useState(false);
    
  const dispatch = useDispatch();

  const {message} = useSelector(state => state.messages);

  useEffect(() => {
    dispatch({
      type : authConstants.CLEAR_MESSAGE
    })
  }, []);

  const classes = useStyles();

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
      <div className="col-md-12">
          <h1 className={classes.header}>Register</h1>
          <form className={classes.form} onSubmit={handleSubmit((data) => handleRegister(data))}
          >
            {!successful && (
              <div>
                <div>
                  <label className={classes.label} > {i18n.t('auth.userName')}</label>
                  <input className={classes.input}  {...register("userName")}/>
                </div>
                {errors.userName && <p className={classes.error}>{errors.userName.message}</p>}

                <div>
                  <label className={classes.label} > Email</label>
                  <input className={classes.input}  {...register("email")}/>
                </div>
                {errors.email && <p className={classes.error}>{errors.email.message}</p>}

                <div>
                  <label className={classes.label} >{i18n.t('auth.password')}</label>
                  <input className={classes.input}  {...register("password")}/>
                </div>
                {errors.password && <p className={classes.error}>{errors.password.message}</p>}

                <input className={classes.button} type="submit" />
              </div>
            )}

            {message && (
                <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
            )}
          </form>
      </div>
    );

}


export default Register;