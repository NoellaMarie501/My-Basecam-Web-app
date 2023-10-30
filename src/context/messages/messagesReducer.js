import * as types from "./types";

function MessagesReducer(state, action) {
  switch (action.type) {
    case types.GET_MESSAGES_BY_THREAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_MESSAGES_BY_THREAD_SUCCESS:
      return {
        ...state,
        loading: false,
        currentMessages: action.payload,
      };
    case types.GET_MESSAGES_BY_THREAD_FAILURE:
      return {
        ...state,
        loading: false,
        loading_error: action.payload,
      };

    default:
      return state;
  }
}

export default MessagesReducer;
