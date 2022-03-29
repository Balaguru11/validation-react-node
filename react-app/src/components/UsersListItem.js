import React from "react";
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

const UsersListItem = (props) => {
  function editUser() {
    console.log("editing user");
  }

  function deleteUser() {
    console.log("Deleting user");
  }
  return (
    <>
      <Card key={props.id} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.firstName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.lastName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="Text.secondary" gutterBottom>
            <EmailIcon />: {props.email}
            <CakeIcon />: {props.dob}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            id={props.id}
            color="secondary"
            variant="contained"
            size="small"
            onClick={editUser}
          >
            Edit
          </Button>
          <Button
            id={props.id}
            size="small"
            color="danger"
            variant="contained"
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
