export default class WSClient {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.listeners = {};
  }

  on(type, callback) {
    this.listeners[type] = callback;
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }

  connect() {
    this.ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.listeners[data.type]?.(data);
    });
  }
}
