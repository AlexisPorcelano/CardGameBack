// const cards = require('../models/index.js')
const cards = [
    {
        "name": "Saboteour M-100",
        "gears": 3,
        "image": "https://res.cloudinary.com/dgwlnomwg/image/upload/v1705600621/nxy1zaukhas62v10x41u.jpg",
        "health": 2,
        "attack": 1,
        "speed": 2
    },
    {
        "name": "Saboteour F-100",
        "gears": 2,
        "image": "https://res.cloudinary.com/dgwlnomwg/image/upload/v1705600621/nxy1zaukhas62v10x41u.jpg",
        "health": 1,
        "attack": 1,
        "speed": 3
    }
]

const getCards = (req, res) => {
    try {
        console.log("recibimos la peticion");
        res.status(200).json(cards)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCards