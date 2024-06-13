const Router = require('express')
const router = new Router()

const product = require('./ProductR')
const user = require('./UserR')
const category = require('./CategoryR')
const type = require('./TypeR')
const cart = require('./CartR')
const order = require('./OrderR')
const promo = require('./PromoR')

router.use('/user', user)
router.use('/type', type)
router.use('/category', category)
router.use('/product', product)
router.use('/cart', cart)
router.use('/order', order)
router.use('/promo', promo)

module.exports = router