import React, { useContext, useEffect } from "react";
import {observer} from 'mobx-react-lite';
import Row from "react-bootstrap/esm/Row";
import { Context } from "../index";
import { Col, Container } from "react-bootstrap";
import ProductList from "./ProductList";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../http/productAPI";


const New = observer(() => {
    const {product} = useContext(Context)
    useEffect(() => {
        fetchProducts().then(data => {
          product.setTotalCount(data.count)})
      }, )
    const sortedProducts = product.products.slice().sort((a, b) => b.id - a.id);
    const latestProducts = sortedProducts.slice(0, 4);
    
    return (
        <Container className="d-flex justify-content-center">
            <Col md={8}>
                <Row className='pp'>
                <h3>НОВИНКИ</h3>
                <Row className="d-flex"> 
                {latestProducts.map(product =>
                <ProductItem key={product.id} product={product}/>
                )}           
        </Row>
                </Row>
            </Col>
        </Container>
    );
});

export default New;