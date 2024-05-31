const [DEPLOY, BATTLE, DRAW, DESTROY, TURN] = ["DEPLOY", "BATTLE", "DRAW", "DESTROY", "TURN"]

const draw = require('./draw')

const player1 = {
    deck: [],
    device: null,
    Units: { 1: null, 2: null, 3: null },
    hand: [],
    gears: 0,
}

const player2 = {
    deck: [],
    device: null,
    Units: { 1: null, 2: null, 3: null },
    hand: [],
    gears: 0,
}

const gameState = async (req, res) => {
    const { action, payload } = req.body

    switch (action) {
        case DRAW: {
            const updatedPlayer = draw(payload)
            res.status(200).json(updatedPlayer)
            break;
        }
        default: {
            res.status(400).json({ error: "Invalid action" })
            break;
        }
    }
}

module.exports = { player1, player2, gameState }
