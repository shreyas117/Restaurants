import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

async function LoadData(){
    const response = await fetch('https://dummyjson.com/products');
    if(!response.ok){
        throw new Error("Can't be loaded");
    }
    return await response.json();
}

const Load = () => {
    //console.log(s);
    const [prod,setProducts] = useState([]);

    useEffect( () => {
        LoadData().then((res) => {
            setProducts(res)
        })
        .catch((e) => {
            throw e;
        })
    }, []);
    console.log(prod);
    console.log(prod['products']);
    if(prod['products'] == undefined){
        var p = () => {
            return(
                <div>Loading ....</div>
            )
        }
    }
    else{
        var p = prod['products'].map( (item,index) => {
            return(
                <Card style={{ width: '18rem' }}>
                <div key={index}>
                    <h3>{item.id}</h3>
                    <Card.Header>{item.title}</Card.Header>
                    {/* <p></p> */}
                    <ListGroup variant="flush">
                    <ListGroup.Item>{item.description}</ListGroup.Item>
                    <ListGroup.Item>{item.rating}</ListGroup.Item>
                    <ListGroup.Item>{item.brand}</ListGroup.Item>
                    <ListGroup.Item>{item.description}</ListGroup.Item>
                    </ListGroup>
                    {/* <p>{item.description}</p> */}
                    {/* <p>{item.price}</p> */}
                    {/* <p>{item.rating}</p> */}
                    {/* <p>{item.brand}</p> */}
                    <img src={item.thumbnail} />
                </div>
                </Card>
            );
        });

    }
   

    return(
        <div>
            <h1> Hello Commander Shepard ! </h1>
            <p>{p}</p>
        </div>
    );
}



export default Load;