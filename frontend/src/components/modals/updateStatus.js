import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert, Form } from 'react-bootstrap';
import { updateOrderStatus } from '../../http/productAPI'; // Импортируем функцию updateOrderStatus
import styled from 'styled-components';

const UpdateOrdStatus = ({ show, onHide, orderId }) => { // Передаем orderId в компонент

  const [value, setValue] = useState('');

  const updStat = async () => {
    await updateOrderStatus(orderId, value).then(data => {
      onHide();
      alert(`Статус заказа успешно обновлен!`)
      window.location.reload();
    });
  };

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
          Выберите статус заказа
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Control as="select" value={value} onChange={e => setValue(e.target.value)}>
        <option value="1">Создан</option>
        <option value="2">Отправлен</option>
        <option value="3">В пути</option>
        <option value="4">Доставлен</option>
      </Form.Control>

      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={onHide}>Закрыть</StyledButton>
        <StyledButton onClick={updStat}>Обновить</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOrdStatus;