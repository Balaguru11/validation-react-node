import React from "react";

import "./App.css";
// import { Button, Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import MainNav from "./layout/MainNav";
import RegisterPage from "./pages/RegisterPage";
import AllUsersPage from "./pages/AllUsersPage";
import LoginPage from "./pages/LoginPage";
function App({ children }) {
  return (
    <>
      <div className="App">
        <MainNav />
        {/* <RegisterPage />
        <LoginPage />
        <AllUsersPage /> */}
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/all-users" element={<AllUsersPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
