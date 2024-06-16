import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { Context } from '../..';
import { deletePromo } from '../../http/promoAPI';

const DeletePromo = ({show, onHide}) => {
  const {promo} = useContext(Context)
  const [value, setValue] = useState('')
  
  const removePromo = async() => {
    if (value) {
      await deletePromo(value);
      onHide();
  }};

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
            Удалить акцию  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Control as="select" value={value} onChange={e => setValue(e.target.value)}>
            <option value="">Выберите акцию</option>
            {promo.promos.map(promo => (
              <option key={promo.id} value={promo.id}>
                {promo.name}
              </option>
            ))}
          </Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={removePromo}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePromo;