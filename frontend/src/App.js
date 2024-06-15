import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import Footer from './components/Footer';


const App = observer(() => {
  const {user, product, promo} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(()=> {
      if (!localStorage.getItem('token')) {
      user.setIsAuth(false); // Устанавливаем isAuth в false, если токен отсутствует
      setLoading(false);
      return;
      }

    check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])
  }, )

  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
      <BrowserRouter>
        <Header />
        <NavBar/>
        <AppRouter />
        <Footer/>
      </BrowserRouter>
      
      
  );
});

export default App;
