const { player1, player2 } = require('./gamestateIndex')

const draw = (payload) => {

    console.log('action draw');

    let { player, quantity } = payload

    console.log(player);

    let addToHand = []

    while (quantity > 0) {
        const card = player.deck.pop()
        console.log('added to hand: ', card.name);
        addToHand.push(card)
        quantity--
    }

    console.log(`cards added to the hand of ${player}: ${addToHand}`);

    return{
        ...player,
        hand: [...hand, addToHand]
    }
}


module.exports = draw