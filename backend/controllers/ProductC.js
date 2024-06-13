const uuid = require('uuid')
const path = require('path');
const {Product, ProductInfo} = require('../database/db_models')
const Error = require('../errors/Error');

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, ingredients, description, categoryId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, ingredients, description, categoryId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e) {
            next(Error.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {categoryId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 30
        let offset = page * limit - limit
        let products;
        if (!categoryId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (categoryId && !typeId) {
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }
        if (!categoryId && typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (categoryId && typeId) {
            products = await Product.findAndCountAll({where:{typeId, categoryId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }

    async delete(req, res) {
        const {id} = req.params
        const product = await Product.findByPk(id)
        await product.destroy()
        res.json(product)
    }
}

module.exports = new ProductController()