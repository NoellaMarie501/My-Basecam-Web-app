import React, { createContext, useContext, useReducer } from "react";
import * as types from "./types";
import projectsReducer from "./projectsReducer";
import { getProjects as getProjectsService } from "../../services/project";
import { getUser as getUserService } from "../../services/users";


const INITIAL_STATE = {
  loading: false,
  creating: false,
  deleting: false,
  projects: [],
  loading_error: "",
  creating_msg: "",
  deleting_msg: "",
  currentProject: null
};

export const projectsContext = createContext(INITIAL_STATE);
export const projectsDispatchContext = createContext(null);

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, INITIAL_STATE);

  async function getProjects() {
    dispatch({
      type: types.GET_PROJECTS_REQUEST,
    });
    const data = await getProjectsService();
    if (data.status === 200) {
      const projectsWithUser = await Promise.all(
        data.data.map(async (project) => {
          const user = await getUserService(project.projectAdmin);
          
          return { ...project, user };
        })
      );
     //console.log("Projects", projectsWithUser)
      dispatch({
        type: types.GET_PROJECTS_SUCCESS,
        payload: projectsWithUser,
      });
    } else {
      dispatch({
        type: types.GET_PROJECTS_FAILURE,
        payload: "Failed to get users",
      });
    }
  }

  async function getProjectsWithUser() {
    dispatch({
      type: types.GET_PROJECTS_WITH_USER_REQUEST,
    });
    const data = await getUserService();
    //console.log("DATA_USER: ", data);
    if (data.status === 200) {
      dispatch({
        type: types.GET_PROJECTS_WITH_USER_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: types.GET_PROJECTS_WITH_USER_FAILURE,
        payload: "Failed to get users",
      });
    }
   
  }
 function setProject(payload){
      dispatch({type: types.SET_CURRENT_PROJECT,
        payload
      })
    }
  async function createProject(form) {}

  async function deleteProject(id) {}

  return (
    <projectsContext.Provider
      value={{
        getProjects,
        getProjectsWithUser,
        createProject,
        deleteProject,
        setProject,
        currentProject: state.currentProject,
        projects: state.projects,
        loading: state.loading,
        creating: state.creating,
        deleting: state.deleting,
      }}
    >
      <projectsDispatchContext.Provider value={dispatch}>
        {children}
      </projectsDispatchContext.Provider>
    </projectsContext.Provider>
  );
};

export function useProjectsContext() {
  return useContext(projectsContext);
}
