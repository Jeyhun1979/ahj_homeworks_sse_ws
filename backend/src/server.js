import http from 'http';
import initWS from './ws.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('WebSocket server');
});

initWS(server);

server.listen(PORT);
