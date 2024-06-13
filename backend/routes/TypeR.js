const Router = require('express')
const router = new Router()
const typeController = require('../controllers/TypeC')
const checkRole = require('../middleware/CheckRole')

router.post('/', checkRole('admin'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', checkRole('admin'), typeController.delete)

module.exports = router