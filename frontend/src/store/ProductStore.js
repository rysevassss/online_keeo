import {makeAutoObservable} from "mobx"
export default class ProductStore {
    constructor() {
        this._types = []
        this._categories = []
        this._products = []
        this._carts = []
        this._orders = []
        this._selectedType =  {}
        this._selectedCategory =  {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setCategories(categories) {
        this._categories = categories
    }
    setProducts(products) {
        this._products = products
    }
    setCarts(cart){
        this._carts = cart
    }
    setOrders(orders){
        this._orders = orders
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get categories() {
        return this._categories
    }
    get products() {
        return this._products
    }
    get cart() {
        return this._carts
    }
    get order() {
        return this._orders
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}