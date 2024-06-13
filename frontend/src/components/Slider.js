import Carousel from 'react-bootstrap/Carousel';
  
function Slider() {
return (
    <Carousel>
      
      <Carousel.Item>
      <img src={process.env.PUBLIC_URL + '/images/slide1.png'} alt="Изображение" />
      </Carousel.Item>
      
      <Carousel.Item>
      <img src={process.env.PUBLIC_URL + '/images/slide2.png'} alt="Изображение" />
      </Carousel.Item>
      
      <Carousel.Item>
      <img src={process.env.PUBLIC_URL + '/images/slide3.png'} alt="Изображение" />
      </Carousel.Item>
    
    </Carousel>
  );
}

export default Slider;