import feathersClient from "../../src/client/index";
import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LoginComponent from "../components/LoginComponent";
const AllUsersPage = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [authentic, setAuthentic] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      //re authenticate
      const reAuth = await feathersClient.reAuthenticate();
      if (reAuth.accessToken) {
        const getUserData = await feathersClient.service("users").find(); //
        console.log(getUserData.data);
        setAuthentic(reAuth);
        setUsersList(getUserData.data);
      } else {
        setAuthentic([]);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function userLogout(e) {
    e.preventDefault();
    feathersClient.logout();
    setAuthentic([]);
    navigate("/login");
  }

  return (
    <div>
      <h3>Displaying All Users</h3>
      <hr />
      {authentic && <UsersList users={usersList} />}

      {authentic.length !== 0 && (
        <Button variant="contained" color="secondary" onClick={userLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default AllUsersPage;
