import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { deleteCategory, deleteProduct } from '../../http/productAPI';
import styled from 'styled-components';

const DeleteProduct = ({show, onHide}) => {

  const [value, setValue] = useState('')
  
  const removeProduct = async() => {
    await deleteProduct(value);
  }
  const isInputValid = value.trim() !== '';
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className='ff'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Удалить продукт     
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
           value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Введите id товара"}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" 
        disabled={!isInputValid}
        onClick={removeProduct}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProduct;