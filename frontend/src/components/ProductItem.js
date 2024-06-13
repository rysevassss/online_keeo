import React, {useContext} from "react";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {useNavigate, useParams} from 'react-router-dom';
import { PRODUCT_ROUTE } from "../utils/consts";
import {Context} from '../index';
import { addToCart } from '../http/productAPI';
import { Button } from "react-bootstrap";


const ProductItem = ({product}) => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const {id} = useParams()
    console.log(product)

    return (
        <Col md={3} 
        onClick={() => history(PRODUCT_ROUTE + '/' + product.id)}>
            <Card className="card mb-2">
                <Image 
                className="imgcard"
                src={process.env.REACT_APP_API_URL + product.img}/>
                <div className="name">{product.name}</div>
                <div className="price">{product.price} ₽</div>
            </Card>
        </Col>    
    );
};

export default ProductItem;