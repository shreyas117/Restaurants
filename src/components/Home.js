import React, { useEffect, useState, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import RestDetails from "./RestDetails.js";
import ShowInfo from "./ShowInfo.js";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
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

const Home = () => {
  const [pin, setPin] = useState("");
  const [rests, setRest] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rating, setCheckRating] = useState(false);
  const [emptyPin, setEmptyPin] = useState("");

  const origPin = useRef(pin);

  //useNavigate("/details");
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
    //getRest();
  }, []);
  // const goDetails = (id) => {
  //   navigate("/details" + id);
  // };

  const displayRest = (array) => {
    return array.map((item, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card key={index} sx={{ maxWidth: 345 }}>
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
                to={{ pathname: "/details/" + item._id }}
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

  return (
    <div>
      <TextField
        id="pin"
        label="Pin-Code"
        value={pin}
        variant="outlined"
        onChange={async (e) => {
          await setPin(e.target.value);
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
