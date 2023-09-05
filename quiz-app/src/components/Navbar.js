// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="body2" sx={{ flex: 1 }}>
          Quizzing
        </Typography>
        {user && (
          <>
            <Button color="inherit" onClick={() => navigate("/join-room")}>
              Join Room
            </Button>
            <Button color="inherit" onClick={() => navigate("/create-room")}>
              Create Room
            </Button>
            <IconButton color="inherit" onClick={handleLogout}>
              Logout
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
