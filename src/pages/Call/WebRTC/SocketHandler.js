import { TYPE_CONNECTION, TYPE_OFFER, TYPE_ANSWER, TYPE_NEW_USER, TYPE_ICECANDIDATE, QUEUE_CLIENT, CREATED } from './constants';
import { updateCall } from '../../../redux'

export default function SocketHandler(socket, socketMessageHandlers, dispatch, roomKey, localMediaStream, rtcPeerConnection) {
  const { 
    handleSocketConnection, handleConnectionReady, handleOffer,
    handleAnswer, handleIceCandidate, handleCreated,
    handleCloseLocalStream
  } = socketMessageHandlers

  var callStatus = 'waiting'

  socket.onopen = () => {
    console.log('Websocket connected');
    let interval = setInterval(() => socket.send(JSON.stringify({ type: "PING" })), 10000); // ping every 10 seconds
    setTimeout(function() {
      clearInterval(interval)
      console.log('callStatus', callStatus)
      if(callStatus === 'waiting') {
        dispatch(updateCall(roomKey, 'UN_ANSWERED'))
        socket.send(JSON.stringify({ type: "CLIENT_UN_ANSWERED", roomKey }))
        socket.close()
      }
    }, 40000); // 1 mins
    // }, 900000); // 15 mins
  }

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    switch (data.type) {
      case TYPE_NEW_USER:
        handleSocketConnection(data.id, socket);
        break;
      case CREATED:
        handleCreated(data)
        break;
      case TYPE_CONNECTION:
        handleConnectionReady(data, socket, localMediaStream, rtcPeerConnection);
        break;
      case TYPE_OFFER:
        handleOffer(data, socket);
        break;
      case TYPE_ANSWER:
        callStatus = 'answered'
        handleAnswer(data, rtcPeerConnection);
        break;
      case TYPE_ICECANDIDATE:
        handleIceCandidate(data, rtcPeerConnection)
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
    handleCloseLocalStream(localMediaStream)
  }

  socket.onerror = (error) => {
    console.error('Websocket error: ', error);
    dispatch(updateCall(roomKey, 'DISCONNECTED'))
    handleCloseLocalStream(localMediaStream)
  }
}