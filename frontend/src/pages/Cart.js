import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '..';
import {deleteCart, deleteFromCart, getCart} from '../http/productAPI';
import {Card, CloseButton, Col, Container, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import CreateOrder from "../components/modals/CreateOrder";
import styled from 'styled-components';
import { SHOP_ROUTE } from '../utils/consts';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.scss';

const cart = observer(() => {
    const {product, a} = useContext(Context)
    const history = useNavigate()
    const [orderVisible, setOrderVisible] = useState(false)
    useEffect(() => {
        getCart().then(data => product.setCarts(data))
    }, [product, a])

    const StyledButton = styled.button`
    color: #3e1605;
    background-color: #fdf6f0;
    cursor: pointer;
    font-size: 22px;
    font-weight: bold;
    margin-top: 10%;
    padding: 1%;
  `;
  const StyledButton2 = styled.button`
    color: #3e1605;
    border: 0;
  `;


    const _delete = (id) => {
        deleteFromCart(id).then(response => alert(`Товар удален из корзины`)).then(response => refreshPage())
    }
    const _deleteall = () => {
        if (product.cart.length === 0) {
            alert('Корзина пуста!')
        } else {
        deleteCart().then(response => alert(`Товары удалены из корзины`)).then(response => refreshPage())
    }}


    let pricesf = 0;
    let pricesl = 0;
    let saleprice = 0;
    let delivery = 400;
    let pricesdel = 0;

    {product.cart.map(price =>
        pricesf += price.product.price
    )}

    if (pricesf > 5000) {
        saleprice = pricesf * 0.1
        pricesl = pricesf * 0.9
        delivery = 0;
    } else if (pricesf > 4000) {
        delivery = 0;
        pricesl = pricesf
    } else if (pricesf < 4000) {
        pricesl = pricesf
    }

    saleprice = parseFloat(saleprice.toFixed(1));
    pricesdel += pricesl + delivery;

    return (
        <Container className='dd mt-3'>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => history(SHOP_ROUTE)}> Главная</Breadcrumb.Item>
          <Breadcrumb.Item active>Корзина</Breadcrumb.Item>
        </Breadcrumb>
            <h1>ВАШ ЗАКАЗ</h1>
            <Row>
            <Col md="8">
            <div className='d-flex justify-content-end'>
            <StyledButton2 onClick={() => _deleteall()}>Очистить корзину</StyledButton2></div>
            {product.cart.map(product =>
                <Card className="bg w-100 p-2 mb-2"  key={product.id}>
                    <Row>
                            <Col md="2" className='ci'>
                                <img src={process.env.REACT_APP_API_URL + product.product.img} alt="img not found" height={120}  />
                            </Col>
                            <Col md="6" className='pn ms-2'>
                                <h4>{product.product.name}</h4>
                            </Col>
                                <Col className="d-flex justify-content-start">
                            <div className="pr flex-row">
                                <span>Цена</span>
                                <h4>{product.product.price} ₽</h4>
                            </div>
                                </Col>
                            <Col  md="1" className="d-flex flex-row justify-content-end">
                                    <CloseButton onClick={() => _delete(product.id)}/> 
                            </Col>
                            </Row>
                </Card>
                
            )}
            </Col>
            
            <Col md="4">
            <Card className='bg2 p-3 w-100'>
                <div className='tt d-flex justify-content-between mt-2'>
                <h5>Cумма:</h5>
                <h5>{pricesf}<span> ₽</span></h5></div>
                <div className='tt d-flex justify-content-between'>
                <h5>Cкидка:</h5>
                <h5>{saleprice}<span> ₽</span></h5></div>
                <div className='tt d-flex justify-content-between'>
                <h5>Доставка:</h5>
                <h5>{delivery}<span> ₽</span></h5></div>
                <div className='ttl d-flex justify-content-between mt-4'>
                <h4>Всего:</h4>
                <h4>{pricesdel}<span> ₽</span></h4></div>
                {product.cart.length > 0 && (
                <StyledButton onClick={() => setOrderVisible(true)}>ОФОРМИТЬ ЗАКАЗ</StyledButton>
            )}
            </Card>
            </Col>
            
            </Row>
            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
            
        </Container>
    );

});
export default cart;
