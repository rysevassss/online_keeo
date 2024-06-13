import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { observer } from 'mobx-react-lite';
import { useNavigate} from 'react-router-dom';
import {SHOP_ROUTE } from '../utils/consts';
import {Image } from 'react-bootstrap';
import a2 from '../assets/2g.jpg';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../styles/about.scss';

const About = observer(() => {
    const history = useNavigate()
    return (
      <Container className='ff mt-3'>
        <Breadcrumb>
            <Breadcrumb.Item onClick={() => history(SHOP_ROUTE)}> Главная</Breadcrumb.Item>
            <Breadcrumb.Item active>О нас</Breadcrumb.Item>

        </Breadcrumb>
         
        <div className='oo'>
        <Image src={a2} alt=""/>
            
            <div className='txt'>
            <h1>О БРЕНДЕ</h1>
            <p>KEEO COSMETICS - это молодой и динамично развивающийся бренд косметики. Мы специализируемся на производстве высококачественной декоративной и уходовой косметики.
                </p>
                <p>
                Главным принципом нашего бренда является объединение красоты и ухода. Команда придает особое внимание выбору натуральных ингредиентов, которые питают кожу, делают волосы блестящими и поддерживают здоровье ногтей. Вся продукция проходит тщательные испытания на безопасность и эффективность, чтобы каждая женщина могла получить результаты, которые она заслуживает.
                </p>
                <p>
               KEEO COSMETICS предлагает широкий ассортимент продукции: от увлажняющих кремов и сывороток до ярких теней и губных помад. Все продукты разрабатываются с любовью и заботой о деталях, чтобы придать вашему образу особый сияющий эффект. Каждый может найти свой идеальный продукт для освежения и поддержания своей неповторимой красоты.</p></div>
               </div>
        </Container>
    )
    }); 
    
export default About;