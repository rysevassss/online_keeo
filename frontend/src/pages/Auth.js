import React, {isValidElement, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Breadcrumb, Col, Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import '../styles/auth.scss';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    

    const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({
        mode: 'onBlur',
    })
    
    const click = async (data) => {
        const { email, password } = data;
        try {
            let userData;
            if (isLogin) {
                userData = await login(email, password);
            } else {
                userData = await registration(email, password);
            }
            user.setUser(userData);
            user.setIsAuth(true);
            if (email === "admin@mail.ru"){
                user.setIsAdmin(true)
                localStorage.setItem('isAdmin', true);
            }
            history(SHOP_ROUTE);
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const onSubmit = (data) => {
        click(data);
    };
    
    

    return (
        <Container className='ff be mt-3'>
             <Breadcrumb>
            <Breadcrumb.Item onClick={() => history(SHOP_ROUTE)}> Главная</Breadcrumb.Item>
            {isLogin ? <Breadcrumb.Item active>Вход</Breadcrumb.Item> :
            <Breadcrumb.Item active>Регистрация</Breadcrumb.Item>
            }
            </Breadcrumb>
            <Row className='ca'>
            <Col md={5} className="leftcard">
                <h2>{isLogin ? 'Вход' : "Регистрация"}</h2>
                <Form 
                className="lb d-flex flex-column"
                onSubmit={handleSubmit(onSubmit)}>
                    <label>Email</label>
                    <Form.Control
                        className="form mt-1"
                        type='email'
                        placeholder="example@gmail.com"
                        {...register('email', {
                            required: "Поле не может быть пустым",
                        })} />
                    <div className='form-err'> {errors?.email && <p>{errors?.email?.message }</p>} </div>
                    <label>Пароль</label>
                    <Form.Control
                        type='password'
                        className="form mt-1"
                        placeholder= {isLogin? 'Ваш пароль' : 'Придумайте пароль'}
                        {...register('password', {
                            required: "Поле не может быть пустым",
                            minLength: {value: 5, message: "Минимум 5 символов"}
                        })} />
                        <div className='form-err'> {errors?.password && <p>{errors?.password?.message || "error!"}</p>} </div>
                        <Button
                type='submit' 
                className='stbtn' 
                disabled={!isValid}> {isLogin? 'Войти' : 'Зарегестрироваться'} </Button>

        </Form>
            </Col>
            

            <Col md={5} className="rightcard">
                <h2>{isLogin ? 'Еще не зарегестрированы?' : "Уже зарегестрированы?"}</h2>
                <Form className="lb d-flex flex-column">
                <p>{isLogin ? 'Создайте аккаунт, чтобы:' : "Войдите в аккаунт, чтобы:"}</p>
                <ul>
                    <li>первым узнавать о новых акциях</li>
                    <li>совершать покупки</li>
                    <li>отслеживать заказы</li>
                </ul>
                        {isLogin ? <Button className='regbtn p-2' color="#841584"
                        onClick={() => history(REGISTRATION_ROUTE)}>Зарегестрироваться</Button>
                        :
                        <Button className='regbtn p-2'
                        onClick={() => history(LOGIN_ROUTE)}>Войти</Button>}
        </Form>
            </Col>

            </Row>
        </Container>
    );
});


export default Auth;