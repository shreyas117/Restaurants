import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, NavLink, Navigate, useNavigate, json } from "react-router-dom";
import {
  Button,
  TextField,
  Breadcrumbs,
  Typography,
  Divider,
} from "@mui/material";

async function validate(userName, password) {
  var url =
    "http://localhost:3001/validate?userName=" +
    userName +
    "&password=" +
    password;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  if (!response.ok) {
    //throw new Error("Login error Dude!");
  }
  const res = await response.json();

  return res.result;
}

const Login = () => {
  const [userName, setUser] = useState("");
  const [password, setPass] = useState("");
  var navigate = useNavigate();
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
        onClick={async () => {
          {
            (await validate(userName, password))
              ? navigate(`/home/${userName}`)
              : alert("Login Failed");
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Login;
