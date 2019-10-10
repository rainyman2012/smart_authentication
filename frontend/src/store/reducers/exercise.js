import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  uuid: null,
  name: null,
  error: null,
  loading: false
};

const exerciseStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const exerciseSuccess = (state, action) => {
  return updateObject(state, {
    uuid: action.uuid,
    error: null,
    loading: false
  });
};

const exerciseSuccessFetch = (state, action) => {
  return updateObject(state, {
    name: action.name,
    uuid: action.uuid,
    error: null,
    loading: false
  });
};

const exerciseFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXERCISE_START:
      return exerciseStart(state, action);
    case actionTypes.EXERCISE_SUCCESS:
      return exerciseSuccess(state, action);
    case actionTypes.EXERCISE_SUCCESS_FETCH:
      return exerciseSuccessFetch(state, action);
    case actionTypes.EXERCISE_FAIL:
      return exerciseFail(state, action);
    default:
      return state;
  }
};

export default reducer;
