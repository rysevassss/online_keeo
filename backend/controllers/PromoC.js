const uuid = require('uuid')
const path = require('path');
const {Promo} = require('../database/db_models');
const Error = require('../errors/Error');

class PromoController {
    async create(req, res, next) {
        try {
            let {name, description, start, end} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const promo = await Promo.create({name, description, start, end, img: fileName});
            return res.json(promo)
        } catch (e) {
            next(Error.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const promos = await Promo.findAll()
        return res.json(promos)
    }
    async delete(req, res) {
        const {id} = req.params
        const promo = await Promo.findByPk(id)
        await promo.destroy()
        res.json(promo)
    }
}

module.exports = new PromoController()