// import React from 'react';
// import Attachment from './Attachment';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPaperclip, FaTrash, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProject, removeUserFromProject } from "../../services/project";
import { deleteAttachment, getAttachments } from "../../services/attachments";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { API_URL } from "../../constants/config";

const ViewProject = () => {
  //creating a state for the project
  const [form, setForm] = useState({
    projectAdmin: "",
    name: "",
    description: "",
  });
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState([]);
  const [associatedUsers, setAssociatedUsers] = useState([]);

  //getting id from the project using useparams
  const { id } = useParams();

  //retrive the looged in user from token
  const loggedInUserId = getLoggedInUser().id;

  useEffect(() => {
    const project = getProject(id).then((project) => {
      // console.log("project userid: ", project.data.UserId);
      //console.log("project: ", project);
      setForm(project.data);
      setAssociatedUsers(project.data.Users);
      //console.log("associated: ", project.data.Users);
      // console.log(" Userid: ", form.name);
    });
    const attachments = getAttachments(id).then((attachments) => {
      if (attachments) {
        setAttachments(attachments);
      }
    });
  }, [id]);

  const handleDelete = async ({
    filename,
    attachmentId,
    userId,
    projectId,
    type,
  }) => {
    console.log("here");
    if (type === "deleteAttachment") {
      const res = await deleteAttachment(filename, attachmentId);
      //console.log("delete response: " + res)
    } else if (type === "removeUser") {
      const response = await removeUserFromProject(userId, projectId);

      console.log("remove user response: " + response);
    }

    getProject(id).then((project) => {
      setForm(project.data);
      setAssociatedUsers(project.data.Users);
    });
    navigate(`/projects/view/${id}`);
  };

  return (
    <section className="project-details">
      <div className="project">
        <h1>{form.name}</h1>
        <Link className="link-button" to="/index">
          <FaArrowLeft />
          Go back
        </Link>
      </div>
      <div className="attachmentUsers">
        <div className="attachments-container1">
          <h2>Attachments</h2>
          {attachments.length ? (
            <ul>
              {attachments.map((attachment) => (
                <li key={attachment.id}>
                  <tr>
                    <td>
                      <a
                        href={`${API_URL}/attachments/download/${attachment.filename}?id=${attachment.id}`}
                      >
                        {attachment.filename}
                      </a>
                    </td>
                    <td>
                      <button
                        className="delete_button"
                        onClick={() =>
                          handleDelete({
                            filename: attachment.filename,
                            attachmentId: attachment.id,
                            type: "deleteAttachment",
                          })
                        }
                        disabled={
                          loggedInUserId === form.projectAdmin ? false : true
                        }
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <h1> No Attachments For This project </h1>
            </>
          )}
          {loggedInUserId === form.projectAdmin && (
            <Link to={"/createAttachments"}>
              {" "}
              <button>
                {" "}
                + attachment
                <FaPaperclip />
              </button>
            </Link>
          )}
        </div>
        <div className="attachments-container2">
          {associatedUsers.length ? (
            <ul>
              <h2>Associated Users:</h2>
              {associatedUsers.map((user) => (
                <li key={user.id}>
                  <tr>
                    {user.id === loggedInUserId ? (
                      <td>{user.email}(You)</td>
                    ) : (
                      <td>{user.email}</td>
                    )}
                    <td>
                      <button
                        className="delete_button"
                        onClick={() =>
                          handleDelete({
                            userId: user.id,
                            projectId: id,
                            type: "removeUser",
                          })
                        }
                        disabled={
                          loggedInUserId === form.projectAdmin &&
                            user.id !== loggedInUserId
                            ? false
                            : true
                        }
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <h1> No Other user associated To project </h1>
            </>
          )}
          {loggedInUserId === form.projectAdmin && (
            <Link to={`/associateUser/${id}`}>
              {" "}
              <button>
                {" "}
                +Associate User
                <FaUser />
              </button>
            </Link>
          )}
        </div>
        <div className="attachments-container3">
          <h1>Project Description: </h1><p> {form.description}</p>
        </div>
        
      </div>

    </section>
  );
};

export default ViewProject;
