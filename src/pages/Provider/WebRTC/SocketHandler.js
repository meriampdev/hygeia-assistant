import { TYPE_CONNECTION, TYPE_OFFER, TYPE_ANSWER, TYPE_NEW_USER, TYPE_ICECANDIDATE, QUEUE_CLIENT } from './constants';
import { addToQueue, removeQueue, updateCall } from '../../../redux'

export default function SocketHandler(socket, socketMessageHandlers, dispatch, localMediaStream, rtcPeerConnectionInstance) {
  const { 
    handleSocketConnection, handleConnectionReady, handleOffer,
    handleAnswer, handleIceCandidate, handleCloseLocalStream
  } = socketMessageHandlers

  const addCallToQueue = (call) => {
    dispatch(addToQueue(call))
  }

  // let socket = new WebSocket(URL)

  socket.onopen = () => {
    console.log('Websocket connected');
  }

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    // console.log('message', data)
    switch (data.type) {
      case TYPE_NEW_USER:
        handleSocketConnection(data.id, socket);
        break;
      case TYPE_CONNECTION:
        handleConnectionReady(data);
        break;
      case TYPE_OFFER:
        handleOffer(data, socket, localMediaStream, rtcPeerConnectionInstance);
        break;
      case TYPE_ANSWER:
        handleAnswer(data);
        break;
      case TYPE_ICECANDIDATE:
        handleIceCandidate(data)
        break;
      case 'STOP_CALL':
      {
        handleCloseLocalStream(localMediaStream)
        break;
      }
      case 'DISCONNECTED':
      {
        dispatch(updateCall(data.roomKey, 'DISCONNECTED'))
        handleCloseLocalStream(localMediaStream)
        break;
      }
      default:
        console.log('---- WebRTC ---- Recieving message failed');
    }
  }

  socket.onclose = (event) => {
    console.log('Websocket closed: ', event);
    handleCloseLocalStream()
  }

  socket.onerror = (error) => {
    console.error('Websocket error: ', error);
    handleCloseLocalStream()
  }

  return socket
}