import React, { createContext, useContext, useReducer } from "react";
import * as types from "./types";
import threadsReducer from "./threadsReducer";
import { getThreadsByProject as getThreadsByProjectService } from "../../services/threads";

const INITIAL_STATE = {
  loading: false,
  creating: false,
  deleting: false,
  currentThreads: [],
  loading_error: "",
  creating_msg: "",
  deleting_msg: "",
};

export const threadsContext = createContext(INITIAL_STATE);
export const threadsDispatchContext = createContext(null);

export const ThreadsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(threadsReducer, INITIAL_STATE);

  async function getThreadsByProject(ProjectId) {
    dispatch({
      type: types.GET_THREADS_BY_PROJECT_REQUEST,
    });
    const data = await getThreadsByProjectService(ProjectId);
   // console.log("data", data);
    if (data.status === 200) {
      dispatch({
        type: types.GET_THREADS_BY_PROJECT_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: types.GET_THREADS_BY_PROJECT_FAILURE,
        payload: "Failed to get threads",
      });
    }
  }

  return (
    <threadsContext.Provider
      value={{
        getThreadsByProject,
        currentThreads: state.currentThreads,
        loading: state.loading,
        creating: state.creating,
        deleting: state.deleting,
      }}
    >
      <threadsDispatchContext.Provider value={dispatch}>
        {children}
      </threadsDispatchContext.Provider>
    </threadsContext.Provider>
  );
};

export function useThreadsContext() {
  return useContext(threadsContext);
}
