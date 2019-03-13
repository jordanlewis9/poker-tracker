import { CREATE_SESSION, EDIT_SESSION } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_SESSION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SESSION:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
