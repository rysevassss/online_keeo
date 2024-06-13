const sequelize = require('./db')
const {Sequelize, DataTypes} = require('sequelize')


//Создание моделей таблиц 

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "user"},
})
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, allowNull: false},
    region: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    street: {type: DataTypes.STRING, allowNull: false},
    street_num: {type: DataTypes.INTEGER, allowNull: false},
    flat: {type: DataTypes.STRING},
    comment: {type: DataTypes.TEXT},
    created: {type: DataTypes.DATE, defaultValue: Sequelize.NOW},
    status:{type: DataTypes.INTEGER, defaultValue: 1},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    total: {type: DataTypes.STRING},
    totalint: {type: DataTypes.INTEGER},
})
const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const CartProduct = sequelize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    ingredients: {type: DataTypes.TEXT},
    description: {type: DataTypes.TEXT},
    img: {type: DataTypes.STRING, allowNull: false},
})
const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const CategoryType = sequelize.define('category_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Promo = sequelize.define('promo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    start: {type: DataTypes.DATE},
    end: {type: DataTypes.DATE},
    img: {type: DataTypes.STRING, allowNull: false},
})

//Описание связей таблиц

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

Type.hasMany(Product)
Product.belongsTo(Type)

Category.belongsToMany(Type, {through: CategoryType })
Type.belongsToMany(Category, {through: CategoryType })

module.exports = {
    User, Order, OrderProduct, Cart, CartProduct, Product, ProductInfo, Category, Type, CategoryType, Promo
}