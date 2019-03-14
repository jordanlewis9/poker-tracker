import _ from "lodash";
import {
  CREATE_SESSION,
  EDIT_SESSION,
  GET_SESSION,
  GET_SESSIONS
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_SESSION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SESSION:
      return { ...state, [action.payload.id]: action.payload };
    case GET_SESSION:
      return { ...state, [action.payload.id]: action.payload };
    case GET_SESSIONS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
