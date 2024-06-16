import React from "react";
import { Col, Container, Navbar} from "react-bootstrap";
import whats_icon from '../assets/whatsapp.png';
import inst_icon from '../assets/instagram.png';
import vk_icon from '../assets/vk.png'; 

const Footer = () => {
    const WhatsClick = () => {
        window.open('https://www.whatsapp.com/', '_blank');
    }
    const InstClick = () => {
        window.open('https://www.instagram.com/', '_blank');
    }
    const VkClick = () => {
        window.open('https://vk.com/', '_blank');
    }
    const MailClick = () => {
        window.open('https://mail.ru/', '_blank');
    }
    return (
        <Navbar className="footer">
            <Container>
            <Col md={4} className="contacts">
            <h3>КОНТАКТЫ</h3>
            <p onClick={MailClick}
            className="link">По всем вопросам: support@mail.ru</p>
            <p>Горячая линия: 8-999-888-77-66</p>
            </Col>
            
            <Col md={4} className="dev">
            <p>ВКР<br/>2024</p>
            </Col>
            
            <Col md={4} className="socnet">
            <h3>МЫ В СОЦИАЛЬНЫХ СЕТЯХ</h3>
            <div className="images">
            <button onClick={WhatsClick}><img src={whats_icon} alt=""/></button>
            <button onClick={InstClick}><img src={inst_icon} alt=""/></button>
            <button onClick={VkClick}><img src={vk_icon} alt=""/></button>
            </div>
            </Col>
            </Container>
        </Navbar>
    )
}
export default Footer;