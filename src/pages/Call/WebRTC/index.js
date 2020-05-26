import React, { useState, useEffect, useRef } from 'react'
import './videocall.scss'
import './connecting.scss'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { DEFAULT_CONSTRAINTS, DEFAULT_ICE_SERVERS, TYPE_ROOM, createMessage, createPayload } from './constants';
import { TYPE_CONNECTION, TYPE_OFFER, TYPE_ANSWER, TYPE_NEW_USER, TYPE_ICECANDIDATE, QUEUE_CLIENT } from './constants';
import SocketHandler from './SocketHandler'
import Button from 'react-md/lib/Buttons/Button'
import { useHistory } from 'react-router-dom'
import { localStorageGet } from '../../../utils/easyLocalStorage'

export default function WebRTC(rtcProps) {
  const history = useHistory()
  const dispatch = useDispatch()
  var localStreamRef = useRef()
  var remoteStreamRef = useRef()
  var remoteAudoRef = useRef()

  const [ socket, initSocket ] = useState(null)
  const [ initSocketStatus, setInitSocketStatus ] = useState(false)
  const [ socketID, setSocketID ] = useState(null)
  const [ roomKey, setRoomKey ] = useState("")
  const [ callEnded, setCallEnded ] = useState(false)
  const [ shareBtnFunction, setShareBtnFunction ] = useState('screenshare')

  const [ providerData, setProviderData ] = useState(null)

  useEffect(() => {
    if(!roomKey) {
      setRoomKey(uuidv4())
    }
  },[roomKey])

  var remoteAudioStream
  const [ localMediaStream, setLocalMediaStream ] = useState(null)
  const [ remoteMediaStream, setRemoteMediaStream ] = useState(null)

  const [ rtcPeerConnection, setRTCPeerConnection ] = useState(null)
  useEffect(() => {
    if(!rtcPeerConnection) {
      let rtcPeerConnectionInstance = new RTCPeerConnection(DEFAULT_ICE_SERVERS);
      setRTCPeerConnection(rtcPeerConnectionInstance)
    }
  },[rtcPeerConnection])
  useEffect(() => {
      if(!localMediaStream && !callEnded) {
        async function startLocalStream() {
          let stream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS)
          setLocalMediaStream(stream)
          if(localStreamRef && localStreamRef.current) {
            localStreamRef.current.srcObject = stream
          }
        }
        startLocalStream()
      }
  },[localMediaStream, callEnded])

  useEffect(() => {
    if(!initSocketStatus && roomKey && localMediaStream && rtcPeerConnection) {
      setInitSocketStatus(true)
      let socketInstance = new WebSocket(rtcProps.URL)
      console.log('socketInstance', socketInstance)
      SocketHandler(socketInstance, socketMessageHandlers, dispatch, roomKey, localMediaStream, rtcPeerConnection)
      initSocket(socketInstance)
    }
  },[initSocketStatus, roomKey, localMediaStream, rtcPeerConnection])

  const socketMessageHandlers = {
    handleSocketConnection: async function(data, socketInstance) {
      setSocketID(data)
      const roomKeyMessage = createMessage(TYPE_ROOM, createPayload(roomKey, data));
      let chatData = localStorageGet('responses', 'object')
      let userData = { ...chatData, 
        "id": roomKey,
        "roomKey": roomKey, 
        call_start_timestamp: new Date().toISOString(),
        status: "ON_QUEUE"
      }
      console.log('userData', userData)
      const connectPayload = { ...roomKeyMessage, userData }
      socketInstance.send(JSON.stringify(connectPayload));
    },

    handleCreated: async function(data) {
      
    },
    handleConnectionReady: async function(data, socketInstance, localMediaStream, rtcPeerConnectionInstance) {
      rtcPeerConnectionInstance.onicecandidate = (event) => { onIceCandidate(event, socketInstance) }
      rtcPeerConnectionInstance.ontrack = onAddStream;
      
      rtcPeerConnectionInstance.addTrack(localMediaStream.getTracks()[0], localMediaStream);
      rtcPeerConnectionInstance.addTrack(localMediaStream.getTracks()[1], localMediaStream);
      let sessionDescription = await rtcPeerConnectionInstance.createOffer()
      await rtcPeerConnectionInstance.setLocalDescription(sessionDescription)

      const payload = createPayload(roomKey, socketID, sessionDescription);
      const answerMessage = createMessage(TYPE_OFFER, payload);
      socketInstance.send(JSON.stringify(answerMessage));
    },
    handleOffer: async function(event, socketInstance) {
      
    },
    handleIceCandidate: function(data, rtcPeerConnectionInstance) {
      const { message } = data.payload;
      const candidate = JSON.parse(message);
      rtcPeerConnectionInstance.addIceCandidate(candidate);
    },
    handleAnswer: function(event, rtcPeerConnectionInstance) {
      const { userData } = event.payload
      setProviderData(userData)
      rtcPeerConnectionInstance.setRemoteDescription(new RTCSessionDescription(event.payload.message));
    },
    handleCloseLocalStream: function(localMediaStream) {
      console.log('handleCloseLocalStream', localMediaStream)
      handleStopLocalStream()
    },
  }

  const handleStopLocalStream = () => {
    if(localMediaStream) {
      if(localStreamRef && localStreamRef.current) {
        localStreamRef.current.srcObject = null
      }

      localMediaStream.getTracks().forEach(track => track.stop())
    }
    rtcPeerConnection.close()
    if(history) {
      history.push('/')
    }
  }

  const handleShareScreen = async () => {
    let screenStream
    if(shareBtnFunction === 'screenshare') {
      let mediaStream = await navigator.mediaDevices.getDisplayMedia(DEFAULT_CONSTRAINTS)
      screenStream = mediaStream.getVideoTracks()[0]
      
      setShareBtnFunction('stopscreenshare')
    } else {
      let mediaStream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS)
      screenStream = mediaStream.getVideoTracks()[0]

      setShareBtnFunction('screenshare')
    }

    let localStreamVideoTrack = localMediaStream.getTracks().filter((f) => f.kind === 'video')
    localMediaStream.removeTrack(localStreamVideoTrack[0])
    localMediaStream.addTrack(screenStream)
    setLocalMediaStream(localMediaStream)

    let peerTransReceiverVideo = rtcPeerConnection.getTransceivers().filter((f) => f.sender.track.kind === 'video')
    const transceiver = peerTransReceiverVideo[0]
    transceiver['sender'].replaceTrack(screenStream)  
  }

  const handleStopCall = () => {
    let stopPayload = createPayload(roomKey, socketID)
    let socketMessage = createMessage('STOP_CALL', stopPayload);
    socket.send(JSON.stringify(socketMessage));
  
    setCallEnded(true)
    setProviderData(null)
  }

  const onIceCandidate = (event, socketInstance) => {
    if (event.candidate) {
      const { candidate } = event
      const payload = createPayload(roomKey, socketID, JSON.stringify(candidate));
      const iceCandidateMessage = createMessage(TYPE_ICECANDIDATE, payload);
      socketInstance.send(JSON.stringify(iceCandidateMessage));
    }
}

  const onAddStream = (trackEvent) => {
    if(trackEvent.track.kind === 'audio') {
      let audiostream = new MediaStream([ trackEvent.track ]);
      remoteAudoRef.current.srcObject = audiostream
      remoteAudioStream = audiostream
    } else {
      let mediastream = new MediaStream([ trackEvent.track ]);
      remoteStreamRef.current.srcObject = mediastream
      setRemoteMediaStream(mediastream)
    }
  }

  return (
    <div className='call-interface-wrapper'>
      <div id="videoCall">
        {
          !remoteMediaStream ?
            <div className='connecting-wrapper'>
              <div className='phone'>
                <a href="#">
                  <div className="quick-alo-ph-circle"></div>
                  <div className="quick-alo-ph-circle-fill">
                    <img src={require('../hygeia-logo-icon.png')} alt='hygelogo' />
                  </div>
                  <div className="quick-alo-ph-img-circle"></div>
                </a>
              </div>
            </div>
          : null
        }
        {
          providerData ? 
            <div className="contact-name">
              <h3>{providerData.name}</h3>
            </div>
          : null
        }
          <video ref={remoteStreamRef} playsInline autoPlay className="remote-stream">thier video</video>
          <audio autoPlay playsInline ref={remoteAudoRef}></audio>

          <video ref={localStreamRef} autoPlay muted playsInline className="local-stream">your video</video>
        {
          remoteMediaStream ?
            <div className="controls">
              <Button className='call-control call-end' onClick={() => handleStopCall()} primary icon>call_end</Button>
              <Button className='call-control' primary icon>keyboard_voice</Button>
              <Button onClick={handleShareScreen} className='call-control' primary icon>screen_share</Button>
            </div>
          : null
        }
      </div>
    </div>
  )
}