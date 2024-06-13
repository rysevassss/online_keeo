import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchProducts } from '../http/productAPI';
import Slider from '../components/Slider';
import Popular from '../components/New';
import '../styles/main.scss';
import New from '../components/New';

const Shop = observer(() => {
    const {product} = useContext(Context)
    
    useEffect(() => {
        fetchProducts().then(data => {
          product.setProducts(data.rows)
          product.setTotalCount(data.count)})
      }, [product])
    return (
        <Container className='mt-5 '>
            <Slider/>    
            <New/>
        </Container>
    )
});
  
export default Shop;
