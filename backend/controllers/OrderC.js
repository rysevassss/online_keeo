const { Order, OrderProduct, CartProduct, Product} = require('../database/db_models')

class OrderController {

    async addOrder(req, res, next) {
        if (!req.user) {
            return res.status(400).send("Пользователь с данным id не найден");
        }
    
        let newOrder = {
            userId: req.user.id,
            phone: req.body.phone,
            name: req.body.name,
            surname: req.body.surname,
            region: req.body.region,
            city: req.body.city,
            street: req.body.street,
            street_num: req.body.street_num,
            flat: req.body.flat,
            comment: req.body.comment,
            totalint: req.body.total
        }
    
        const cart = await CartProduct.findAll({ where: { cartId: req.user.id } });
    
        if (cart.length >= 1) {
            const order = await Order.create(newOrder);
            await Promise.all(cart.map(i =>
                OrderProduct.create({
                    orderId: order.id,
                    productId: i.productId,
                    cartId: i.id
                })
            ));
            await CartProduct.destroy({ where: { cartId: req.user.id } });
    
            return res.status(201).json(order);
        } else {
            return res.status(404).send("Не обнаружено товаров в корзине");
        }
    }

    async getAllOrder(req,res){
        const order = await Order.findAll()
        return res.json(order)
    }

    async getUserOrder(req,res){
        const user = req.user
        const date = await Order.findAll({where: {userId: user.id}} )
        if(!date) res.status(400).json('Пользователь с данным id не найден')
        return res.json(date)
    }

    async updateOrderStatus(req,res) {
        try {
            const { status } = req.body; 
            const {id} = req.params
            const order = await Order.findByPk(id)
    
            if (!order) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }
            order.status = Number(status); 
    
            await order.save();
            res.status(200).json({ message: 'Статус заказа успешно обновлен', order: order });
        } catch (error) {
            res.status(500).json({ message: 'Произошла ошибка при обновлении статуса заказа', error: error.message });
        }
    }
    async getUserOrderList(req,res){
        const {id} = req.params
        const data = await Order.findOne( {where: {id: id}})
        const order =  await OrderProduct.findAll({include: {
                model: Product
            }, where: {orderId: id}});
        return res.json(order)
    }
}
module.exports = new OrderController()

