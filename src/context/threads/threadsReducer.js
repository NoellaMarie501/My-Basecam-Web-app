import * as types from "./types";

function ThreadsReducer(state, action) {
  switch (action.type) {
    case types.GET_THREADS_BY_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_THREADS_BY_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentThreads: action.payload,
      };
    case types.GET_THREADS_BY_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        loading_error: action.payload,
      };

    default:
      return state;
  }
}

export default ThreadsReducer;
