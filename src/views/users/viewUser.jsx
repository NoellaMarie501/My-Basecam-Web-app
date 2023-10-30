// import React from 'react';
// import Attachment from './Attachment';
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../services/users";
import { getLoggedInUser } from "../../utils/getLoggedInUser";


const ViewUser = () => {
  //creating a state for the project
  const [form, setForm] = useState({
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    createdAt: "",
    updatedAt: ""
  });
  const navigate = useNavigate();
  const [associatedProjects, setAssociatedProjects] = useState([]);

  //retrive the looged in user from token
  const loggedInUserId = getLoggedInUser().id;

  useEffect(() => {
    const user = getUser(loggedInUserId).then((user) => {
      console.log("user", user);
      //console.log("project: ", project);
      setForm(user.data);
      setAssociatedProjects(user.data.Projects);
      //console.log("associated: ", project.data.Users);
      // console.log(" Userid: ", form.name);
    });

  }, [loggedInUserId]);


  return (
    <section className="user-details">
      <div className="profile">
        <h1>{form.username}'s Profile</h1>
        <Link className="link-button" to="/index">
          <FaArrowLeft />
          Go back
        </Link>
      </div>
      <div className="user">
        <div class="user-info">
          <p><h1>First Name: </h1>{form.firstname}</p>
          <p><h1>Last Name: </h1>{form.lastname}</p>
          <p><h1>Email: </h1>{form.email}</p>
          <p> <h1>ID: </h1>{form.id}</p>
        </div>

        <div class="project-info">
          {associatedProjects.length ? (
            <ul>
              <h2>Associated Projects:</h2>
              {associatedProjects.map((project) => (
                <li key={project.id}>
                  <tr>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                  </tr>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <h1> No Project associated To You </h1>
            </>
          )}
        </div>
      </div>

    </section>

  );
};

export default ViewUser;
