import React, { useState } from "react";
import ViewProjectThreads from "./threads/viewThead";
import ViewMessagesByThreads from "./messages/viewMessages";
import { useParams } from "react-router-dom";

const ThreadPage = () => {
  const [selectedThread, setSelectedThread] = useState(null);
  const { ThreadId } = useParams();
  const handleThreadClick = (ThreadId) => {
    setSelectedThread(ThreadId);
  };

  return (
    <div className="thread-page">
      <div className="threads-container">
        <ViewProjectThreads onThreadClick={handleThreadClick(ThreadId)} />
      </div>
      <div className="messages-container">
        <ViewMessagesByThreads selectedThread={selectedThread} />
      </div>
    </div>
  );
};

export default ThreadPage;
