import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { deleteCategory } from '../../http/productAPI';
import styled from 'styled-components';
import { Context } from '../..';

const DeleteCategory = ({show, onHide}) => {
  const {product} = useContext(Context)
  const [value, setValue] = useState('')
  
  const removeCategory = async() => {
    if (value) {
      await deleteCategory(value).then(data => onHide());
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
            Удалить категорию     
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Control as="select" value={value} onChange={e => setValue(e.target.value)}>
            <option value="">Выберите категорию</option>
            {product.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={onHide}>Закрыть</StyledButton>
        <StyledButton onClick={removeCategory}>Удалить</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategory;