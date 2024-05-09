const dbConfig = require('../config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize')

const database = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected');
    })
    .catch(err => console.log('error ', err))

const db = {}

db.Sequelize = Sequelize

db.sequelize = database

db.Card = require('./Card.js')(sequelize, DataTypes)
db.Types = require('./Types.js')(sequelize, DataTypes)
db.User = require('./User.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => console.log('synched'))

module.exports = db