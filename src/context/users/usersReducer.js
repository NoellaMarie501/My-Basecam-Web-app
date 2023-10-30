import * as types from "./types";

function UsersReducer(state, action) {
  switch (action.type) {
    case types.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case types.GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        loading_error: action.payload,
      };

    default:
      return state;
  }
}

export default UsersReducer;
