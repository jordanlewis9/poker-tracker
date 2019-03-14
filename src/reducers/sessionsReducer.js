import _ from "lodash";
import {
  CREATE_SESSION,
  EDIT_SESSION,
  GET_SESSION,
  GET_SESSIONS,
  DELETE_SESSION
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
    case DELETE_SESSION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
