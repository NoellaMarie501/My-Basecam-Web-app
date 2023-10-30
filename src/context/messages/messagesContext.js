import React, { createContext, useContext, useReducer } from "react";
import * as types from "./types";
import messagesReducer from "./messagesReducer";
import { getMessagesByThread as getMessagesByThreadService } from "../../services/messages";
import { getUser as getUserService } from "../../services/users";

const INITIAL_STATE = {
  loading: false,
  creating: false,
  deleting: false,
  currentMessages: [],
  loading_error: "",
  creating_msg: "",
  deleting_msg: "",
};

export const messagesContext = createContext(INITIAL_STATE);
export const messagesDispatchContext = createContext(null);

export const MessagesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, INITIAL_STATE);

  async function getMessagesByThread(ThreadId) {
    dispatch({
      type: types.GET_MESSAGES_BY_THREAD_REQUEST,
    });
    const data = await getMessagesByThreadService(ThreadId);
   // console.log("data", data);
    if (data.status === 200) {
      const messageWithUser = await Promise.all(
        data.data.map(async (message) => {
          const user = await getUserService(message.UserId);
          return { ...message, user };
        })
      );
      //console.log("messageWithUser", messageWithUser);
      dispatch({
        type: types.GET_MESSAGES_BY_THREAD_SUCCESS,
        payload: messageWithUser,
      });
    } else {
      dispatch({
        type: types.GET_MESSAGES_BY_THREAD_FAILURE,
        payload: "Failed to get Messages",
      });
    }
  }

  return (
    <messagesContext.Provider
      value={{
        getMessagesByThread,
        currentMessages: state.currentMessages,
        loading: state.loading,
        creating: state.creating,
        deleting: state.deleting,
      }}
    >
      <messagesDispatchContext.Provider value={dispatch}>
        {children}
      </messagesDispatchContext.Provider>
    </messagesContext.Provider>
  );
};

export function useMessagesContext() {
  return useContext(messagesContext);
}
