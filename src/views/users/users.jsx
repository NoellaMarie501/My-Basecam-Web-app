import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/users";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { findPermission } from "../../utils/findPermission";
import { useUsersContext } from "../../context/users/usersContext";

const UserPage = () => {
  const navigate = useNavigate();
  const { getUsers, users } = useUsersContext()
  //const { id } = useParams();

  //Using the useeffect method to get all users

  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {}, [rerender]);
  //function to logout user


  //getting logged in user's role
  const loggedInRole = getLoggedInUser().role;
  const loggedInId = getLoggedInUser().id;
  const deletePermissions = ["admin"];
  const canDeletePermission = findPermission(deletePermissions, loggedInRole);

  //function to delete user
  const handleDelete = (id) => {
    try {
      const response = deleteUser(id).then((response) => {
        if (response.toString().includes("successfully")) {
          getUsers();
        }
      });
      // Redirect to the same page after successful delete
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link className="link-button" to="/index">
        View Projects
      </Link>
      <Link to={`/register`}>
        {" "}
        <button>create new user</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
              <tr>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {" "}
                    <button  disabled={user.id !== loggedInId}>edit User</button>
                  </Link>
                </td>
                <td>
                  {canDeletePermission && (
                    <button  onClick={() => handleDelete(user.id)}>
                      delete User
                    </button>
                  )}
                </td>
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
