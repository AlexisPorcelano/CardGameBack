require('dotenv').config({ path: '../.env' })

const cardModel = require('./models/Card')
const typesModel = require('./models/Types')
const userModel = require('./models/User')

const { Sequelize } = require('sequelize')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

const pg = require('pg')
const { Client } = pg

const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: 'cardgame',
})

const connectClient = async (client) => {
    try {
        const didConnect = await client.connect()
        if (didConnect) {
            console.log(await client.query('SELECT NOW()'))
            await client.end()
        } else {
            throw new Error('did not connect')
        }
    } catch (error) {
        console.log(error.message);
    }

}

connectClient(client)

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

const { Card, Types, User } = sequelize.models

Card.belongsToMany(Types, { through: 'CardXTypes' })
Types.belongsToMany(Card, { through: 'CardXTypes' })
Card.belongsToMany(User, { through: 'CardXUsers' })

module.exports = {
    Card,
    Types,
    User,
    conn: sequelize,
};
