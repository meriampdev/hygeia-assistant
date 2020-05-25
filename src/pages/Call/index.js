import React from 'react'
import WebRTC from './WebRTC'

export default function ClientCall(props) {
  return (
    <WebRTC URL="wss://hygeia-vc-server.herokuapp.com/" />
  )
}

// <WebRTC URL="wss://hygeia-vc-server.herokuapp.com/" />