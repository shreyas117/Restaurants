import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  TextField,
  Breadcrumbs,
  Typography,
  Divider,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const Display = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.rests);
  }, [props.rests]);
  var p;
  if (data == undefined) {
    console.log("sghsghksgshhfhg");
    p = () => {
      return <div>Loading ..</div>;
    };
  } else {
    p = data["results"].map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.name}</h3>
          <img src={item.imgURL} />
        </div>
      );
    });

    return <div>{p}</div>;
  }
};

export default Display;
