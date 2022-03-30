import React, { useState } from "react";
import { Button, Box, TextField, Container, Alert } from "@mui/material";
// import axios from "axios";
import feathersClient from "../client/index";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alert, setAlert] = useState(false);

  let userLogin = {
    email: email,
    password: password,
  };

  const formLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = await feathersClient.authenticate({
        strategy: "local",
        ...userLogin,
      });
      const result = await feathersClient.get("authentication");
      // console.log(result);
      result ? navigate("/all-users") : setError("Error");
    } catch (err) {
      setError("Not a valid login");
      console.log(err);
    }
  };

  function dismissAlert() {
    setAlert(false);
    setError("");
    setSuccess("");
  }

  return (
    <>
      <Container maxWidth="sm">
        <div>
          <h3>User Login</h3>
          <hr />
          {error && (
            <Alert onClose={dismissAlert} severity="error">
              {error}
            </Alert>
          )}
          {success && (
            <Alert onClose={dismissAlert} severity="success">
              {success}
            </Alert>
          )}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "50ch" },
              alignItems: "center",
              justifyContent: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="standard-basic"
              label="Email ID"
              variant="standard"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              required
              id="standard-basic"
              label="Password"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <Button variant="contained" color="secondary" onClick={formLogin}>
              Login
            </Button>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default LoginComponent;
