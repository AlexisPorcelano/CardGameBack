const { Router } = require("express");

const getCards = require("../controllers/getCards.js");

const chat = require("../controllers/chat.js")

const router = Router();

router.get("/cards", getCards);

router.get("/chat", chat)

router.post("/chat", chat)

module.exports = router;
