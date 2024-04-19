// For TypeScript
import { WebSocket, Server } from 'ws';

class ChatWebSocket {
    clients: WebSocket[];
    constructor() {
        this.clients = [];

        console.log('WebSocket server is running on ws://localhost:8080');
        this.initialization();
    }

    initialization() {
        const wss = new WebSocket.Server({ port: 8080 });
        wss.on('connection', ws => {
            console.log('A new client connected!')
            this.clients.push(ws as WebSocket);

            ws.on('message', message => {
                console.log('received: %s', message);
                this.broadcastMessage(message.toString())

            });

            ws.on("close", () => {
                this.clients.splice(this.clients.findIndex((obj) => ws == obj), 1)
            })

            ws.on("error", (er) => {
                console.log(er)
            })
        });
    }

    broadcastMessage(message: string) {
        this.clients.forEach((client, index) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            } else if (client.readyState === WebSocket.CLOSING || client.readyState === WebSocket.CLOSED) {
                client.terminate(); // Ensures the connection is closed if not already
                this.clients.splice(index, 1); // Remove the client from the array
            }
        });
    }
}

const chatWebSocket = new ChatWebSocket()