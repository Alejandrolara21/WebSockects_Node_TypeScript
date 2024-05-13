import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log("User connected");
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    //TODO: Send data to Client
    const payload = JSON.stringify({
        type: 'custom-message',
        payload: data.toString().toUpperCase()
    })

    wss.clients.forEach(function each(client) {
      // * Send All client without itself
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }

      // * Send All client include itself
      // if (client.readyState === WebSocket.OPEN) {
      //   client.send(payload, { binary: false });
      // }
    });
  });

  ws.on('close', () => {
    console.log("User disconnected");
  })
  
});

console.log('Server running on http://localhost:3000');