import feathersClient from "../../src/client/index";
import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
const AllUsersPage = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const getUserData = await feathersClient.service("users").find({});
      setUsersList(getUserData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h3>Displaying All Users</h3>
      <hr />
      <UsersList users={usersList} />
    </div>
  );
};

export default AllUsersPage;
