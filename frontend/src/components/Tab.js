import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { fetchOneProduct } from '../http/productAPI';
import { useParams } from 'react-router-dom';

function Fill() {
    const [product, setProduct] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
      }, )
  return (
    <Tabs
      defaultActiveKey="desc"
      className="mt-5"
      fill
    >
      <Tab eventKey="desc" 
      title="ХАРАКТЕРИСТИКИ" 
      >
      {product.info.map(info =>
            <Row key={info.id} className='mx-5'>
              {info.title}: {info.description}

            </Row>
          )}
      </Tab>
      <Tab eventKey="sost" 
      title="СОСТАВ"
      className='info'>
      {product.ingredients}
      </Tab>
    </Tabs>
  );
}

export default Fill;