const Router = require('express')
const router = new Router()
const orderController = require('../controllers/OrderC')
const authMiddleware = require('../middleware/Auth');
const checkRole = require('../middleware/CheckRole');

router.post('/', authMiddleware, orderController.addOrder)
router.get('/', authMiddleware, orderController.getAllOrder)
router.get('/user', authMiddleware, orderController.getUserOrder)
router.put('/:id', authMiddleware, checkRole('admin'), orderController.updateOrderStatus)
router.get('/:id', orderController.getUserOrderList)

module.exports = router