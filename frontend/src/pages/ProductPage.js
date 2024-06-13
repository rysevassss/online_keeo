import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import {useNavigate, useParams} from 'react-router-dom';
import { useState } from 'react';
import {addToCart, fetchOneProduct } from '../http/productAPI';
import {Breadcrumb} from 'react-bootstrap';
import { CATALOG_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Fill from '../components/Tab';
import '../styles/ProductPage.scss';
import { Context } from '..';

function ProductPage() {
  const {user} = useContext(Context)
  const history = useNavigate()
  const [product, setProduct] = useState({info: []})
  const {id} = useParams()

  const add = () => {
          const formData = new FormData()
          formData.append('productId', id)
          addToCart(formData).then(response => alert(`Товар был добавлен в вашу корзину!`))
      }


  useEffect(() => {
    fetchOneProduct(id).then(data => setProduct(data))
  }, )

  
    return (
      <Container className='ff mt-3'>
        <Breadcrumb>
            <Breadcrumb.Item onClick={() => history(SHOP_ROUTE)}> Главная</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => history(CATALOG_ROUTE)}> Каталог</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row className='d-flex justify-content-center'> 
        <Col md={6}>
          <Image className='product' src={process.env.REACT_APP_API_URL + product.img}/>
        </Col>

        <Col md={6} className='about'>
          <div className='p-3'>
            <h1>{product.name}</h1>
            <h2>Описание</h2>
            <div className='pppp'>
            <p>{product.description}</p></div>
            <h3 className='pri'>{product.price} ₽</h3>
            {user.isAuth ?
            <button 
            className='addcart'
            onClick={add}>
              Добавить в корзину</button>
            :
              <p className='log' onClick={() => history(LOGIN_ROUTE)}>Войдите в личный кабинет, чтобы добавить товар в корзину.</p>}
          </div>
        </Col>
        </Row>
        <Fill/>
      </Container>
    );
  }
  
  export default ProductPage;
