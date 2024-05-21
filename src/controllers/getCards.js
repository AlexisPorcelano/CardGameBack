// const cards = require('../models/index.js')
const cards = [
    {
        "name": "Saboteour M-100",
        "gears": 3,
        "image": "https://www.lightspeedmagazine.com/wp-content/uploads/2014/04/roboninja-575px-close.jpg",
        "health": 2,
        "attack": 1,
        "speed": 2,
        "effect": "Look at your opponents hand"
    },
    {
        "name": "Saboteour F-100",
        "gears": 2,
        "image": "https://image.tensorartassets.com/cdn-cgi/image/anim=true,w=2560,f=jpeg,q=85/posts/images/604909730913117837/1c6456ef-4883-43f0-bd4c-6b7060ddc7f5.jpg",
        "health": 1,
        "attack": 1,
        "speed": 3,
        "effect": "Choose a card for your opponents to discard"
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