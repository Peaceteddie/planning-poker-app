const { createServer } = require('http');
const { WebSocketServer } = require('ws');

const server = createServer();
const wss = new WebSocketServer({ server });

let lastMessage = null;
let webSocket = null;

wss.on('connection', (ws) => {
    console.log('New WebSocket connection established.');

    ws.on('message', console.log);

    ws.on('close', console.log);

    webSocket = ws;
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
