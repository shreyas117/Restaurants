import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import ListGroup from "react-bootstrap/ListGroup";
import Display from "./Display";
import {
  Link,
  NavLink,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import ShoppingCartCheckoutIcon from "@material-ui/icons-material/ShoppingCartCheckout";
import Counter from "./Counter";
import zIndex from "@mui/material/styles/zIndex";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const RestDetails = () => {
  const { id, userName } = useParams();
  //console.log(id, userName);
  var navigate = useNavigate();

  const [det, setDet] = useState([]);
  const [bill, setBill] = useState(0);

  const location = useLocation();
  const details = location.state.menu;

  //console.log(details);

  useEffect(() => {
    if (Object.keys(details[0]).length == 2) {
      details.forEach((obj, index) => {
        details[index]["quantity"] = 0;
      });
    } else {
      let sum = 0;
      details.forEach((obj, index) => {
        sum = sum + obj.quantity * obj.price;
      });
      //console.log(sum);
      setBill(sum);
    }
    setDet(details);
  }, [details]);

  const handlePlaceOrder = async () => {
    const final = [...det];
    const emptyPos = [];
    const removeZeroQuantityItems = () => {
      for (var i = 0; i < det.length; i++) {
        if (det[i].quantity == 0) {
          emptyPos.push(i);
        }
      }
      for (var i = 0; i < emptyPos.length; i++) {
        final.splice(emptyPos[i], 1);
      }
    };
    removeZeroQuantityItems();
    var url =
      "http://localhost:3001/placeOrder?name=" +
      userName +
      "&restId=" +
      id +
      "&bill=" +
      bill;

    //console.log(final);

    //console.log(det);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(final),
    });

    const message = await response.json();
    alert(message.result);
    return true;
    //console.log(det);
  };

  return (
    <div>
      <Typography>Menu Items</Typography>
      {det == [] && <div>Loading...</div>}
      {/* {console.log(det)} */}
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          <ListItem>
            <ListItemText primary="Item" />
            <ListItemText primary="Price" />
            <ListItemText primary="Quantity" />
          </ListItem>
          {det.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.price} />
                <ListItemText
                  primary={
                    <Counter
                      bill={bill}
                      price={item.price}
                      name={item.name}
                      quantity={item.quantity}
                      det={det}
                      setDet={setDet}
                      setBill={setBill}
                    />
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />
      <Typography>Total Bill : {bill}</Typography>
      {userName == undefined ? (
        <Typography>
          Please login to place an order.{" "}
          <Link to={{ pathname: "/" }}>Login here</Link>
        </Typography>
      ) : (
        <div></div>
      )}
      <Button
        onClick={async () => {
          {
            (await handlePlaceOrder())
              ? navigate(`/home/${userName}`)
              : alert("Login failed");
          }
        }}
        disabled={userName == undefined || bill == 0 ? true : false}
      >
        Place Order
      </Button>
      <br />
      <Link to="/home">Previous page</Link>
    </div>
  );
};

export default RestDetails;
