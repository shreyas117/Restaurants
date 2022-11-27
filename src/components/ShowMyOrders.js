import React, { useEffect, useState, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import RestDetails from "./RestDetails.js";
import ShowInfo from "./ShowInfo.js";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
  // useHistory,
} from "react-router-dom";
import {
  Button,
  TextField,
  Breadcrumbs,
  FormControlLabel,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  Checkbox,
  Item,
} from "@mui/material";
//import Card from "./Card";
import zIndex from "@mui/material/styles/zIndex";
import { CardGroup } from "react-bootstrap";

const ShowMyOrders = () => {
  const { userName } = useParams();

  const [data, setData] = useState([]);

  //console.log(data);
  const fetchOrders = async () => {
    var url = "http://localhost:3001/showMyOrders?userName=" + userName;
    //console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      //body: JSON.stringify(det),
    });

    const orders = await response.json();
    const temp = orders.result;
    const t1 = temp[0];
    await setData(t1.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const convertStringtoDate = (str) => {
    const date = new Date(str);
    return date;
  };

  const displayDateTime = (str) => {
    const d = new Date(str);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    var time = d.getHours();
    var minutes = d.getMinutes();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    var flag = "AM";
    if (time == 0) {
      time = 12;
    } else {
      if (time > 12) {
        flag = "PM";
        time = time - 12;
      }
    }
    return `${date} ${month} ${year} at ${time}:${minutes} ${flag}`;
  };

  return (
    <div>
      <Typography align="center">
        Here are all your restaurant orders {userName}
      </Typography>
      {data == [] && <div>Empty </div>}
      {/* {console.log(data)} */}
      {data != [] &&
        data.map((order, index) => {
          return (
            <div key={index}>
              <Divider />
              <Divider />
              {/* {console.log(order)} */}
              <Divider />
              <Typography>{order.restName} </Typography>
              <Divider />
              <Divider />
              {/* <Typography>Bill : {order.bill} Rs</Typography> */}
              {/* <Typography>Items ordered</Typography> */}
              {/* Item &nbsp;&nbsp;&nbsp; Price &nbsp;&nbsp;&nbsp; Quantity */}
              {order.orderItems.map((item, itemIndex) => {
                return (
                  <div key={itemIndex}>
                    {item.name} &nbsp;&nbsp; {item.price} x&nbsp;
                    {item.quantity}
                  </div>
                );
              })}
              <Divider />

              <Typography>
                {displayDateTime(order.timestamp)}&nbsp;&nbsp;&nbsp;&nbsp;
                {order.bill} Rs &nbsp;&nbsp;
                {/* {console.log(order.orderItems)                 } */}
                <Link
                  to={{ pathname: `/details/${order.restId}/${userName}` }}
                  state={{
                    menu: order.orderItems,
                  }}
                >
                  Reorder
                </Link>
              </Typography>

              <Divider />
            </div>
          );
        })}
    </div>
  );
};

export default ShowMyOrders;
