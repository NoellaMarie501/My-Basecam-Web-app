import Cookies from "js-cookie";
import fetchUtil from "../utils/hooks/fetchUtils";
import { getCookie } from "../utils/getCookie";
import axios from "axios";
//getting all users
export const getUsers = async () => {
  try {
    //getting token of logged in user
    const token = getCookie("token");
    //console.log("token",token);

    //attaching token to request for a protected route
    const response = await fetchUtil.get(`users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("response users.js:", response.data);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching Users:", error);
  }
};

//getting a user with id
export const getUser = async (user_id) => {
  try {
    const response = await fetchUtil.get(`users/${user_id}`);
    //console.log("user",response)
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//deleting a user with id
export const deleteUser = async (user_id) => {
  try {
    const response = await fetchUtil.delete(`users/delete/${user_id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//updating a user with id
export const updateUser = async (
  user_id,
  { username, role, firstname, lastname, email }
) => {
  //console.log("username, fiirstname, lastname, email", username, firstname, lastname, email)
  try {
    //console.log(`updating id ${user_id}`);
    const response = await fetchUtil.put(`users/update/${user_id}`, {
      username,
      role,
      firstname,
      lastname,
      email,
    });
    //return response.json();
  } catch (e) {
    console.log(e);
  }
};

//method to handle login
export const login = async ({ email, password, navigate }) => {
  try {
    //const response = await axios.post(`${API_URL}/users/signin`, {email: email, password: password});
    const response = await axios.post("http://172.232.194.129:3000/users/signin", {
      email: "noelok@gmail.com",
      password: "password",
    });
    //console.log("responce.data :", response.data.data);

    const { token } = response.data.data;

    if (token) {
     // console.log(token);
      // Save the token in a cookie
      Cookies.set("token", token, { expires: 1 }); // Set the expiration time as per your requirement
      navigate("/index");
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data;
  }
};

//ethod to register a user
export const register = async ({
  username,
  password,
  firstname,
  lastname,
  email,
}) => {
  try {
    const response = await fetchUtil.post("users/register", {
      username,
      password,
      firstname,
      lastname,
      email,
    });
    //console.log(response.data);
    return response;
  } catch (error) {
    //console.error(error);
    return error.response.data;
  }
};
