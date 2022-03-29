import React from "react";
import UsersListItem from "./UsersListItem";
import { Container, Grid } from "@mui/material";
const UsersList = (props) => {
  return (
    <>
      <Grid container>
        {props.users.map((user) => (
          <Grid item xs={3}>
            <UsersListItem
              key={user._id}
              id={user._id}
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
              dob={user.dob}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UsersList;
