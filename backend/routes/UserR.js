const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserC')
const authMiddleware = require('../middleware/Auth')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router