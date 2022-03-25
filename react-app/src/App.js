import React from "react";
import "./App.css";
import Button from "@mui/material/Button";

import RegisterPage from "./pages/RegisterPage";
function App({ children }) {
  return (
    <div className="App">
      <h1>Valiation App</h1>
      <RegisterPage />
    </div>
  );
}

export default App;

// form
