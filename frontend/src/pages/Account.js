import React, {useEffect, useState} from 'react';
import { useContext} from 'react';
import { Context } from '..';
import {getUserOrder, getUserOrderList} from '../http/productAPI';
import {Breadcrumb, Card, Col, Container, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import UserPanel from '../components/UserPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';


const Account = observer(() => {
    const {product} = useContext(Context);
    const history = useNavigate();
    function sortOrdersById(orders) {
        const sortedOrders = orders.slice().sort((a, b) => {
            return a.id - b.id;
        });
        return sortedOrders;
    }
    const sortedOrders = sortOrdersById(product.order);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        const formattedDate = `${day}.${month}.${year}|${hours}:${minutes}`;
        return formattedDate;}

    useEffect(() => {
            getUserOrder().then(data => product.setOrders(data));
    }, [product]); 



    return (
        <Container className='dd mt-4'>
            <Breadcrumb>
            <Breadcrumb.Item onClick={() => history(SHOP_ROUTE)}> Главная</Breadcrumb.Item>
            <Breadcrumb.Item active>Личный кабинет</Breadcrumb.Item>

            </Breadcrumb>
            <h1>ЛИЧНЫЙ КАБИНЕТ</h1>
            <Row>
            <Col md="3">
            <UserPanel/>
            </Col>
            <Col md="9" className='ord'>
            <h2>Ваши заказы</h2>
            {sortedOrders.map(order =>
                <Card 
                className="bgorder w-100 p-3 mb-3"> 
                <div className= 'd-flex justify-content-between'>
                            <div className='d-flex flex-column'>
                            <h5>Номер заказа: {order.id}</h5>
                            <p>Номер телефона получателя: {order.phone}</p>
                            <p>Адрес получателя: {order.region} область
                            <br/>г.{order.city} 
                            <br/>ул.{order.street} д.{order.street_num} кв.{order.flat}</p></div>
                            <div className='d-flex flex-column text-end'>
                            <h5>Дата заказа: {formatDate(order.created)}</h5>
                            <p>Статус заказа: 
                                {{
                                    '1': ' Создан',
                                    '2': ' Отправлен',
                                    '3': ' В пути',
                                    '4': ' Доставлен'
                                } [order.status]}</p>
                            <p>Получатель: {order.name}  {order.surname}</p>
                            <p>Комментарий к заказу: {order.comment}</p></div></div>
                </Card>
                
            )}
            
            </Col>
        </Row>
        </Container>
    );

});

export default Account;
      
