import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Container, Alert } from "@mui/material";
// import axios from "axios";
import feathersClient from "../../src/client/index";

const RegisterComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alert, setAlert] = useState(false);
  const [age, setAge] = useState(0);
  const [ageShow, setAgeShow] = useState(false);

  let newData = {
    first_name: firstName,
    last_name: lastName,
    dob: dob,
    emailid: emailid,
    password: password,
  };

  // function formSubmit(event) {
  //   // const form = event.currentTarget;
  //   // console.log(form);
  //   axios
  //     .post("http://localhost:3030/users", newData)
  //     .then((res) => {
  //       if (res.data._id) {
  //         console.log(res.data);
  //         setSuccess(res.data.msg);
  //         setError(false);
  //         setAlert(true);
  //       } else if (res.data.status === "fail") {
  //         setError(res.data.msg);
  //         setAlert(true);
  //       } else {
  //         //2 error validation error
  //         setError(res.data.errors[0].msg);
  //         setAlert(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await feathersClient.service("users").create(newData);
      setSuccess("User added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  function dismissAlert() {
    setAlert(false);
    setError("");
    setSuccess("");
  }

  useEffect(() => {
    ageCalc();
  }, [dob]);

  function ageCalc() {
    console.log(dob);
    if (dob !== "") {
      const mySec = Date.now() - new Date(dob);
      const myAge = mySec / (1000 * 3600 * 24 * 365);
      if (myAge !== 0) {
        setAge(Math.floor(myAge));
        setAgeShow(true);
      } else {
        setAge(0);
        setAgeShow(false);
      }
    } else {
      setAge(0);
      setAgeShow(false);
    }
  }

  return (
    <>
      <Container maxWidth="sm">
        <div>
          <h3>Registration</h3>
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
              label="First Name"
              variant="standard"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              required
              id="standard-basic"
              label="Last Name"
              variant="standard"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              id="standard-basic"
              label="Date of Birth"
              type="date"
              variant="standard"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
            {ageShow && (
              <>
                <Box
                  sx={{
                    // "&": {},
                    mx: 10,
                    p: 1,
                    boxShadow: 3,
                    borderRadius: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "primary.dark",
                    color: "white",
                  }}
                >
                  <p>Your Age is: </p>
                  <h1>{age}</h1>
                </Box>
              </>
            )}
            <TextField
              required
              id="standard-basic"
              label="Email ID"
              variant="standard"
              value={emailid}
              onChange={(e) => {
                setEmailid(e.target.value);
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
            <Button variant="contained" color="warning" onClick={formSubmit}>
              Submit
            </Button>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default RegisterComponent;
