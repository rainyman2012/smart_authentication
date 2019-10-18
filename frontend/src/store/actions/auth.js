import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOSTNAME } from "../../static";
import Cookies from "universal-cookie";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${HOSTNAME}/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${HOSTNAME}/rest-auth/registration/`, {
        username: username,
        password1: password,
        password2: password
      })
      .then(res => {
        const cookies = new Cookies();
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 8 * 1000); // The token will be Expired after 8 hours
        cookies.set("token", token, {
          path: "/",
          expires: expirationDate
        });
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authProfile = (gender, lang, age, image, key) => {
  return dispatch => {
    axios
      .post(
        `${HOSTNAME}/api/profile/`,
        {
          age: age,
          gender: gender,
          lang: lang,
          image: image
        },
        {
          headers: {
            Authorization: "Token " + key
          }
        }
      )
      .then(res => {
        const data = res.data;
        console.log(data);
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
