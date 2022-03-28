import React from "react";
import UsersListItem from "./UsersListItem";
import { Container } from "@mui/material";
const UsersList = (props) => {
  return (
    <>
      <Container maxWidth="sm">
        {props.users.map((user) => (
          <UsersListItem
            key={user._id}
            firstName={user.first_name}
            lastName={user.last_name}
            emailid={user.emailid}
            dob={user.dob}
          />
        ))}
      </Container>
    </>
  );
};

export default UsersList;
