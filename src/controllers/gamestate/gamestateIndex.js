// const [DEPLOY, BATTLE, DRAW, DESTROY, TURN] = ["DEPLOY", "BATTLE", "DRAW", "DESTROY", "TURN"]

// const draw = require('./draw')

// const player1 = {
//     deck: [],
//     device: null,
//     Units: { 1: null, 2: null, 3: null },
//     hand: [],
//     gears: 0,
// }

// const player2 = {
//     deck: [],
//     device: null,
//     Units: { 1: null, 2: null, 3: null },
//     hand: [],
//     gears: 0,
// }

// const gameState = async (req, res) => {
//     const { action, payload } = req.body

//     switch (action) {
//         case DRAW: {
//             const updatedPlayer = draw(payload)
//             res.status(200).json(updatedPlayer)
//             break;
//         }
//         default: {
//             res.status(400).json({ error: "Invalid action" })
//             break;
//         }
//     }
// }

// module.exports = { player1, player2, gameState }

const activeConnections = [];

const gameState = (ws, req) => {
    // Agregamos la conexión WebSocket actual a la lista de conexiones activas
    activeConnections.push(ws);

    console.log(activeConnections[0]);

    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg);
            console.log('Message received: ', data);

            // Enviamos el mensaje recibido a todas las conexiones activas
            activeConnections.forEach(connection => {
                connection.send(JSON.stringify({ player: data.player, content: data.content }));
            });
        } catch (error) {
            console.error('Error parsing message:', error);
            ws.send(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');

        // Removemos la conexión WebSocket que se ha cerrado de la lista de conexiones activas
        const index = activeConnections.indexOf(ws);
        if (index > -1) {
            activeConnections.splice(index, 1);
        }
    });
};

module.exports = { gameState }
