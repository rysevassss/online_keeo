import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TypeBar from '../components/TypeBar';
import CategoryBar from '../components/CategoryBar';
import ProductList from '../components/ProductList';
import Pages from '../components/Pages';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchCategories, fetchTypes, fetchProducts } from '../http/productAPI';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../styles/catalog.scss';


const Catalog = observer(() => {
  const {product} = useContext(Context)
  const history = useNavigate()

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data))
    fetchCategories().then(data => product.setCategories(data))
    fetchProducts(null, null, product.page, product.limit).then(data => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)})
  }, )

  useEffect(() => {
    fetchProducts(product.selectedType.id, product.selectedCategory.id, product.page, product.limit).then(data => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)})
  }, [product.page, product.selectedType, product.selectedCategory])
    return (
      <Container className='ff mt-3'>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => history(SHOP_ROUTE)}> Главная</Breadcrumb.Item>
          <Breadcrumb.Item active>Каталог</Breadcrumb.Item>
        </Breadcrumb>
        <Row>

        <Col md={3}>
          <CategoryBar/>
          <TypeBar/>
        </Col>

        <Col md={9}>
          <ProductList/>
          <Pages/>
        </Col>

        </Row>
        
      </Container>
    );
  })
  
export default Catalog;
