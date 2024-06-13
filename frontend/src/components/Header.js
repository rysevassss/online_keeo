import React, {useContext} from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Card, Container} from "react-bootstrap";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import account_icon from '../assets/lk.png';
import cart_icon from '../assets/korz.png';
import styled from 'styled-components';


const Header = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    const isAdminStored = localStorage.getItem('isAdmin') === 'true';
    if (isAdminStored) {
    user.setIsAdmin(true);
}

    const StyledButton = styled.button`
     color: #fdf6f0;
     background-color: #3e1605;
     border-radius: 10px;
     cursor: pointer;
     font-size: 16px;
     height: 50px;
     width: 50%;
     font-weight: bold;
     align-items: center;
   `;

    return (
        <Navbar className='header'>
            <Container className='nav'>
            <label 
                onClick={() => history(SHOP_ROUTE)}>
                KEEO<br/>COSMETICS
            </label>
            {user.isAuth ? 
                    <Nav>
                        {user.isAdmin ?
                        <StyledButton
                            onClick={() => history(ADMIN_ROUTE)}>
                            А
                        </StyledButton> : <div></div> }
                        <button
                        className='mx-3'
                            onClick={() => history(CART_ROUTE)}>
                            <img src={cart_icon} alt=""/>
                        </button> 

                        <button
                        onClick={() => history(ACCOUNT_ROUTE)}>
                            <img src={account_icon} alt=""/>
                        </button>
                    </Nav>
                    :
                    <button
                    onClick={() => history(LOGIN_ROUTE)}>
                        <img src={account_icon} alt=""/>
                    </button>
                }          
                </Container>
       </Navbar>
    );
});

export default Header;