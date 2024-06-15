import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Card, Dropdown, Col, Button} from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateCategory from '../components/modals/CreateCategory';
import CreateProduct from '../components/modals/CreateProduct';
import CreatePromo from '../components/modals/CreatePromo';
import DeleteCategory from '../components/modals/DeleteCategory';
import DeleteType from '../components/modals/DeleteType';
import DeleteProduct from '../components/modals/DeleteProduct';
import UpdateOrdStatus from '../components/modals/updateStatus';
import styled from 'styled-components';
import {Context} from '../index';
import {getAllOrder, updateOrderStatus} from '../http/productAPI';
import '../styles/admin.scss';
import DeletePromo from '../components/modals/DeletePromo';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';


const Admin = () => {
    const {product, user} = useContext(Context)
    const history = useNavigate()
    const isAdminStored = localStorage.getItem('isAdmin') === 'true';
    if (isAdminStored) {
    user.setIsAdmin(true);
}

    useEffect(() => {
        getAllOrder().then(data => product.setOrders(data))
    }, [product])

    const handleToggleOrders = () => {
        setShowOrders(prevState => !prevState);
    }

    function sortOrdersById(orders) {
        return orders.sort((a, b) => {
            return a.id - b.id;
        });
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

    const [categoryVisible, setCategoryVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [promoVisible, setPromoVisible] = useState(false)

    const [delcategoryVisible, setdelCategoryVisible] = useState(false)
    const [deltypeVisible, setdelTypeVisible] = useState(false)
    const [delproductVisible, setdelProductVisible] = useState(false)
    const [delpromoVisible, setdelPromoVisible] = useState(false)
    
    const [showOrders, setShowOrders] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState('')
    const [statusVisible, setStatusVisible] = useState(false)
    const handleUpdateStatus = (orderId) => {
        setSelectedOrder(orderId);
        setStatusVisible(true);
    }

    const StyledButton = styled.button`
     color: #fdf6f0;
     background-color: #3e1605;
     border-radius: 10px;
     cursor: pointer;
     font-size: 18px;
   `;

   const StyledButton2 = styled.button`
     color: #3e16-5;
     background-color: #fdf6f0;
     border-radius: 10px;
     cursor: pointer;
     font-size: 18px;
     border: 2px solid #3e1605;
   `;
   const StyledButton3 = styled.button`
    color: #3e1605;
    border: 0;
  `;

    return (
        <Container className='d-flex mx-auto dd'>
            {user.isAdmin ?
            <div className='d-flex'>
            <Col md={7}>
            <Row className='mx-3 mt-5'>
            <h1 className='dd'>Заказы пользователей</h1>
            <div className='d-flex justify-content-end'>
            <StyledButton3 onClick={handleToggleOrders}>{showOrders ? 'Скрыть' : 'Показать'}</StyledButton3></div>
            {showOrders && sortedOrders.map(order =>
                <Card className="bgorder w-100 p-2 mb-3" key={order.id}> 
                <div className= 'd-flex justify-content-between'>
                            <div className='d-flex flex-column'>
                            <h5>Номер заказа: {order.id}</h5>
                            <b>ID покупателя: {order.userId}</b>
                            <p>Номер телефона получателя: {order.phone}</p>
                            <p>Адрес получателя: {order.region} область
                            <br/>г.{order.city} 
                            <br/>ул.{order.street} д.{order.street_num} кв.{order.flat}</p>
                            <p>Комментарий к заказу: {order.comment}</p></div>
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
                            <StyledButton onClick={() =>handleUpdateStatus(order.id)}>Обновить статус заказа</StyledButton>
                            </div></div>
                            </Card>)}</Row></Col>

             <Col md={5}>
            <Row className='mt-5 mx-2'>
            <StyledButton 
            className='mt-2 p-2'
            onClick={() =>setCategoryVisible(true)}
            >Добавить категорию</StyledButton>
            <StyledButton 
            className='mt-2 p-2'
            onClick={() =>setTypeVisible(true)}
            >Добавить тип продукта</StyledButton>
            <StyledButton 
            className='mt-2 p-2'
            onClick={() =>setProductVisible(true)}
            >Добавить товар</StyledButton>
            <StyledButton 
            className='mt-2 p-2'
            onClick={() =>setPromoVisible(true)}
            >Добавить акцию</StyledButton></Row>
            
            <Row className='mt-3 mx-2'>
            <StyledButton2 
            className='mt-2 p-2'
            onClick={() =>setdelCategoryVisible(true)}
            >Удалить категорию</StyledButton2>
            <StyledButton2 
            className='mt-2 p-2'
            onClick={() =>setdelTypeVisible(true)}
            >Удалить тип продукта</StyledButton2>
            <StyledButton2 
            className='mt-2 p-2'
            onClick={() =>setdelProductVisible(true)}
            >Удалить товар</StyledButton2>
            <StyledButton2 
            className='mt-2 p-2'
            onClick={() =>setdelPromoVisible(true)}
            >Удалить акцию</StyledButton2></Row></Col>


            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreatePromo show={promoVisible} onHide={() => setPromoVisible(false)}/>

            <DeleteType show={deltypeVisible} onHide={() => setdelTypeVisible(false)}/>
            <DeleteCategory show={delcategoryVisible} onHide={() => setdelCategoryVisible(false)}/>
            <DeleteProduct show={delproductVisible} onHide={() => setdelProductVisible(false)}/>
            <DeletePromo show={delpromoVisible} onHide={() => setPromoVisible(false)}/>
            {selectedOrder && <UpdateOrdStatus show={statusVisible} onHide={() => setStatusVisible(false)} orderId={selectedOrder} />} </div> :
            <div className='us'>
                <h5>Содержимое недоступно:c</h5>
                <p onClick={() => history(SHOP_ROUTE)}>Вернуться на главную</p></div> }
        </Container>
    );
};

export default Admin;
