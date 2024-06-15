import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {addOrder, addToCart, deleteCart} from "../../http/productAPI";
import {observer} from "mobx-react-lite";
import { useForm } from 'react-hook-form';

const CreateOrder = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const {register, formState: {errors, isValid}, handleSubmit} = useForm({
        mode: 'onBlur',
    })
    const id = user.isUser;

    

    const onSubmit = (data) => {
        try {
            addOrder(id, data.phone, data.name, data.surname, data.region, data.city, data.street, data.street_num, data.flat, data.comment)
            .then(() => {
                alert('Заказ был успешно оформлен!');
                deleteCart();
                onHide();

            })
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        ><Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оформление заказа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>               
                <label>Имя получателя</label>
                <Form.Control
                        type='text'
                        className="mt-1 mb-2"
                        placeholder="Иван"
                        {...register('name', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                 <div className='form-err'> {errors?.name && <p>{errors?.name?.message }</p>} </div>
                    <label>Фамилия получателя</label>
                    <Form.Control
                        type='text'
                        className="mt-1 mb-2"
                        placeholder="Иванов"
                        {...register('surname', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                 <div className='form-err'> {errors?.surname && <p>{errors?.surname?.message }</p>} </div>
                    
           
                    <label>Номер телефона</label>
                    <Form.Control
                        type='tel'
                        className="mt-1 mb-2"
                        placeholder="7-999-888-77-66"
                        {...register('phone', {
                            required: 'Поле обязательно к заполнению',
                            pattern: {
                                value: /^(7|8)\d{10}$/, 
                                message: 'Некорректный формат номера телефона'
                            }
                        })}
                    />
                    <div className='form-err'> {errors?.phone && <p>{errors?.phone?.message }</p>} </div>
                    <hr/>
                    <label>Область</label>
                    <Form.Control
                        type='text'
                        className="mt-1 mb-2"
                        placeholder="Новосибирская"
                        {...register('region', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                    <div className='form-err'> {errors?.region && <p>{errors?.region?.message }</p>} </div>
                    <label>Город</label>
                    <Form.Control
                        type='text'
                        className="mt-1 mb-2"
                        placeholder="Новосибирск"
                        {...register('city', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                    <div className='form-err'> {errors?.city && <p>{errors?.city?.message }</p>} </div>
                    <label>Улица</label>
                    <Form.Control
                        type='text'
                        className="mt-1 mb-2"
                        placeholder="Танковая"
                        {...register('street', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                    <div className='form-err'> {errors?.street && <p>{errors?.street?.message }</p>} </div>
                    <label>Номер дома</label>
                    <Form.Control
                        type='number'
                        className="mt-1 mb-2"
                        placeholder="115"
                        {...register('street_num', {
                            required: 'Поле обязательно к заполнению',
                            validate: value => (parseInt(value) > 0 ? true : 'Неккоретные данные'),
                        })}
                    />
                    <div className='form-err'> {errors?.street_num && <p>{errors?.street_num?.message }</p>} </div>
                    <label>Квартира</label>
                    <Form.Control
                        type='number'
                        className="mt-1 mb-2"
                        placeholder="33"
                        {...register('flat', {
                            validate: value => {
                                if(value !== "") {
                                return parseInt(value) > 0 ? true : 'Некорректные данные';
                                }
                                return true;
                                }
                                })}
                    />
                    <div className='form-err'> {errors?.flat && <p>{errors?.flat?.message }</p>} </div>
                    <label>Комментарий к заказу</label>
                    <Form.Control
                        type='text'
                        className="mt-1 mb-2"
                        placeholder="Что учесть при доставке"
                        {...register('comment')}
                    />
            </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button 
                type='submit'  
                disabled={!isValid}
                variant="outline-success">Отправить</Button>
        </Modal.Footer> </Form>
    </Modal>
    );
});

export default CreateOrder;

