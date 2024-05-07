const { Card, Types } = require('../db.js')

const axios = require('axios')

const getCards = async () => {
    try {
        const response = await axios.get('../cards.json')
        const { data } = response

        const cards = []

        if (data) {
            data.forEach(card => {
                console.log(card);
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getCards
}