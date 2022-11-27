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

const Counter = (props) => {
  const [count, setCount] = useState(props.quantity);

  useEffect(() => {
    const data = [...props.det];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == props.name) {
        //console.log(data[i].name);
        data[i].quantity = count;
        break;
      }
    }

    //console.log(data);
    props.setDet(data);
  }, [count]);

  const incrementCount = async () => {
    await setCount((count) => count + 1);
    await props.setBill((bill) => parseInt(props.bill) + parseInt(props.price));
  };

  const decrementCount = async () => {
    await setCount((count) => count - 1);
    await props.setBill((bill) => parseInt(props.bill) - parseInt(props.price));
  };

  return (
    <div>
      <Button onClick={decrementCount} disabled={count == 0 ? true : false}>
        -
      </Button>
      {count}
      <Button onClick={incrementCount}>+</Button>
      {/* <Typography>Subtotal : {parseInt(count * props.price)}</Typography> */}
    </div>
  );
};

export default Counter;
