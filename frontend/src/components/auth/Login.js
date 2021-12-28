import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeDark = createTheme({
  palette: {
    background: {
      default: "#282828"
    },
    text: {
      primary: "#ffffff"
    }
  },
  typography: {
    fontFamily: "Bakbak One"
  }
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onchangeemail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onchangepassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios
      .post("https://lets-collab-backend.herokuapp.com/auth/login", {
        email: email,
        password: password
      })
      .then(function (res) {
        const newmessage =
          res.data.message ||
          res.data.flaws.name ||
          res.data.flaws.email ||
          res.data.flaws.password;
        setMessage(newmessage);
        const valid = res.data.isValid;

        if (valid && res.data.status === 200) {
          setSuccessful(true);
          localStorage.setItem("usertoken", res.data.token);
          localStorage.setItem("loggedin", true);

          window.location = "/dashboard";
        }
      })
      .catch(function (err) {
        setMessage("Check your parameters. Login not successful!!");
        setSuccessful(false);
      });
  };

  return (
    <ThemeProvider theme={themeDark}>
      <Container component="main" maxWidth="s">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h2">
            SIGN IN
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ input: { color: "black", bgcolor: "white" } }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onchangeemail}
            />
            <TextField
              sx={{ input: { color: "black", bgcolor: "white" } }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onchangepassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Link href="/register" variant="body2">
                  <Typography align="center" color="#28a745">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>

              <br />

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
