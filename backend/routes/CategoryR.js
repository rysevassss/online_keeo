const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/CategoryC')
const checkRole = require('../middleware/CheckRole');

router.post('/', checkRole('admin'), CategoryController.create)
router.get('/', CategoryController.getAll)
router.delete('/:id', checkRole('admin'), CategoryController.delete)

module.exports = router