import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, NavLink } from "react-router-dom";
import { Button, TextField, Breadcrumbs, Divider } from "@mui/material";

async function add(userName, password) {
  var url =
    "http://localhost:3001/signup?userName=" +
    userName +
    "&password=" +
    password;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  });
  if (!response.ok) {
    //throw new Error("Login error Dude!");
  }
  const j = await response.json();
  console.log(j.result);
  if (j.result == true) {
    alert("Sign up Successful!");
  } else {
    alert("Username already exists! Please enter a different username");
  }
}

const SignUp = () => {
  const [userName, setUser] = useState("");
  const [password, setPass] = useState("");

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink underline="hover" to="/">
          Login
        </NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/changePassword">Change Password</NavLink>
      </Breadcrumbs>
      <Divider />
      <TextField
        id="name"
        label="User Name"
        value={userName}
        variant="outlined"
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <TextField
        id="pass"
        label="Password"
        value={password}
        variant="outlined"
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />

      <Button
        onClick={() => {
          add(userName, password);
        }}
      >
        Sign Up!
      </Button>
    </div>
  );
};

export default SignUp;
