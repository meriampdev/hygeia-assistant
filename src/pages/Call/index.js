import React from 'react'
import WebRTC from './WebRTC'

export default function ClientCall(props) {
  return (
    <WebRTC URL={process.env.REACT_APP_VC_SIGNAL_SERVER} />
  )
}

// <WebRTC URL="wss://hygeia-vc-server.herokuapp.com/" />