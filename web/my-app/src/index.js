import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UsersContextProvider } from "./context/users/usersContext";
import { ProjectsContextProvider } from "./context/projects/projectsContext";
import { ThreadsContextProvider } from "./context/threads/threadsContext";
import { MessagesContextProvider } from "./context/messages/messagesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MessagesContextProvider>
      <ThreadsContextProvider>
        <ProjectsContextProvider>
          <UsersContextProvider>
            <App />
          </UsersContextProvider>
        </ProjectsContextProvider>
      </ThreadsContextProvider>
    </MessagesContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
