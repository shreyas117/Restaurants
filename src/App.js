import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Load from "./components/Load.js";
import Home from "./components/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import ChangePassword from "./components/ChangePassword.js";
import RestDetails from "./components/RestDetails";
import AddRest from "./components/AddRest";
import UpdateRest from "./components/UpdateRest";
import Feedback from "./components/Feedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/details/:id" element={<RestDetails />} />
        <Route path="/home/addrest" element={<AddRest />} />
        <Route path="/home/editrest" element={<UpdateRest />} />
        <Route path="/home/feedback/:id" element={<Feedback />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
