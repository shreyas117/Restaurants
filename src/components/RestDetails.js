import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Display from "./Display";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  Breadcrumbs,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  Item,
} from "@mui/material";
import Counter from "./Counter";
import zIndex from "@mui/material/styles/zIndex";

const RestDetails = () => {
  const { id } = useParams();

  const [det, setDet] = useState([]);
  const [bill, setBill] = useState(0);
  const [count, setCount] = useState(0);

  const location = useLocation();
  const details = location.state.menu;

  useEffect(() => {
    setDet(details);
  }, [details]);

  return (
    <div>
      {det == [] && <div>Loading...</div>}
      {det.map((item, index) => {
        return (
          <div>
            {item.name} : {item.price} ;{" "}
            <Counter bill={bill} price={item.price} setBill={setBill} />
            <Divider />
          </div>
        );
      })}
      <Divider />
      <Typography>Total Bill : {bill}</Typography>
      <Link to="/home">Go Back</Link>
    </div>
  );
};

export default RestDetails;
