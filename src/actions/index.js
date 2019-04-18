import sessions from "../apis/sessions";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_SESSION,
  EDIT_SESSION,
  GET_SESSION,
  GET_SESSIONS,
  DELETE_SESSION,
  PAGE_UP,
  PAGE_DOWN
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const pageUp = () => {
  return {
    type: PAGE_UP
  };
};

export const pageDown = () => {
  return {
    type: PAGE_DOWN
  };
};

export const createSession = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await sessions.post("/sessions", { ...formValues, userId });
  dispatch({ type: CREATE_SESSION, payload: response.data });
  history.push("/sessions");
};

export const editSession = (id, formValues) => async (dispatch, getState) => {
  const response = await sessions.patch(`/sessions/${id}`, formValues);
  dispatch({ type: EDIT_SESSION, payload: response.data });
  history.push(`/sessions`);
};

export const getSession = (id) => async (dispatch) => {
  const response = await sessions.get(`/sessions/${id}`);
  dispatch({ type: GET_SESSION, payload: response.data });
};

export const getSessions = (curId) => async (dispatch) => {
  const response = await sessions.get("/sessions");
  dispatch({
    type: GET_SESSIONS,
    payload: response.data.filter((sesh) => sesh.userId === curId)
  });
};

export const deleteSession = (id) => async (dispatch) => {
  await sessions.delete(`/sessions/${id}`);
  dispatch({ type: DELETE_SESSION, payload: id });
  history.push("/sessions");
};
