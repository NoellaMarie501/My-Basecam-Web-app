import React from "react";
import Header from "../header";
import { useLocation } from "react-router-dom";
import { getLoggedInUser } from "../utils/getLoggedInUser";
import { getCookie } from "../utils/getCookie";

const DashboardLayout = ({ children, showNav }) => {
    const { pathname } = useLocation()
    const token = getCookie()
    //const isLoggedIn = getLoggedInUser()
    const showHeader = (pathname !== "/signin") && token

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
};

export default DashboardLayout