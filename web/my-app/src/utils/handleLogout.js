import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


export const handleLogout = () => {
  Cookies.remove("token");
};