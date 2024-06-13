import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {ABOUT_ROUTE, CATALOG_ROUTE, PROMO_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const history = useNavigate()
    return (
        <Navbar className='menu'>
            <ul>
                <li
                className='left'
                onClick={() => history(ABOUT_ROUTE)}>
                О НАС
                </li>
                
                <li
                className='center'
                onClick={() => history(CATALOG_ROUTE)}>
                <h2>КАТАЛОГ</h2>
                </li>
                
                <li
                className='right'
                onClick={() => history(PROMO_ROUTE)}>
                АКЦИИ
                </li>
            </ul>
        </Navbar>
    );
});

export default NavBar;