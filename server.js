const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', socket => {
    console.log('New connection established');

    socket.on('message', message => {
        console.log('Message received:', message);
        
        // Broadcast the message to all other clients
        wss.clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Connection closed');
    });
});

console.log('WebSocket server is running on ws://213.200.31.17:8080');
