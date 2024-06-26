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
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addCategory}
        disabled={!isInputValid} >Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;