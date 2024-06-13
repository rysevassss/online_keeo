import React, { useContext, useEffect} from 'react';
import Container from 'react-bootstrap/esm/Container';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import {fetchPromos } from '../http/promoAPI';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { Image } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../styles/promo.scss';

const Promo = observer(() => {
  const {promo} = useContext(Context)
  const history = useNavigate()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    return formattedDate;}


  useEffect(() => {
    fetchPromos().then(data => promo.setPromos(data))
  }, [promo])
    return (
      <Container className='ff mt-3'>
        <Breadcrumb>
            <Breadcrumb.Item onClick={() => history(SHOP_ROUTE)}> Главная</Breadcrumb.Item>
            <Breadcrumb.Item active>Акции</Breadcrumb.Item>
        </Breadcrumb>
        {promo.promos.map(promo =>
        <div className='ackc d-flex p-2 mt-3'>
        <div className='promoimg'>
        <Image src={process.env.REACT_APP_API_URL + promo.img}/>
        </div>
        <div className='infopromo mx-5'>
        <div className='txtpromo'>
        <h3>{promo.name}</h3>
        <p>{promo.description}</p></div>
        <div className='datepromo'>
        <p>Срок проведения акции:</p>
        <b>{formatDate(promo.start)} - {formatDate(promo.end)}</b></div>
        </div></div>
        )}
        </Container>
    );
    }); 
export default Promo;
