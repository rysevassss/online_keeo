import React, { useContext } from "react";
import {observer} from 'mobx-react-lite';
import {Context} from '../index'; 
import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from "react-bootstrap";
import styled from "styled-components";

const TypeBar = observer(() => {
    const {product} = useContext(Context)
    const AllTypes = {}
    const clearType = () => {
        product.setSelectedType(AllTypes); // Устанавливаем начальное состояние категории
    };
    const StyledButton2 = styled.button`
    border: 0;
    font-size: 13px;
  `;
    return (
        <Container className="types">
        <h2>ТИП ПРОДУКТА</h2>
        <div className='d-flex justify-content-end'>
        <StyledButton2 onClick={clearType}>Очистить</StyledButton2></div>
            {product.types.map(type =>
                <ListGroup.Item 
                className="names"
                style={{fontWeight: type.id === product.selectedType.id ? 'bold' : 'lighter'}}
                active={type.id === product.selectedType.id}
                onClick={() => product.setSelectedType(type)}
                key = {type.id}>
                 {type.name}
                </ListGroup.Item>
            )}
        </Container>
    );
});

export default TypeBar;