import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import BadgeIcon from "@mui/icons-material/Badge";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nav from "../navbar/nav";

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

export default function Useraccount() {
  const [username, setusername] = useState("");

  useEffect(() => {
    axios
      .get("https://lets-collab-backend.herokuapp.com/chats/username", {
        headers: {
          "x-access-token": localStorage.getItem("usertoken")
        }
      })
      .then((res) => {
        setusername(res.data.user.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  return (
    <ThemeProvider theme={themeDark}>
      <Nav />
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
          <Typography component="h2" variant="h3">
            USER ACCOUNT
          </Typography>

          <Avatar
            sx={{ m: 5, bgcolor: "secondary.main", width: 120, height: 120 }}
          >
            <BadgeIcon sx={{ fontSize: 100 }} />
          </Avatar>

          <Typography component="h1" variant="h2">
            {username}
          </Typography>

          <br />
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Link
              to="/"
              onClick={() => {
                window.localStorage.removeItem("loggedin");
                window.localStorage.removeItem("usertoken");
                window.location = "/";
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Logout
              </Button>
            </Link>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            ></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
