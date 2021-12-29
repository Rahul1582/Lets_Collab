import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

export default function JoinRoom() {
  const [chatroomid, setchatroomid] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   window.location.reload();
  // },[]);

  const onchangeroomid = (e) => {
    setchatroomid(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/chats/invitelink/` + chatroomid,
        {
          params: {
            chatroomid
          }
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("usertoken")
          }
        }
      )
      .then(function (res) {
        const newmessage = res.data.message;
        setMessage(newmessage);

        if (res.data.status === 200) {
          setSuccessful(true);
          window.location = "/dashboard";
        }
      })
      .catch(function (err) {
        console.log(err);
        setMessage("Check your parameters. Joining Not Successful!!");
        setSuccessful(false);
      });
  };

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h2">
            JOIN ROOM
          </Typography>
          <Box
            component="form"
            onSubmit={handlesubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ input: { color: "black", bgcolor: "white" } }}
              margin="normal"
              required
              fullWidth
              id="roomid"
              label="Enter Joining Room ID"
              name="roomid"
              autoComplete="roomid"
              autoFocus
              onChange={onchangeroomid}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Join Room
            </Button>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
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
