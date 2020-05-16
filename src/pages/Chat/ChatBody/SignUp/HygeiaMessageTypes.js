import React, { useState, useEffect } from 'react'
import TypingIndicator from '../../../../components/TypingIndicator'
import ButtonOption from './ButtonOption'
import HygeiaMessage from '../../../../components/HygeiaMessage'

export default function HygeiaMessageTypes(props) {
  const [ component, setComponent ] = useState(<TypingIndicator />)
  const [ bufferDone, setBuffer ] = useState(false)
  const messageType = () => {
    let message = props
    switch(message.type) {
      case 'message':
      {
        return <HygeiaMessage text={message.text} />
      }
      case 'button-option':
      {
        return <ButtonOption {...message} />
      }
      default: return null
    }
  }

  useEffect(() => {
    if(!bufferDone) {
      setTimeout(function() {
        setBuffer(true)
      }, 1000);
    } else {
      let comp = messageType()
      setComponent(comp)
    }
  },[bufferDone])

  return component 
}