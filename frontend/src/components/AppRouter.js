import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";

const AppRouter = () => {
  const {product, user, promo} = useContext(Context)
  console.log(product)
  console.log(user)
  console.log(promo)
  return (
    <Routes>
       {user.isAuth && authRoutes.map(({ path, Component }) =>
          <Route key={path} path={path} element={<Component/>} exact />
       )}
       {publicRoutes.map(({ path, Component }) =>
          <Route key={path} path={path} element={<Component/>} exact />
       )}
       <Route path="*" element={<Navigate to={SHOP_ROUTE} />}/>
    </Routes>
 );
};

export default AppRouter;