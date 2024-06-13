import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { createCategory} from '../../http/productAPI';
import styled from 'styled-components';

const CreateCategory = ({show, onHide}) => {

  const [value, setValue] = useState('')
  
  const addCategory = () => {
    createCategory({name: value}).then(data => {
        setValue('')
        onHide()
    })
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
            Добавить категорию     
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
           value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Введите название"}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={onHide}>Закрыть</StyledButton>
        <StyledButton onClick={addCategory}>Добавить</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;