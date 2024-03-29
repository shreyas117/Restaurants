import React, { useEffect, useState, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import RestDetails from "./RestDetails.js";
import * as XLSX from "xlsx/xlsx";

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

const AddRest = () => {
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
      "http://localhost:3001/addRest?name=" +
      name +
      "&imgURL=" +
      imgURL +
      "&info=" +
      info +
      "&pinCode=" +
      pin;
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

    const j = await response.json();
    console.log(j.result);
  };

  const addMenuItem = async () => {
    const t = [...menu];
    t.push({ name: "", price: 0 });

    //setMenu([...inputFields, newfield])

    await setMenu([...t]);
  };

  const handleInputFileChange = async (e) => {
    //console.log(e.target.files[0]);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const itemsArray = XLSX.utils.sheet_to_json(worksheet);

        await setMenu(itemsArray);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div>
      <Typography align="center">Enter Restaurant details</Typography>
      <br />
      <TextField
        id="name"
        label="Name"
        value={name}
        variant="outlined"
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
      <Typography>Add Menu Details</Typography>
      <input type="file" onChange={handleInputFileChange} />
      <form>
        <Button onClick={addMenuItem}>Add Menu Item</Button>
        {menu.map((input, index) => {
          return (
            <div key={index}>
              <TextField
                name="name"
                //id="name"
                label="Name"
                value={input.name}
                variant="outlined"
                onChange={(e) => {
                  handleFormChange(index, e);
                  //setMenu(e.target.value);
                }}
              />
              <TextField
                name="price"
                label="Price"
                value={input.price}
                variant="outlined"
                onChange={(e) => {
                  handleFormChange(index, e);
                  //setMenu(e.target.value);
                }}
              />
            </div>
          );
        })}
      </form>

      <Button
        onClick={() => {
          submitDetails();
          alert("Restaurant added successfully!");
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddRest;
