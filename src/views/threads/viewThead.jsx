import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaEllipsisV,
  FaHashtag,
  FaTrash,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useMessagesContext } from "../../context/messages/messagesContext";
import { useThreadsContext } from "../../context/threads/threadsContext";
import { createMessage, deleteMessage } from "../../services/messages";
import { deleteThread } from "../../services/threads";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { handleChange } from "../../utils/handleChange";
import { useProjectsContext } from "../../context/projects/projectsContext";
import { getProject } from "../../services/project";

const ViewProjectThreads = () => {
  const { ProjectId } = useParams();
  const { getThreadsByProject, currentThreads: threads } = useThreadsContext();
  const { getMessagesByThread, currentMessages: messages } =
    useMessagesContext();
  const [associatedUser, setassociatedUser] = useState(null);
  const [project, setProject] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const loggedInUser = getLoggedInUser();
  const [form, setForm] = useState({
    content: "",
  });

  //handle dropdown
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  //getting threads for a project
  useEffect(() => {
    getProject(ProjectId).then((Project) => {
      //console.log("Project", Project.data);
      setProject(Project.data);
      //looping through to see if the logged in user is one of the associated users to this project
      const userExists = Project.data.Users.some((user) => loggedInUser.id === user.id);
      //console.log(userExists);
      if (userExists) {
        console.log(
          "User found",
        );
        setassociatedUser(userExists)
      }
    });
    console.log("Projectid", ProjectId);

    getThreadsByProject(ProjectId);

    // console.log("Threads", threads);
  }, [ProjectId]);
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //getting Messages for the first thread initially
  useEffect(() => {
    // Fetch messages for the first thread initially
    if (threads?.length > 0) {
      getMessagesByThread(threads[0].id);
    }
  }, []);

  //getting messages for other threads when clicked
  const handleThreadClick = (threadId) => {
    getMessagesByThread(threadId);
    setSelectedThread(threadId);
  };

  //method to handle form submit
  const handleSubmit = async (e, ThreadId) => {
    e.preventDefault();
    //console.log("ThreadId: " + ThreadId);
    form.UserId = loggedInUser.id;
    form.ThreadId = ThreadId;
    createMessage({ ...form }).then((response) => {
      if (response) {
        getMessagesByThread(ThreadId);
      }
    });
  };

  //delete function
  const handleDelete = async (id, which) => {
    // if (userId === projectUserId) {
    try {
      if (which === "thread") {
        await deleteThread(id).then((response) => { });
        getThreadsByProject(ProjectId);
        //setIsDeleted(response);
      } else if (which === "message") {
        await deleteMessage(id).then((response) => { });
        getMessagesByThread(selectedThread);
        // setIsDeleted(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container1">
        <div className="top-section">
          {loggedInUser.id === project.projectAdmin && (
            <Link to={`/threads/new_thread/${ProjectId}`}>
              <button className="newthread">Create Thread</button>
            </Link>
          )}
          <h1 className="projectname">{project.name}</h1>
          <Link className="link-button" to="/index">
            <FaArrowLeft />
            Go back
          </Link>
        </div>
        <div className="bottom-section">
          <div className="threads">
            <ul className="thread-list">
              {threads?.map((thread) => (
                <li
                  className={thread.id === selectedThread ? "selected" : ""}
                  key={thread.id}
                  onClick={() => handleThreadClick(thread.id)}
                >
                  <div className="thread-icon">
                    <FaHashtag />
                  </div>
                  {thread.title}
                  <div className="thread-options">
                    <div className="dropdown-wrapper">
                      <button
                        className="message-options-button"
                        onClick={toggleDropdown}
                      >
                        <FaEllipsisV />
                      </button>
                      {showDropdown && (loggedInUser.id === project.projectAdmin) && (
                        <div className="dropdown-content">
                          <Link
                            to={`/threads/edit_thread/${thread.id}/${ProjectId}`}
                          >
                            <button className="drop_edit_button">
                              <FaEdit />
                            </button>
                          </Link>
                          <button
                            className="drop_delete_button"
                            onClick={() => handleDelete(thread.id, "thread")}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="messages">
            <h2>Messages for Project</h2>
            <ul className="message-list">
              {messages?.map((message) => (
                <li className="message-item" key={message.id}>
                  <div className="message-header">
                    <span className="message-sender">{message.user.data.email}</span>
                    <span className="message-timestamp">
                      {message.updatedAt ?? message.createdAt}
                    </span>
                    {message.UserId === loggedInUser.id && (
                      <div>
                        <div className="">
                          <Link
                            to={`/messages/edit_message/${message.id}/${selectedThread}/${ProjectId}`}
                          >
                            <button className="drop_edit_button">
                              <FaEdit />
                            </button>
                          </Link>
                          <button
                            className="drop_delete_button"
                            onClick={() => handleDelete(message.id, "message")}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="message-content">{message.content}</p>
                </li>
              ))}
            </ul>
            {(selectedThread && associatedUser) && (
              <form onSubmit={(e) => handleSubmit(e, selectedThread)} className="send">
                <input
                  type="text"
                  name="content"
                  onChange={(e) => handleChange(e, setForm, form)}
                  placeholder="Type your message here"
                />
                <button type="submit">Send</button>
              </form>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default ViewProjectThreads;
