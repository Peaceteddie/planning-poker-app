import { WebSocket, WebSocketServer } from 'ws';
import { Message } from './src/app/types/message.interface';
import { User } from './src/app/types/user.class';

const wss = new WebSocketServer({ port: 8080 });
const clients: Map<WebSocket, User> = new Map();

wss.on('connection', (ws: WebSocket) => {
  console.log('New WebSocket connection established');

  ws.on('message', (message: string) => handleMessage(ws, message));

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    const user = clients.get(ws);
    if (user) {
      broadcastMessage({ type: 'removeUser', user });
    }
    clients.delete(ws);
  });
});

function handleMessage(ws: WebSocket, message: string) {
  const msg: Message = JSON.parse(message);

  switch (msg.type) {
    case 'addUser':
      handleAddUser(ws, msg.user!);
      break;

    case 'castVote':
      handleCastVote(msg.user!);
      break;

    case 'removeUser':
      handleRemoveUser(ws);
      break;

    default:
      console.warn(`Unhandled message type: ${msg.type}`);
  }
}



function handleAddUser(ws: WebSocket, user: User) {
  clients.set(ws, user);
  broadcastMessage({ type: 'updateUsers', users: Array.from(clients.values()) });
}

function handleCastVote(user: User) {
  broadcastMessage({ type: 'castVote', user });
}

function handleRemoveUser(ws: WebSocket) {
  clients.delete(ws);
  broadcastMessage({ type: 'updateUsers', users: Array.from(clients.values()) });
}

function broadcastMessage(message: Message) {
  clients.forEach((_, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}