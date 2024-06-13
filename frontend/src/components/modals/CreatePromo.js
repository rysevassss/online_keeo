import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Dropdown, Form } from 'react-bootstrap';
import  { Context } from '../../index';
import { Row } from 'react-bootstrap';
import { fetchPromos, createPromo } from '../../http/promoAPI';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const CreatePromo = observer(({show, onHide}) => {
    const {promo} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
      }

      const addPromo = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('start', start)
        formData.append('end', end)
        formData.append('img', file)
        createPromo(formData).then(data => onHide())
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
                Добавить акцию     
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Control className='mt-2'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Название'
                />
                <Form.Control className='mt-2'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder='Описание'
                />
                <Form.Control className='mt-2'
                    value={start}
                    type="date"
                    onChange={e => setStart(e.target.value)}
                    placeholder='Начало проведения'
                />
                <Form.Control className='mt-2'
                    value={end}
                    type="date"
                    onChange={e => setEnd(e.target.value)}
                    placeholder='Конец проведения'
                />
                 <Form.Control className='mt-2'
                    type="file"
                    onChange={selectFile}
                />
                </Form>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={onHide}>Закрыть</StyledButton>
        <StyledButton onClick={addPromo}>Добавить</StyledButton>
      </Modal.Footer>
    </Modal>
  );
});

export default CreatePromo;