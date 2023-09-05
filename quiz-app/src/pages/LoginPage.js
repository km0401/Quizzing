import React, {useState}from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

const handleGoogleLogin = async (e) => {
  e.preventDefault();
  try {
    await googleSignIn();
    navigate("/");
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      // Handle the case where the user closed the popup
      setError("Google sign-in popup was closed. Please try again.");
    } else {
      setError(error.message);
    }
  }
};

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
            LOGIN
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
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
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ style: { fontSize: "15px" } }}
            InputLabelProps={{ style: { fontSize: "15px" } }}
          />
        </CardContent>
        <CardActions>
          <CustomButton text={"Login"} handleClick={handleLogin} />
        </CardActions>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: "#4285F4",
              color: "white",
              padding: "10px 10px",
              "&:hover": {
                backgroundColor: "#357AE8",
              },
            }}
          >
            Login with Google
          </Button>
        </CardActions>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption">
            New User? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

export default LoginPage;
