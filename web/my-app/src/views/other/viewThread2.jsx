import React, { useEffect } from "react";
import { FaArrowLeft, FaHashtag } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useThreadsContext } from "../../context/threads/threadsContext";

const ViewProjectThreads = () => {
  const {ProjectId} = useParams()
  const {getThreadsByProject, currentThreads : threads } = useThreadsContext()

  useEffect(() => {
    getThreadsByProject(ProjectId)
    //console.log("Threads", threads);
  }, []);

  return (
    <div>
      <h2>Threads For Projet {}</h2>
      <ul className="thread-list">
        {threads?.map((thread) => (
           <Link to={`/messages/${thread.id}`}>
           <button className="thread-details" key={thread.id}>
              <div className="thread-icon">
                <FaHashtag />
              </div>
              {thread.title}
            </button>
         </Link>
        ))}
      </ul>
      <Link className="link-button" to="/index">
        <FaArrowLeft />
        Go back
      </Link>
    </div>
  );
};

export default ViewProjectThreads;
