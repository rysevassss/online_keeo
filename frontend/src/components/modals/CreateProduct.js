import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Dropdown, Form } from 'react-bootstrap';
import  { Context } from '../../index';
import { Row } from 'react-bootstrap';
import { fetchTypes, fetchCategories, createProduct, fetchProducts } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';


const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [ingredients, setIngredients] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
      fetchCategories().then(data => product.setCategories(data))
      fetchTypes().then(data => product.setTypes(data))
  }, [])

    const addInfo = () => {
      setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
      setInfo(info.filter(i => i.number !== number))
    }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

const addProduct = () => {
  if(name && price && description && ingredients && file && product.selectedType && product.selectedCategory && info.length > 0) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('ingredients', ingredients)
    formData.append('description', description)
    formData.append('typeId', product.selectedType.id)
    formData.append('categoryId', product.selectedCategory.id)
    formData.append('info', JSON.stringify(info))
    
    createProduct(formData).then(data => onHide())
} else {alert(`Не все поля заполнены!`)}}


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Добавить новое устройство     
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

        <Dropdown className='mt-2'>
                <Dropdown.Toggle>{product.selectedCategory.name || 'Выберите категорию'}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {product.categories.map(category => 
                        <Dropdown.Item 
                        onClick={() => product.setSelectedCategory(category)} 
                        key={category.id}>
                        {category.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{product.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {product.types.map(type => 
                        <Dropdown.Item 
                        onClick={() => product.setSelectedType(type)} 
                        key={type.id}>
                        {type.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>


            <Form.Control className='mt-2'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Введите название продукта'
            />
             <Form.Control className='mt-2'
                placeholder='Введите стоимость'
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                type="number"
            />
            <Form.Control className='mt-2'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Описание'
            />
            <Form.Control className='mt-2'
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                placeholder='Состав'
            />
             <Form.Control className='mt-2'
                type="file"
                onChange={selectFile}
            />
            <hr/>
            <Button variant='outline-dark'
            onClick={addInfo}>Добавить новое свойство</Button>
            {
              info.map(i =>
                <Row key={i.number}>
                    <Col md={4} className='mt-2'>
                      <Form.Control
                        value={i.title}
                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                        placeholder='Название характеристики'
                      />
                    </Col>
                    <Col md={4} className='mt-2'>
                      <Form.Control
                        value={i.description}
                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                        placeholder='Описание характеристики'
                      />
                    </Col>
                    <Col md={4} className='mt-2'>
                      <Button variant='outline-danger'
                      onClick={() => removeInfo(i.number)}>Удалить</Button>
                    </Col>
                </Row>
            )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;