require('dotenv').config({ path: '../.env' })

const fs = require('fs');
const path = require('path');

const { Sequelize } = require('sequelize')

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/cardgame`,
    {
        logging: false,
        native: false,
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });


let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Card, Types, User} = sequelize.models

Card.belongsToMany(Types, {trought: 'CardXTypes'})
Types.belongsToMany(Card, {trought: 'CardXTypes'})
Card.belongsToMany(User, {trought: 'CardXUsers'})

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};
