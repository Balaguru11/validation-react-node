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
            id={user._id}
            firstName={user.first_name}
            lastName={user.last_name}
            email={user.email}
            dob={user.dob}
          />
        ))}
      </Container>
    </>
  );
};

export default UsersList;
