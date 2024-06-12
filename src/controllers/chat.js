// Mantenemos una lista de todas las conexiones WebSocket activas
const activeConnections = [];

module.exports.chat = (ws, req) => {
    // Agregamos la conexión WebSocket actual a la lista de conexiones activas
    activeConnections.push(ws);

    console.log('NUEVA CONEXION: ', activeConnections[0]);

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
