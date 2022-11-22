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

const ShowInfo = (props) => {
  const info = props.info;
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      {showMore ? info : `${info.substring(0, 100)}`}
      <CardActions>
        <Button onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show less" : "Show more"}
        </Button>
      </CardActions>
    </div>
  );
};

export default ShowInfo;
