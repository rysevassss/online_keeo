const {Type} = require('../database/db_models')
const Error = require('../errors/Error');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async delete(req, res) {
        const {id} = req.params
        const type = await Type.findByPk(id)
        await type.destroy()
        res.json(type)
    }

}

module.exports = new TypeController()