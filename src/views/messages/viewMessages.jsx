import { Link, useParams } from "react-router-dom";
import { useMessagesContext } from "../../context/messages/messagesContext";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ViewMessagesByThreads = (selectedThread) => {
  //const { ThreadId } = useParams();
  const { getMessagesByThread, currentMessages: messages } = useMessagesContext();

  useEffect(() => {
    if (selectedThread) {
      getMessagesByThread(selectedThread);
    }
    //console.log("Messages", messages);
  }, []);

  return (
    <div className="message-container">
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
      <Link className="link-button" to="/index">
        <FaArrowLeft />
        Go back
      </Link>
    </div>
  );
};

export default ViewMessagesByThreads;
