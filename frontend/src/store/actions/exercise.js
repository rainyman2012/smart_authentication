import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOSTNAME } from "../../static";

export const exerciseStart = () => {
  return {
    type: actionTypes.EXERCISE_START
  };
};

export const exerciseSuccess = uuid => {
  return {
    type: actionTypes.EXERCISE_SUCCESS,
    uuid: uuid
  };
};

export const exerciseFetched = data => {
  return {
    type: actionTypes.EXERCISE_SUCCESS_FETCH,
    name: data.name,
    uuid: data.uuid
  };
};

export const exerciseFail = error => {
  return {
    type: actionTypes.EXERCISE_FAIL,
    error: error
  };
};

export const dataClear = () => {
  return {
    type: actionTypes.EXERCISE_CLEARED
  };
};

export const setGAClientId = clientId => {
  return {
    type: actionTypes.EXERCISE_SET_CLIENTID,
    clientId: clientId
  };
};

export const exerciseCreate = (name, password) => {
  return dispatch => {
    dispatch(exerciseStart());
    axios
      .post(`${HOSTNAME}/api/`, {
        name: name,
        password: password
      })
      .then(res => {
        const data = res.data;
        dispatch(exerciseSuccess(data["uuid"]));
      })
      .catch(err => {
        dispatch(exerciseFail(err));
      });
  };
};

export const fetchData = uuid => {
  return dispatch => {
    dispatch(exerciseStart());
    axios
      .get(`${HOSTNAME}/api/${uuid}/`)
      .then(res => {
        const data = res.data;
        dispatch(exerciseFetched(data));
      })
      .catch(err => {
        dispatch(exerciseFail(err));
      });
  };
};
