import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { CATALOG_ROUTE } from '../utils/consts';
  
function Slider() {
  const history = useNavigate();
return (
    <Carousel>
      
      <Carousel.Item onClick={() => history(CATALOG_ROUTE)}
    style={{cursor:'pointer'}}>
      <img src={process.env.PUBLIC_URL + '/images/slide1.png'} alt="Изображение" />
      </Carousel.Item>
      
      <Carousel.Item onClick={() => history(CATALOG_ROUTE)}
    style={{cursor:'pointer'}}>
      <img src={process.env.PUBLIC_URL + '/images/slide2.png'} alt="Изображение" />
      </Carousel.Item>
      
      <Carousel.Item onClick={() => history(CATALOG_ROUTE)}
    style={{cursor:'pointer'}}>
      <img src={process.env.PUBLIC_URL + '/images/slide3.png'} alt="Изображение" />
      </Carousel.Item>
    
    </Carousel>
  );
}

export default Slider;