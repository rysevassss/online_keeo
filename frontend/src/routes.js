import Admin from "./pages/Admin"
import Cart from "./pages/Cart"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import ProductPage from "./pages/ProductPage"
import Catalog from "./pages/Catalog"
import Account from "./pages/Account"
import Promo from "./pages/Promo"
import { ADMIN_ROUTE, CART_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CATALOG_ROUTE, ACCOUNT_ROUTE, PROMO_ROUTE, ABOUT_ROUTE } from "./utils/consts"
import About from "./pages/About"

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: PROMO_ROUTE,
        Component: Promo
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    }
]
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    }

]
