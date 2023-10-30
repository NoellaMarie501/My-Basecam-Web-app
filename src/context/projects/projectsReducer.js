import * as types from "./types";

function ProjectsReducer(state, action) {
  switch (action.type) {
    case types.GET_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case types.GET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        loading_error: action.payload,
      };

    case types.GET_PROJECTS_WITH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PROJECTS_WITH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case types.GET_PROJECTS_WITH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        loading_error: action.payload,
      };
      case types.SET_CURRENT_PROJECT: 
     // console.log("action: ", action)
      return {
        ...state,
        currentProject: action.payload,
      }
    default:
      return state;
  }
}

export default ProjectsReducer;
