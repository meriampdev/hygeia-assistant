import React, { useRef, useEffect } from 'react';

export default function RTCVideo(props) {
  const mediaStream = useRef()
  const audioStream = useRef()

  if(props.mediaStream) {
    mediaStream.current.srcObject=props.mediaStream
  }

  if(props.remoteAudioStream) {
    audioStream.current.srcObject=props.remoteAudioStream
  }

  let local = props.local
  console.log('-----RTCVideo', local, mediaStream)
  return (
    <div>
      <video
        className="rtc__video"
        style={{width: '480px', backgroundColor: 'black', 
          borderColor: local ? 'red': '', 
          borderWidth: local ? '2px' : '',
          borderStyle: local ? 'solid': ''
        }}
        autoPlay playsInline
        ref={mediaStream}
        muted={props.local}
      >
        <track default kind="captions" />
      </video>
      {
        props.remoteAudioStream ? 
          <audio autoPlay playsInline ref={audioStream} />
        : null
      }
    </div>
  )
}
