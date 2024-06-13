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

  const StyledButton = styled.button`
  color: #3e1605;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  height: 20%;
  width: 15%;
  border: 1px solid #3e1605;
  `;

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
        <StyledButton onClick={onHide}>Закрыть</StyledButton>
        <StyledButton onClick={removeProduct}>Удалить</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProduct;