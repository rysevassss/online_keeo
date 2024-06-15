import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import {createType} from '../../http/productAPI';


const CreateType = ({show, onHide}) => {

  const [value, setValue] = useState('')
  
  const addType = () => {
    createType({name: value}).then(data => {
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
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Добавить тип продукта     
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
        <Button variant="outline-success" 
        disabled={!isInputValid} 
        onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;