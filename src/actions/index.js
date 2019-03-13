import sessions from "../apis/sessions";
import history from "../history";
import { SIGN_IN, SIGN_OUT, CREATE_SESSION, EDIT_SESSION } from "./types";

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

export const createSession = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await sessions.post("/sessions", { ...formValues, userId });
  dispatch({ type: CREATE_SESSION, payload: response.data });
  history.push("/");
};

export const editSession = (id, formValues) => async (dispatch, getState) => {
  const response = await sessions.patch(`/sessions/${id}`, formValues);
  dispatch({ type: EDIT_SESSION, payload: response.data });
  history.push(`/sessions/${id}`);
};
