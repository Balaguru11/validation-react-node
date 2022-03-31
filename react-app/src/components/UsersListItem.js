import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import PropTypes from "prop-types";
import feathersClient from "../../src/client/index";

const UsersListItem = (props) => {
  const [msg, setMsg] = useState("");

  async function editUser(event) {
    event.preventDefault();
    const id = event.target.id;
    try {
      const reAuth = await feathersClient.reAuthenticate();
      if (reAuth.accessToken) {
        // get data from id and display it in modal as Register form.. Edit the details and submit to call patch method directly.
        const editUser = await feathersClient.service("users").patch(id);
        console.log(editUser);
      } else {
        console.log("Not edited");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUser(event) {
    event.preventDefault();
    try {
      const id = event.target.id;
      const reAuth = await feathersClient.reAuthenticate();
      console.log(reAuth);
      if (reAuth.accessToken && id !== reAuth.user._id) {
        const deleteUser = await feathersClient.service("users").remove(id, {}); //softdel
        setMsg("User Deleted Successfully");
        // console.log(deleteUser);
      } else {
        setMsg("");
        console.log("Not logged in");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Card key={props.id} sx={{ m: 2, maxBlockSize: 500 }}>
        <CardContent align="left">
          <Typography variant="h5" component="div">
            {props.firstName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.lastName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="Text.secondary" gutterBottom>
            <EmailIcon />: {props.email}
            <br />
            <CakeIcon />: {props.dob}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            id={props.id}
            color="success"
            variant="contained"
            size="small"
            fullWidth={true}
            onClick={editUser}
          >
            Edit
          </Button>
          <Button
            id={props.id}
            size="small"
            color="warning"
            variant="contained"
            fullWidth={true}
            onClick={deleteUser}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

UsersListItem.propTypes = {
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dob: PropTypes.string,
};

export default UsersListItem;
