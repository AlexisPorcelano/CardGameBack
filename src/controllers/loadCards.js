const cards = [
    {
        "name": "Saboteour M-100",
        "category" : "Unit",
        "gears": 3,
        "image": "https://www.lightspeedmagazine.com/wp-content/uploads/2014/04/roboninja-575px-close.jpg",
        "health": 2,
        "attack": 1,
        "speed": 2,
        "effect": "Look at your opponents hand",
        "unitType": "Stealth"
    },
    {
        "name": "Saboteour F-100",
        "category" : "Unit",
        "gears": 2,
        "image": "https://image.tensorartassets.com/cdn-cgi/image/anim=true,w=2560,f=jpeg,q=85/posts/images/604909730913117837/1c6456ef-4883-43f0-bd4c-6b7060ddc7f5.jpg",
        "health": 1,
        "attack": 1,
        "speed": 3,
        "effect": "Choose a card for your opponents to discard",
        "unitType": "Stealth"
    }
]

const { Card } = require('../db')

const createCards = async ({ name, gears, image, health, attack, speed, effect, unitType }) => {
    try {
        await Card.create({
            name: name,
            gears: gears,
            image: image,
            health: health,
            attack: attack,
            speed: speed,
            effect: effect,
        })
        console.log(`Card ${name} created successfully.`);
    } catch (error) {
        console.error(`Failed to create card ${name}: ${error.message}`);
    }
}

const getCards = async (req, res) => {
    try {
        console.log("Received the request");

        for (const card of cards) {
            await createCards(card);
        }

        const dbCards = await Card.findAll();

        res.status(200).json(dbCards)
    } catch (error) {
        console.error(`Error in getCards: ${error.message}`);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCards
