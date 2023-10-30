import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjectsContext } from "../../context/projects/projectsContext";
import { deleteProject } from "../../services/project";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { FaEdit, FaEye, FaPaperclip, FaTrash, FaEnvelope } from "react-icons/fa";
import { findPermission } from "../../utils/findPermission";

const IndexPage = () => {
  const navigate = useNavigate();
  const [deleted, setIsDeleted] = useState(false);
  const viewUsers = ["admin"];
  const loggedInRole = getLoggedInUser().role;
  const canView = findPermission(viewUsers, loggedInRole);
  const { getProjects, projects, setProject } = useProjectsContext();
  useEffect(() => {
    getProjects();

  }, []);

  const loggedInUserId = getLoggedInUser().id;

  const handleDelete = async (id, userId, projectUserId) => {
    if (userId === projectUserId) {
      try {
        const response = await deleteProject(id).then((response) => {
          if (response.toString().includes("successfully")) {
            getProjects();
          }
        });
        setIsDeleted(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsDeleted("Not allowed only owner can delete project");
    }
  };



  return (
    <div className="index">
      <div className="top-section">
        {canView && <Link className="link-button" to="/users" style={{ marginBottom: "1rem" }}>
          View users
        </Link>
        }
        <Link to={`/createProject`} style={{ marginBottom: "1rem", marginRight: "1rem" }}>
          <button>create new project</button>
        </Link>
      </div>



      <div className="card-container" style={{ marginBottom: "1rem" }}>
        {projects?.map((project) => (

          <div className="card" key={project.id}>
            <h3>{project.name}</h3>
            <p className="description" >Description: {project.description}</p>
            <p>Created By: {project.user.data.firstname}</p>
            <p>Created At: {project.createdAt}</p>
            <p>Updated At: {project.updatedAt}</p>
            <div className="card-actions">
              <Link to={`/projects/${project.id}`}>
                <button
                  className="index_button"
                  disabled={loggedInUserId === project.projectAdmin ? false : true}
                >
                  <FaEdit />
                </button>
              </Link>
              <button
                className="delete_button"
                onClick={() => handleDelete(project.id, loggedInUserId, project.user.data.id)}
                disabled={loggedInUserId === project.projectAdmin ? false : true}
              >
                <FaTrash />
              </button>
              <Link to={"/createAttachments"}>
                <button
                  className="index_button"
                  onClick={() => {
                    setProject(project);
                  }}
                  disabled={loggedInUserId === project.projectAdmin ? false : true}
                >
                  + <FaPaperclip />
                </button>
              </Link>
              <Link to={`/projects/view/${project.id}`}>
                <button className="index_button" onClick={() => { setProject(project); }}>
                  <FaEye />
                </button>
              </Link>
              <Link to={`/threads/${project.id}`}>
                <button
                  className="index_button"
                >
                  <FaEnvelope />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
