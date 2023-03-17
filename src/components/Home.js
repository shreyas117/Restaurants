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
  FormControl,
  InputLabel,
  Grid,
  Checkbox,
  MenuItem,
  Item,
} from "@mui/material";
//import Card from "./Card";
import zIndex from "@mui/material/styles/zIndex";
import { CardGroup } from "react-bootstrap";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//var navigate = useNavigate();
//const { state } = useLocation();
//const currentCategory = state && state.name;

const getRest = async (pin = "") => {
  var url = "http://localhost:3001/getRests?pinCode=" + pin;
  //console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  var x = await response.json();
  //setRest(x);
  //console.log(x);
  return x;
  //console.log(res["result"]);
};

const getRestsByName = async (restName = "") => {
  var url = "http://localhost:3001/getRestsByName?restNameSearch=" + restName;
  //console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  var x = await response.json();
  //console.log(x);
  //setRest(x);
  return x;
  //console.log(res["result"]);
};

const Home = () => {
  const [age, setAge] = React.useState("");
  const [restName, setRestName] = useState("");

  const [pin, setPin] = useState("");
  const [rests, setRest] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rating, setCheckRating] = useState(false);
  const [emptyPin, setEmptyPin] = useState("");
  const { name } = useParams();

  //console.log(name);

  const origPin = useRef(pin);

  const handleCheckChange = () => {
    setChecked(!checked);
  };

  const handleCheckRating = () => {
    setCheckRating(!rating);
  };

  useEffect(() => {
    const fun = async () => {
      const val = await getRest();
      await setRest(val);
    };
    fun();
  }, []);

  const showMyOrders = async () => {
    var url = "http://localhost:3001/showMyOrders?userName=" + name;

    //   "&menu=" +
    //   menu;
    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const j = await response.json();
    console.log(j.result);
  };

  const displayRest = (array) => {
    return array.map((item, index) => {
      return (
        <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={item.imgURL}
              // alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              {item.feedback == undefined ? (
                <Typography gutterBottom variant="h8" component="div">
                  Rating : {item.rating}
                </Typography>
              ) : (
                <Typography gutterBottom variant="h8" component="div">
                  Rating : {item.rating} from {item.feedback.length} Reviews
                </Typography>
              )}

              {/* <Typography variant="body2" color="text.secondary">
                    {item.info}
                  </Typography> */}
              <ShowInfo info={item.info} />

              <CardActions>
                <Link
                  to={{ pathname: "/home/editrest" }}
                  state={{ details: item }}
                >
                  Edit Restaurant
                </Link>
              </CardActions>
              <CardActions>
                <Link
                  to={{ pathname: "/home/feedback/" + item._id }}
                  state={{ details: item }}
                >
                  Reviews
                </Link>
              </CardActions>
            </CardContent>
            <Divider />
            <CardActions>
              {/* <Button
                    size="small"
                    onClick={(e) => {
                      goDetails(item._id);                  
                    }}
                  >
                    Menu
                  </Button> */}
              <Link
                to={{
                  pathname:
                    name == undefined
                      ? `/details/${item._id}`
                      : `/details/${item._id}/${name}`,
                }}
                state={{ menu: item.menu }}
              >
                Menu
              </Link>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Search</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Search"
          onChange={handleChange}
        >
          <MenuItem value={"Name"}>Name</MenuItem>
          <MenuItem value={"Pin-code"}>Pin-code</MenuItem>
        </Select>
      </FormControl>
      {/* Depending on what search type is picked, entered value should be assigned to appropriate state */}
      <TextField
        id="pin"
        label="Pin-Code"
        value={pin}
        variant="outlined"
        onChange={async (e) => {
          await setPin(e.target.value);
        }}
      />
      <TextField
        id="restName"
        label="Hotel Name"
        value={restName}
        variant="outlined"
        onChange={async (e) => {
          await setRestName(e.target.value);
          const val = await getRestsByName(e.target.value);
          await setRest(val);
        }}
      />
      <Button
        onClick={async () => {
          const val = await getRest(pin);
          //console.log(val);
          if (val["result"].length == 0) {
            await setEmptyPin(pin);
          }
          await setRest(val);
          //getRest(pin);
        }}
      >
        Submit
      </Button>
      {name == undefined ? (
        <Typography align="center">Hello Guest</Typography>
      ) : (
        <Typography align="center">Welcome back {name}!</Typography>
      )}
      <Link
        style={{ display: name != undefined ? "block" : "none" }}
        to={{ pathname: `/home/showMyOrders/${name}` }}
      >
        My Orders
      </Link>
      <br />
      <Link
        style={{ display: name == "commanderShepard" ? "block" : "none" }}
        to={{ pathname: `/home/addRest` }}
      >
        Add Restaurant
      </Link>
      <br />
      <br />
      <Divider /> <Divider />
      <Grid container spacing={4}>
        <Grid item md={2}>
          {/* <Typography></Typography> */}

          <FormControlLabel
            control={<Checkbox onChange={handleCheckRating} />}
            label="Rating 4+"
          />
        </Grid>
        <Grid item md={2}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Show Top 2"
          />
        </Grid>
      </Grid>
      {rests == {} && <div>Loading...</div>}
      {rests != undefined &&
        rests["result"] != undefined &&
        rests["result"].length == 0 && (
          <Typography>No Hotels for Pin-code: {emptyPin}</Typography>
        )}
      {checked == false &&
        rating == false &&
        rests != undefined &&
        rests["result"] != undefined && (
          <div>
            <Grid container spacing={2}>
              {displayRest(rests["result"])}
            </Grid>
          </div>
        )}
      {checked == false &&
        rating == true &&
        rests != undefined &&
        rests["result"] != undefined && (
          <div>
            <Grid container spacing={2}>
              {displayRest(
                rests["result"].filter((arrayItem) => {
                  return arrayItem.rating > 4.0;
                })
              )}
            </Grid>
          </div>
        )}
      {checked == true &&
        rating == false &&
        rests != undefined &&
        rests["result"] != undefined && (
          <div>
            <Grid container spacing={2}>
              {displayRest(rests["result"].slice(0, 2))}
            </Grid>
          </div>
        )}
      {checked == true &&
        rating == true &&
        rests != undefined &&
        rests["result"] != undefined && (
          <div>
            <Grid container spacing={2}>
              {displayRest(
                rests["result"]
                  .filter((arrayItem) => {
                    return arrayItem.rating > 4.0;
                  })
                  .slice(0, 2)
              )}
            </Grid>
          </div>
        )}
    </div>
  );
};

export default Home;
