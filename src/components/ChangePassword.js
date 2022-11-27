import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, TextField, Breadcrumbs, Divider } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
async function change(userName, oldPassword, newPassword) {
  var url =
    "http://localhost:3001/changePassword?userName=" +
    userName +
    "&oldPassword=" +
    oldPassword +
    "&newPassword=" +
    newPassword;
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
  //console.log(j.result);
  //if(j.status == 404)

  //console.log(j.status);
  if (j.status == 200) {
    alert(j.result);
  } else {
    alert(j.result);
  }
}

const ChangePassword = () => {
  const [userName, setUser] = useState("");
  const [oldPassword, setOldPass] = useState("");
  const [newPassword, setNewPass] = useState("");

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
        id="oldPass"
        label="Password"
        value={oldPassword}
        variant="outlined"
        onChange={(e) => {
          setOldPass(e.target.value);
        }}
      />
      <TextField
        id="newPass"
        label="New Password"
        value={newPassword}
        variant="outlined"
        onChange={(e) => {
          setNewPass(e.target.value);
        }}
      />

      <Button
        onClick={() => {
          change(userName, oldPassword, newPassword);
        }}
      >
        Change Password!
      </Button>
    </div>
  );
};

export default ChangePassword;
