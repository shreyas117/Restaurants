import React, { useEffect, useState, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import RestDetails from "./RestDetails.js";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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

const UpdateRest = () => {
  const location = useLocation();
  const details = location.state.details;
  //console.log(details);
  const arr = [
    { name: "jamun", price: "50" },
    { name: "badushah", price: "100" },
  ];
  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [info, setInfo] = useState("");
  const [pin, setPin] = useState("");
  const [menu, setMenu] = useState([
    {
      name: "",
      price: 0,
    },
  ]);

  useEffect(() => {
    const load = async () => {
      await setMenu(details.menu);
      await setPin(details.pinCode);
      await setName(details.name);
      await setInfo(details.info);
      await setImgURL(details.imgURL);
    };
    load();
    //var i = <MenuItem />
  }, []);
  // const [name,setName] = useState("")

  const handleFormChange = async (index, e) => {
    let data = [...menu];
    //console.log(index, data[index], e.target.name);
    data[index][e.target.name] = e.target.value;

    await setMenu(data);
  };

  const submitDetails = async () => {
    var url =
      "http://localhost:3001/editRest?name=" +
      name +
      "&imgURL=" +
      imgURL +
      "&info=" +
      info +
      "&pinCode=" +
      pin +
      "&id=" +
      details._id;
    //   "&menu=" +
    //   menu;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(menu),
    });

    const message = await response.json();
    alert(message.result);
    console.log(message.result);
  };

  const addMenuItem = async () => {
    const t = [...menu];

    t.push({ name: "", price: 0 });

    //setMenu([...inputFields, newfield])

    await setMenu([...t]);
  };

  const deleteRow = async (index) => {
    let data = [...menu];
    const prevData = data.slice(0, index);
    const afterData = data.slice(index + 1);

    data = prevData.concat(afterData);
    //console.log(data);
    setMenu(data);
  };

  const checkEmptyItem = async () => {
    for (var i = 0; i < menu.length; i++) {
      if (menu[i].name == "" || menu[i].price == "") {
        return true;
      }
    }
    return false;
  };
  return (
    <div>
      <TextField
        id="name"
        label="Name"
        value={name}
        variant="outlined"
        required
        defaultValue={details.name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        id="img"
        label="Image URL"
        value={imgURL}
        variant="outlined"
        onChange={(e) => {
          setImgURL(e.target.value);
        }}
      />
      <TextField
        id="pinC"
        label="Pin-Code"
        value={pin}
        variant="outlined"
        defaultValue={details.pin}
        onChange={(e) => {
          setPin(e.target.value);
        }}
      />
      <TextField
        id="informn"
        label="Information"
        value={info}
        variant="outlined"
        onChange={(e) => {
          setInfo(e.target.value);
        }}
      />
      <Divider />
      <Typography>Edit Menu Details</Typography>
      <form>
        <Button onClick={addMenuItem}>Add Menu Item</Button>
        {/* {menu[0].name == "" && <div>Loading ..</div>} */}
        {menu.map((input, index) => {
          return (
            <div key={index}>
              <TextField
                name="name"
                //id="name"
                label="Name"
                value={input.name}
                required
                variant="outlined"
                onChange={(e) => {
                  handleFormChange(index, e);
                }}
              />
              <TextField
                name="price"
                label="Price"
                value={input.price}
                required
                variant="outlined"
                onChange={(e) => {
                  handleFormChange(index, e);
                  //setMenu(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  deleteRow(index);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          );
        })}

        <Button
          onClick={async () => {
            (await checkEmptyItem())
              ? alert("Menu item names/prices cannot be empty!")
              : submitDetails();
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UpdateRest;
