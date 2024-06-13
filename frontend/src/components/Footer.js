import React from "react";
import { Col, Container, Navbar} from "react-bootstrap";
import whats_icon from '../assets/whatsapp.png';
import inst_icon from '../assets/instagram.png';
import vk_icon from '../assets/vk.png'; 

const Footer = () => {
    return (
        <Navbar className="footer">
            <Container>
            <Col md={4} className="contacts">
            <h3>КОНТАКТЫ</h3>
            <p>По всем вопросам: support@mail.ru<br/>
            Горячая линия: 8-999-888-77-66</p>
            </Col>
            
            <Col md={4} className="dev">
            <p>разработала софи<br/>2024</p>
            </Col>
            
            <Col md={4} className="socnet">
            <h3>МЫ В СОЦИАЛЬНЫХ СЕТЯХ</h3>
            <div className="images">
            <button><img src={whats_icon} alt=""/></button>
            <button><img src={inst_icon} alt=""/></button>
            <button><img src={vk_icon} alt=""/></button>
            </div>
            </Col>
            </Container>
        </Navbar>
    )
}
export default Footer;