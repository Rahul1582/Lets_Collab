import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
  typography: { fontFamily: "Bakbak One" }
});

export default function SignUp() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onchangename = (e) => {
    const name = e.target.value;
    setname(name);
  };

  const onchangeemail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onchangepassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios
      .post("http://localhost:8000/auth/register", {
        name: name,
        email: email,
        password: password
      })
      .then(function (res) {
        console.log(res);
        const newmessage =
          res.data.message ||
          res.data.flaws.name ||
          res.data.flaws.email ||
          res.data.flaws.password;
        setMessage(newmessage);
        const valid = res.data.isValid;

        if (valid && res.data.status === 200) {
          setSuccessful(true);
          // window.location='/login';
        }
      })
      .catch(function (err) {
        setMessage("Check your parameters. Registration not successful!!");
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
            SIGN UP
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ input: { color: "black", bgcolor: "white" } }}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={onchangename}
            />
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Link href="/login" variant="body2">
                  <Typography align="center" color="#28a745">
                    {"Already have an account? Sign In"}
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
