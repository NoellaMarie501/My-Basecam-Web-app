import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsersContext } from "../../context/users/usersContext";
import { AssociateUser } from "../../services/project";
import { handleChange } from "../../utils/handleChange";

const AssociateUserToProject = () => {
  const [form, setForm] = useState({
    selectedUserId: "",
  });

  const navigate = useNavigate();
  const { users, getUsers } = useUsersContext();
  const { ProjectId } = useParams();
  const [created, setIsCreated] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await AssociateUser(form.selectedUserId, ProjectId);
    console.log(response);
    navigate(`/projects/view/${ProjectId}`)
  };

  const handleUserChange = (event) => {
    handleChange(event, setForm, form);
  };

  return (
    <>
   
    <form onSubmit={handleSubmit}>
      <label>
        Select a user:
        <select
          name="selectedUserId"
          value={form.selectedUserId}
          onChange={(e) => handleUserChange(e)}
        >
          <option value="">-- Select a user --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Associate User</button>
    </form> 
    <Link className="link-button" to={`/projects/view/${ProjectId}`}>
        <FaArrowLeft />
        Go back
      </Link>
    </>
  );
};

export default AssociateUserToProject;
