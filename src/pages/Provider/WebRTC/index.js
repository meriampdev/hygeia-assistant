import React, { useState, useEffect, useRef } from 'react'
import './videocall.scss'
import { useSelector, useDispatch } from 'react-redux'
import { DEFAULT_CONSTRAINTS, DEFAULT_ICE_SERVERS, TYPE_ROOM, createMessage, createPayload } from './constants';
import { TYPE_CONNECTION, TYPE_OFFER, TYPE_ANSWER, TYPE_NEW_USER, TYPE_ICECANDIDATE, QUEUE_CLIENT } from './constants';
import SocketHandler from './SocketHandler'
import Button from 'react-md/lib/Buttons/Button'

export default function WebRTC(rtcProps) {
  const dispatch = useDispatch()
  const socketState = useSelector(state => state.socket)
  const callData = rtcProps.callData

  var localStreamRef = useRef()
  var remoteStreamRef = useRef()
  var remoteAudoRef = useRef()

  const [ socket, initSocket ] = useState(null)
  const [ initSocketStatus, setInitSocketStatus ] = useState(false)
  const [ socketID, setSocketID ] = useState(null)
  const [ connectionStarted, setConnectionStarted ] = useState(false)
  const [ rtcPeerInitStatus, setRTCPeerInitStatus ] = useState(false)
  const auth = useSelector(state => state.auth)

  const [ shareBtnFunction, setShareBtnFunction ] = useState('screenshare')
  const [ answerAttempt, setAnswerAttempt ] = useState(false)

  var remoteAudioStream
  const [ localMediaStream, setLocalMediaStream ] = useState(null)
  const [ remoteMediaStream, setRemoteMediaStream ] = useState(null)

  var localSocketInstance
  const [ rtcPeerConnection, setRTCPeerConnection ] = useState(null)
  useEffect(() => {
    if(!rtcPeerConnection) {
      let rtcPeerConnectionInstance = new RTCPeerConnection(DEFAULT_ICE_SERVERS);
      setRTCPeerConnection(rtcPeerConnectionInstance)
    }
  },[rtcPeerConnection])

  useEffect(() => {
      if(!localMediaStream && rtcPeerConnection) {
        async function startLocalStream() {
          let stream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS)
          setLocalMediaStream(stream)
          if(localStreamRef && localStreamRef.current) {
            localStreamRef.current.srcObject = stream
          }

          console.log('stream', stream)
          let socketInstance = new WebSocket(rtcProps.URL)
          SocketHandler(socketInstance, socketMessageHandlers, dispatch, stream, rtcPeerConnection)
          initSocket(socketInstance)

          // wait for 2 seconds, until socket is in ready state
          setTimeout(function() {
            const { roomKey } = callData
            socketInstance.send(JSON.stringify({ type: 'ANSWERED', roomKey }));
          }, 2000);
        }
        startLocalStream()
      }
  },[localMediaStream, rtcPeerConnection])

  const socketMessageHandlers = {
    handleSocketConnection: async function(data, socketInstance) {
      setSocketID(data)
      const { roomKey } = callData
      const roomKeyMessage = createMessage(TYPE_ROOM, createPayload(roomKey, data));
      const connectPayload = { ...roomKeyMessage, userData: { name: auth.data.name } }
      console.log('connectPayload', connectPayload)
      if(!answerAttempt) {
        socketInstance.send(JSON.stringify(connectPayload));
        setAnswerAttempt(true)
      }
    },
    handleConnectionReady: function(data) {
      setConnectionStarted(data)
    },
    handleOffer: async function(event, socketInstance, localMediaStream, rtcPeerConnectionInstance) {
      rtcPeerConnectionInstance.ontrack = onAddStream;
      rtcPeerConnectionInstance.addTrack(localMediaStream.getTracks()[0], localMediaStream);
      rtcPeerConnectionInstance.addTrack(localMediaStream.getTracks()[1], localMediaStream);
      await rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event.payload.message));
      let sessionDescription = await rtcPeerConnectionInstance.createAnswer()
      await rtcPeerConnectionInstance.setLocalDescription(sessionDescription)

      const { roomKey } = callData
      const userData = { name: auth.data.name }
      let payload = createPayload(roomKey, socketID, sessionDescription );
      payload = { ...payload, userData }
      const answerMessage = createMessage(TYPE_ANSWER, payload);
      socketInstance.send(JSON.stringify(answerMessage));
      
    },
    handleIceCandidate: function(data) {
      const { message } = data.payload;
      const candidate = JSON.parse(message);
      rtcPeerConnection.addIceCandidate(candidate);
    },
    handleAnswer: function(event) {
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event.payload.message));
    },
    handleCloseLocalStream: function(localMediaStream) {
      if(localMediaStream) {
        if(localStreamRef && localStreamRef.current) {
          localStreamRef.current.srcObject = null
        }
        localMediaStream.getTracks().forEach(track => track.stop())
      }

      if(remoteMediaStream) {
        remoteMediaStream.getTracks().forEach(track => track.stop())
        remoteAudioStream.getTracks().forEach(track => track.stop())
      }
      if(rtcProps.closeCall) {
        rtcProps.closeCall()
      }
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

    let peerTransReceiverVideo = rtcPeerConnection.getTransceivers().filter((f) => f.sender.track.kind === 'video')
    const transceiver = peerTransReceiverVideo[0]
    transceiver['sender'].replaceTrack(screenStream)  
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

  const handleStopCall = () => {
    const { roomKey } = callData
    let stopPayload = createPayload(roomKey, socketID)
    let socketMessage = createMessage('STOP_CALL', stopPayload);
    socket.send(JSON.stringify(socketMessage));
  }

  return (
    <div className='call-interface-wrapper'>
      <div id="videoCall">
        {
          callData ? 
            <div className="contact-name">
              <h3>{callData.patientName}</h3>
            </div>
          : null
        }
        <video ref={remoteStreamRef} playsInline autoPlay className="remote-stream">thier video</video>
        <audio autoPlay playsInline ref={remoteAudoRef}></audio>
        <video ref={localStreamRef} autoPlay muted playsInline className="local-stream">your video</video>

        <div className="controls">
          <Button className='call-control call-end' onClick={() => handleStopCall()} primary icon>call_end</Button>
          <Button className='call-control' primary icon>keyboard_voice</Button>
          <Button onClick={handleShareScreen} className='call-control' primary icon>screen_share</Button>
        </div>
      </div>
    </div>
  )
}