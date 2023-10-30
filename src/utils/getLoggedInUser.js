import { getCookie } from "./getCookie";
import jwtdecode from "jwt-decode";

//getting the logged in user details from the token
export const getLoggedInUser = () => {
    //retrive the looged in user from token
  const token = getCookie("token");

  if(!token) {
    return window.location.replace("/signin")
  }
  const loggedInUser =  jwtdecode(token)
  return loggedInUser
};