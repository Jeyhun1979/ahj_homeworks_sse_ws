import WSClient from './api/ws.js';
import Modal from './components/Modal.js';
import Chat from './components/Chat.js';
import './css/style.css';


const root = document.getElementById('app');

const protocol = location.hostname === 'localhost' ? 'ws' : 'wss';
const host = location.hostname === 'localhost' ? 'localhost:3000' : 'YOUR_RENDER_BACKEND_URL';
const ws = new WSClient(`${protocol}://${host}`);
ws.connect();

let nickname = null;

const renderModal = (error = '') => {
  root.replaceChildren();
  const modal = Modal({
    onSubmit: (nick) => {
      ws.send({ type: 'join', nickname: nick });
    },
    error,
  });
  root.append(modal);
};

const renderChat = () => {
  root.replaceChildren();
  const chat = Chat({ ws, nickname });
  root.append(chat);
};

renderModal();

ws.on('init', (data) => {
  nickname = nickname || data.users.find(u => !u.includes('You')) || nickname;
  renderChat();
});

ws.on('error', (data) => {
  if (data.message === 'nickname_taken') {
    renderModal('Никнейм занят, выберите другой');
  }
});

ws.on('users', (data) => {});
