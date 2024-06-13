import React, { useContext } from "react";
import {observer} from 'mobx-react-lite';
import {Context} from '../index'; 
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Button, Container, ListGroup} from "react-bootstrap";
import styled from "styled-components";



const CategoryBar = observer(() => {
    const {product} = useContext(Context)
    const AllCategory = {} 
    const clearCategory = () => {
        product.setSelectedCategory(AllCategory); // Устанавливаем начальное состояние категории
    };
    const StyledButton2 = styled.button`
    border: 0;
    font-size: 13px;
  `;

    return (
        <Container className="types">
            <h2>КАТЕГОРИИ</h2>
        <div className='d-flex justify-content-end'>
        <StyledButton2 onClick={clearCategory}>Очистить</StyledButton2></div>
        {product.categories.map(category =>
        <ListGroup.Item 
        className="names"
        style={{fontWeight: category.id === product.selectedCategory.id ? 'bold' : 'lighter'}}
        active={category.id === product.selectedCategory.id}
        onClick={() => product.setSelectedCategory(category)}
        key = {category.id}>
         {category.name}
        </ListGroup.Item>
     )}
        </Container>    
        
    );
});

export default CategoryBar;