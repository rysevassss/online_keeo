const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/ProductC')
const checkRole = require('../middleware/CheckRole');


router.post('/', checkRole('admin'), ProductController.create)
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.delete('/:id',checkRole('admin'), ProductController.delete)

module.exports = router