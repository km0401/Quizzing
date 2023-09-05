import React, { useState } from "react";
import {
  Alert, 
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import CustomButton from "../components/CustomButton";
import { Link, useNavigate} from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSignup = async(e) =>{
    e.preventDefault();
    try{
      await signUp(email, password);
      navigate("/login");
    }
    catch (error){
      setError(error.message);
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 300,
          padding: 2.5,
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "500" }}>
            SIGN UP
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            onChange={(e) => setName(e.target.value)}
            InputProps={{ style: { fontSize: "15px" } }}
            InputLabelProps={{ style: { fontSize: "15px" } }}
          />
          <TextField
            label="Email Id"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ style: { fontSize: "15px" } }}
            InputLabelProps={{ style: { fontSize: "15px" } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{ style: { fontSize: "15px" } }}
            InputLabelProps={{ style: { fontSize: "15px" } }}
          />
        </CardContent>
        <CardActions>
          <CustomButton text={"Sign Up"} handleClick={handleSignup}/>
        </CardActions>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption">
            Already have an account? <Link to="/login">Log In</Link>
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

export default LoginPage;
