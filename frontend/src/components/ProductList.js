import React, { useContext } from "react";
import {observer} from 'mobx-react-lite';
import Row from "react-bootstrap/esm/Row";
import { Context } from "../index";
import ProductItem from "./ProductItem";





const ProductList = observer(() => {
    const {product} = useContext(Context)
    
    return (
        <Row className="d-flex"> 
            {product.products.map(product =>
             <ProductItem key={ProductList.id} product={product}/>
            )}           
        </Row>
    );
});

export default ProductList;