import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [click, setClick] = useState(false);

  const navigate = useNavigate();
  //handling dropdown menu of avatar
  const handleMenu = (event) => {
    setClick((prev) => !prev);
  };
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || [];
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("loggedInUser")) ? true : false;
  });
  //check user on reload
  useEffect(() => {
    const checkUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setCurrentUser(checkUser ? true : false);
  }, []);

  //handling logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setCurrentUser(false);
    navigate("/home");
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //open profilemenu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //close mobile menu
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  //close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  //open mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>home</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            GoShop
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button
              variant="text"
              color="white"
              onClick={() => navigate("/home")}
            >
              Home
            </Button>
            {!currentUser && (
              <div>
                {" "}
                <Button variant="text" color="white" href="/signup">
                  Sign Up
                </Button>
                <Button variant="text" color="white" href="/login">
                  Sign In
                </Button>
              </div>
            )}

            {currentUser && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  disableautofocusitem="true"
                >
                  <Avatar>{user?.email?.split("")[0]}</Avatar>
                </IconButton>
                {click && (
                  <ul
                    style={{
                      position: "absolute",
                      listStyle: "none",
                      backgroundColor: "white",
                      color: "black",
                      width: "8rem",
                      height: "12rem",
                      zIndex: "2 ",
                    }}
                  >
                    <li style={{ margin: "0.5rem" }}>
                      <Button
                        variant="text"
                        href="/editprofile"
                        color="default"
                      >
                       profile
                      </Button>
                    </li>
                    <Divider />
                    <li style={{ margin: "0.5rem" }}>
                      <Button
                        variant="text"
                        href="/changepassword"
                        color="default"
                      >
                        change password
                      </Button>
                    </li>
                    <Divider />
                    <li style={{ margin: "0.5rem" }}>
                      <Button
                        variant="text"
                        onClick={handleLogout}
                        color="default"
                      >
                        logout
                      </Button>
                    </li>
                    <Divider />
                  </ul>
                )}
              </div>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                if (currentUser) {
                  navigate("/cart");
                } else {
                  navigate("/login");
                }
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
