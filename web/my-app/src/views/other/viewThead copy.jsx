import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaHashtag } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useThreadsContext } from "../../context/threads/threadsContext";
import { useMessagesContext } from "../../context/messages/messagesContext";

const ViewProjectThreads = () => {
  const { ProjectId } = useParams();
  const { getThreadsByProject, currentThreads: threads } = useThreadsContext();
  const { getMessagesByThread, currentMessages: messages } = useMessagesContext();
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    getThreadsByProject(ProjectId);
   // console.log("Threads", threads);
  }, []);

  useEffect(() => {
    // Fetch messages for the first thread initially
    if (threads?.length > 0) {
      getMessagesByThread(threads[0].id);
    }
  }, [threads]);

  const handleThreadClick = (threadId) => {
    getMessagesByThread(threadId);
    setSelectedThread(threadId);
  };

  //method to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    //checking if we are creating or editing a project
   
  };
  return (
    <div className="container1">
      <div className="threads">
        <h2>Threads For Project</h2>
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
                <span className="message-sender">{message.user.email}</span>
                <span className="message-timestamp">
                  {message.createdAt ?? message.updatedAt}
                </span>
              </div>
              <p className="message-content">{message.content}</p>
            </li>
          ))}
        </ul>
        <form
         //onSubmit={handleSubmit}
         >
          <input
            type="text"
            //value={newMessage}
            //onChange={handleInputChange}
            placeholder="Type your message here"
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <Link className="link-button" to="/index">
        <FaArrowLeft />
        Go back
      </Link>
    </div>
  );
};

export default ViewProjectThreads;
