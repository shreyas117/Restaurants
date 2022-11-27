import React, { useEffect, useState, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import RestDetails from "./RestDetails.js";
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
import zIndex from "@mui/material/styles/zIndex";
import { DoneOutline, Publish } from "@material-ui/icons";

const Feedback = () => {
  const location = useLocation();
  //console.log(location.state.details);
  const restName = location.state.details.name;
  const url = location.state.details.imgURL;
  const id = location.state.details._id;
  const feed = location.state.details.feedback;

  //const feed = props.feedbackDetails;

  //console.log(feed);
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");

  const handleClick = () => {
    setClicked(true);
  };

  const submitFeedback = async () => {
    const url =
      "http://localhost:3001/submitReview/?id=" +
      id +
      "&name=" +
      name +
      "&rating=" +
      rating +
      "&comments=" +
      comments;

    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(feed),
    });

    const j = await response.json();
    alert("Review Added Successfully!");
  };

  return (
    <div>
      <Typography>Showing Reviews for {restName}</Typography>
      <img src={url} height="140" />
      <Divider />
      {feed == undefined && <div>No Reviews so far</div>}
      {feed != undefined &&
        feed.map((item, index) => {
          return (
            <div key={index}>
              <Card>
                <Typography>User : {item.name}</Typography>
                <Typography>Rating : {item.rating}</Typography>
                <Typography>Comments : {item.feedback}</Typography>
              </Card>
              <Divider />
            </div>
          );
        })}
      <Button onClick={handleClick}>Add Review</Button>
      {clicked == true && (
        <div>
          <form>
            <TextField
              label="Enter Name"
              value={name}
              variant="outlined"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              label="Enter Rating"
              value={rating}
              variant="outlined"
              required
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
            <TextField
              label="Comments"
              value={comments}
              required
              variant="outlined"
              onChange={(e) => {
                setComments(e.target.value);
              }}
            />
            <Button onClick={submitFeedback}>
              <Publish />{" "}
              <Typography textTransform="none"> &nbsp;Submit Review</Typography>
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Feedback;
