import React, { createContext, useContext, useReducer } from "react";
import * as types from "./types";
import usersReducer from "./usersReducer";
import { getUsers as getUsersService } from "../../services/users";

const INITIAL_STATE = {
  loading: false,
  creating: false,
  deleting: false,
  users: [],
  loading_error: "",
  creating_msg: "",
  deleting_msg: "",
};

export const usersContext = createContext(INITIAL_STATE);
export const usersDispatchContext = createContext(null);

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, INITIAL_STATE);

  async function getUsers() {
    dispatch({
      type: types.GET_USERS_REQUEST,
    });
    const data = await getUsersService();
    if (data.status === 200) {
      dispatch({
        type: types.GET_USERS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: types.GET_USERS_FAILURE,
        payload: "Failed to get users",
      });
    }
  }

  async function createUser(form) {}

  async function deleteUser(id) {}

  return (
    <usersContext.Provider
      value={{
        getUsers,
        createUser,
        deleteUser,
        users: state.users,
        loading: state.loading,
        creating: state.creating,
        deleting: state.deleting,
      }}
    >
      <usersDispatchContext.Provider value={dispatch}>
        {children}
      </usersDispatchContext.Provider>
    </usersContext.Provider>
  );
};

export function useUsersContext() {
  return useContext(usersContext);
}
