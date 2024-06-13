const Router = require('express')
const router = new Router()
const CartController = require('../controllers/CartC')
const authMiddleware = require('../middleware/Auth');

router.get('/', authMiddleware, CartController.getCartUser)
router.post('/', authMiddleware, CartController.addToCart)
router.put('/delete', authMiddleware, CartController.deletefromCart)
router.put('/deleteall', authMiddleware, CartController.deleteAllFromCart)

module.exports = router