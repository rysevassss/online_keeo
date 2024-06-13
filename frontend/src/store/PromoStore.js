import {makeAutoObservable} from "mobx"
export default class PromoStore {
    constructor() {
        this._promos = []
        makeAutoObservable(this)
    }

    setPromos(promos) {
        this._promos = promos
    }
    get promos() {
        return this._promos
    }
}