require('dotenv').config({ path: '../.env' })

const cardModel = require('./models/Card')
const typesModel = require('./models/Types')
const userModel = require('./models/User')
const categoryModel = require('./models/Category')

const { Sequelize } = require('sequelize')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

console.log(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/cardgame`);

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/cardgame`
    ,
    {
        logging: false,
        native: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

cardModel(sequelize)

typesModel(sequelize)

userModel(sequelize)

categoryModel(sequelize)

const { Card, Types, User, Category } = sequelize.models

Card.belongsToMany(Category, { through: 'CardXCategory' })
Category.belongsToMany(Card, { through: 'CardXcategory' })
Types.belongsToMany(Category, { through: 'CategoryXTypes' })
Category.belongsToMany(Types, { through: 'CategoryXTypes' })
Card.belongsToMany(User, { through: 'CardXUsers' })


module.exports = {
    Card,
    Types,
    User,
    Category,
    conn: sequelize,
};
