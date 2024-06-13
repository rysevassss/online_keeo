const {Category} = require('../database/db_models')
const Error = require('../errors/Error');

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async delete(req, res) {
        const {id} = req.params
        const category = await Category.findByPk(id)
        await category.destroy()
        res.json(category)
    }
}


module.exports = new CategoryController()