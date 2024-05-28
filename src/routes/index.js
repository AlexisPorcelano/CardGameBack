const { Router } = require("express");

const getCards = require("../controllers/loadCards.js");

const { chat, getChats } = require("../controllers/chat.js");

const getTypes = require("../controllers/loadTypes.js");
const { getCategories } = require("../controllers/loadCategories.js");

const router = Router();

router.get("/cards", getCards);

router.get("/chat", getChats)

router.post("/chat", chat)

router.get("/types", getTypes)

router.get("/categories", getCategories)

module.exports = router;
