import React, {useState, useRef, useEffect} from "react";
import { Redirect, useHistory } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth.actions";
import { authConstants } from "../../_constants"; 

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {

  const [userName, setUserName] =  useState("");
  const [password, setPassword] =  useState("");
  const [loading, setLoading] =  useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const form = useRef();
  const checkBtn = useRef();

  const onChangeUserName = (e) => {setUserName(e.target.value)};

  const onChangePassword = (e) => {setPassword(e.target.value)}

  const handleLogin = (e) => {
    e.preventDefault();
    
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(userName, password))
        .then(() => {
          history.push("/profile");
          // window.location.reload();
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false)
    }
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
        <div className="card card-container">

          <Form
            onSubmit={handleLogin}
            ref={form}
          >
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <Input
                type="text"
                className="form-control"
                name="userName"
                value={userName}
                onChange={onChangeUserName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    );
  
}

export default Login;