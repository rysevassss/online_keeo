const { Product, CartProduct} = require('../database/db_models')

class CartController {

    async addToCart(req, res, next){
        const user = req.user
        const {productId} = req.body
        const cart = await CartProduct.create({cartId : user.id, productId : productId})
        return res.json(cart)
    }

    async getCartUser(req,res){
        const {id} = req.user
        const cart = await CartProduct.findAll({include: {
                model: Product
            }, where: {cartId: id}})
        if(!cart) res.status(400).json('None Id')
        return res.json(cart)
    }

    async deletefromCart (req, res) {
        const {id} = req.body
        if(!id) res.status(400).json('None Id')
            await CartProduct.destroy({where: {id: id}})
        res.status(200).json('Product deleted')
    }
    async deleteAllFromCart (req, res) {
        const {id} = req.user
        const cart = await CartProduct.destroy({include: {
                model: Product
            }, where: {cartId: id}})
        if(!cart) res.status(400).json('None Id')
        return res.json(cart)
    }
}

module.exports = new CartController()