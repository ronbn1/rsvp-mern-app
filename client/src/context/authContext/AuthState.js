import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setToken from "../../utils/setToken";
import {
  SUCCESS_REGISTER,
  FAIL_REGISTER,
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  SET_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  AUTH_ERROR,
  SET_USER
} from "../type";

const AuthState = props => {
  const initalState = {
    user: null,
    userAuth: null,
    errors: null
  };

  const [state, dispatch] = useReducer(authReducer, initalState);

  //Get user
  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/user");
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      });
    }
  };

  //Register user
  const registerUser = async userData => {
    const config = {
      header: {
        "Content-Type": "appliction/json"
      }
    };
    try {
      const res = await axios.post("/api/user/register", userData, config);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FAIL_REGISTER,
        payload: err.response.data
      });
    }
  };

  //Login user
  const loginUser = async userData => {
    const config = {
      header: {
        "Content-Type": "appliction/json"
      }
    };
    try {
      const res = await axios.post("./api/user/login", userData, config);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FAIL_LOGIN,
        payload: err.response.data
      });
    }
  };

  //Logout
  const logOut = () => {
    dispatch({
      type: LOG_OUT
    });
  };

  //Show errors
  const setError = err => {
    dispatch({
      type: SET_ERROR,
      payload: err
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        registerUser,
        loginUser,
        logOut,
        setError,
        clearError,
        getUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
