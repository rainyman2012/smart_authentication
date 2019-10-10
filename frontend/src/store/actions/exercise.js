import axios from "axios";
import * as actionTypes from "./actionTypes";

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

export const exerciseCreate = (name, password) => {
  return dispatch => {
    dispatch(exerciseStart());
    axios
      .post("http://127.0.0.1:8000/api/", {
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
      .get(`http://127.0.0.1:8000/api/${uuid}/`)
      .then(res => {
        const data = res.data;
        dispatch(exerciseFetched(data));
      })
      .catch(err => {
        dispatch(exerciseFail(err));
      });
  };
};
