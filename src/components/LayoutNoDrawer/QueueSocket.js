import { addToQueue, removeQueue } from '../../redux'

export default function SocketHandler(socket, dispatch) {

  socket.onopen = () => {
    console.log('Websocket connected');
  }

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    switch (data.type) {
      case 'QUEUE_CLIENT':
        dispatch(addToQueue(data.payload))
        break;
      case 'ANSWERED':
      case 'CLIENT_UN_ANSWERED':
      case 'DISCONNECTED':
        dispatch(removeQueue(data.roomKey))
      default:
        console.log('---- WebRTC ---- Recieving message failed');
    }
  }

  socket.onclose = (event) => {
    console.log('Websocket closed: ', event);
  }

  socket.onerror = (error) => {
    console.error('Websocket error: ', error);
  }
}