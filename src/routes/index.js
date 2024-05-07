const { Router } = require("express");

const { getCards } = require("../controllers/getCards.js");

const router = Router();

router.get("/cards", getCards);

module.exports = router;
