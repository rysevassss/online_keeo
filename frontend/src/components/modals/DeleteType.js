import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { deleteBrand, deleteType } from '../../http/productAPI';
import styled from 'styled-components';
import { Context } from '../..';

const DeleteType =({show, onHide}) => {
  const {product} = useContext(Context)
  const [value, setValue] = useState('')
  
  const removeType = async() => {
    if (value) {
      await deleteType(value).then(data => onHide());
  }};
  
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
            Удалить тип продукта    
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Control as="select" value={value} onChange={e => setValue(e.target.value)}>
            <option value="">Выберите тип продукта</option>
            {product.types.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={onHide}>Закрыть</StyledButton>
        <StyledButton onClick={removeType}>Удалить</StyledButton>
      </Modal.Footer>
    </Modal>
  );
} 
export default DeleteType;