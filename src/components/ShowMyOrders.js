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
  MenuItem,
  Item,
} from "@mui/material";
//import Card from "./Card";
import zIndex from "@mui/material/styles/zIndex";
import { CardGroup } from "react-bootstrap";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ShowMyOrders = () => {
  const { userName } = useParams();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("latest");

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
    await setData(
      t1.orders.sort((order1, order2) => (order1.bill > order2.bill ? -1 : 1))
    );
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

  const handleFilterChange = (e) => {
    const fil = e.target.value;
    setFilter(fil);
    const temp = [...data];
    if (fil == "highestPrice") {
      temp.sort((order1, order2) => (order1.bill > order2.bill ? -1 : 1));
    } else if (fil == "lowestPrice") {
      temp.sort((order1, order2) => (order1.bill > order2.bill ? 1 : -1));
    } else if (fil == "latest") {
      temp.sort((order1, order2) =>
        order1.timestamp > order2.timestamp ? -1 : 1
      );
    } else {
      temp.sort((order1, order2) =>
        order1.timestamp > order2.timestamp ? 1 : -1
      );
    }
    setData(temp);
  };

  return (
    <div>
      <Typography align="center">
        Here are all your restaurant orders {userName}
      </Typography>
      <Select
        //labelId="demo-simple-select-label"
        //id="demo-simple-select"
        value={filter}
        label="Search            "
        onChange={handleFilterChange}
      >
        <MenuItem value={"latest"}>Latest</MenuItem>
        <MenuItem value={"oldest"}>Oldest</MenuItem>
        <MenuItem value={"highestPrice"}>Highest Price</MenuItem>
        <MenuItem value={"lowestPrice"}>Lowest Price</MenuItem>
      </Select>
      {data == [] && <div>Empty </div>}
      {/* {console.log(data)} */}
      {/* Filter data here based on price/timestamp */}

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
