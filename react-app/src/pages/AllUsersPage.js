import feathersClient from "../../src/client/index";
import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
const AllUsersPage = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData(e) {
    // e.preventDefault();
    try {
      //displaying all user data
      const getUserData = await feathersClient.service("users").find();
      console.log(getUserData.data);
      setUsersList(getUserData.data);
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
