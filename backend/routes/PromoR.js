const Router = require('express')
const router = new Router()
const promoController = require('../controllers/PromoC')
const checkRole = require("../middleware/checkRole");

router.post('/', checkRole('admin'), promoController.create)
router.get('/', promoController.getAll)
router.delete('/:id',checkRole('admin'), promoController.delete)

module.exports = router