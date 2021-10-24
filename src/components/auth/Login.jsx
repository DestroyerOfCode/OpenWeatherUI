import React, {useState, useRef, useEffect} from "react";
import { Redirect, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth.actions";
import { authConstants } from "../../_constants"; 
import i18n from "../../i18n";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  userName: yup.string().required(),
  password: yup.string().required(),
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

function Login() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] =  useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogin = (data) => {
    const {userName, password} = data
    setLoading(true);

    dispatch(login(userName, password))
      .then(() => {
        history.push("/profile");
      })
      .catch(() => setLoading(false));
  }

    const {isLoggedIn} = useSelector((state) => (state.auth));

    const {message} = useSelector((state) => state.messages);

    useEffect(() => {
      dispatch({
        type : authConstants.CLEAR_MESSAGE
      })
    }, []);
      
    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }
    
    return (
      <div className="col-md-12">
          <h1 className={classes.header}>Login</h1>

          <form className={classes.form} onSubmit={handleSubmit((data) => handleLogin(data))}>
            <div>
              <label className={classes.label}>{i18n.t('auth.userName')}</label>
              <input className={classes.input} {...register("userName")}/>
              {errors.userName && <p className={classes.error}>{errors.userName.message}</p>}
            </div>
            
            <div>
              <label className={classes.label}>{i18n.t('auth.password')}</label>
              <input className={classes.input} {...register("password")}/>
              {errors.password && <p className={classes.error}>{errors.password.message}</p>}
            </div>
            
            <input className={classes.button} type="submit" />

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
          </form>
      </div>
    );
  
}

export default Login;