import * as React from "react";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { getLoggedInUser } from "./utils/getLoggedInUser";
import { useNavigate } from "react-router-dom";


const LeftSide = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));
const Center = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  flexGrow: 1,
  justifyContent: "center",
}));
const RightSide = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear the token from cookies or local storage
    Cookies.remove("token");
    navigate("/signin");
   
  };
  
  return (
    <AppBar position="sticky" sx={{}}>
      <Toolbar>
        <LeftSide>
          <IconButton edge="start" color="smoke" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            <img
              src="logo.png"
              alt="Logo"
              style={{ width: "75px", height: "50px", marginTop: "15px" }}
            />
          </Typography>
        </LeftSide>
        <Center>
          <Typography variant="h6" component="div">
            Welcome To My Basecamp
          </Typography>
        </Center>
        <RightSide>
          <Button
            color="inherit"
            onClick={handleMenuClick}
            endIcon={<ExpandMoreIcon />}
          >
            Logout
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <Link to="/profile" onClick={handleMenuClose}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </RightSide>
      </Toolbar>
    </AppBar>
  );
}
