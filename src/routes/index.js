const { Router } = require('express');

const getCards = require("../controllers/loadCards.js");
const { chat } = require("../controllers/chat.js");
const getTypes = require("../controllers/loadTypes.js");
const { getCategories } = require("../controllers/loadCategories.js");

const gameState = require('../controllers/gamestate/gamestateIndex.js')

const router = Router();

module.exports = (app, expressWs) => {
    router.get("/cards", getCards);
    router.get("/types", getTypes);
    router.get("/categories", getCategories);

    // Web Socket route
    app.ws('/chat', chat);

    app.ws('/game', gameState)

    app.use('/', router);
};
