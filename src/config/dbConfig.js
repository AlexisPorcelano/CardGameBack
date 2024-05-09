const { Sequelize } = require('sequelize')

require('dotenv').config({ path: '../../.env' })

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

module.exports = {
    HOST: DB_HOST,
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    DB: 'cardgame',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}



