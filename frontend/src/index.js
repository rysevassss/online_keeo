import React, { createContext } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import PromoStore from './store/PromoStore';

export const Context = createContext(null)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript
root.render(
    <Context.Provider value={{
      user: new UserStore(),
      product: new ProductStore(),
      promo: new PromoStore(),
    }}>
        <App />
    </Context.Provider>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
