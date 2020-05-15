import React, { useState, useEffect } from 'react'
import HygeiaMessage from '../../../components/HygeiaMessage'
import TypingIndicator from '../../../components/TypingIndicator'
import Button from 'react-md/lib/Buttons/Button'
import { useDispatch } from 'react-redux'
import { setInputTyping } from '../../../redux'
import { localStorageGet } from '../../../utils/easyLocalStorage'
import ButtonOption from './HygeiaActionElements/ButtonOption'

export default function Hygeia(props) {
  const dispatch = useDispatch()
  const { message, dependencyFormData } = props
  const [ component, setComponent ] = useState(<TypingIndicator />)
  const [ bufferDone, setBuffer ] = useState(message.type === 'button-option')
  const messageType = (messageData) => {
    switch(messageData.type) {
      case 'message':
      {
        let text = messageData.text
        if(messageData.messageIsActionDependent) {
          let responses = localStorageGet('responses', 'object')
          let actionValue = responses[messageData.actionKey]
          text = messageData.messageValues[actionValue]
        }
        return <HygeiaMessage text={text} />
      }
      case 'input-type-message':
      {
        dispatch(setInputTyping(messageData))
        let text = messageData.message
        if(messageData.messageIsActionDependent) {
          let responses = localStorageGet('responses', 'object')
          let actionValue = responses[messageData.actionKey]
          text = messageData.messageValues[actionValue]
        }
        return <HygeiaMessage text={text} />
      }
      case 'input-dependent':
      {
        let inputKey = messageData.inputKey
        let responses = localStorageGet('responses', 'object')
        let value = responses[inputKey] || ''
        let message =  messageData.text.replace(`{${inputKey}}`, value)
        if(messageData.messageIsActionDependent) {
          let responses = localStorageGet('responses', 'object')
          let actionValue = responses[messageData.actionKey]
          message = messageData.messageValues[actionValue].replace(`{${inputKey}}`, value)
        }
        return <HygeiaMessage text={message} />
      }
      case 'button-option':
      {
        return <ButtonOption {...props} />
      }
      case 'text-response-dependent':
      {
        let value = dependencyFormData ? dependencyFormData[messageData.inputKey] : ''
        let messageText = messageData.text.replace('${'+`${messageData.inputKey}`+'}', value)
        return <HygeiaMessage text={messageText} />
      }
      case 'boolean-response-dependent':
      {
        let value = dependencyFormData ? dependencyFormData[messageData.inputKey] : 0
        let scenario = messageData.scenarios[value]
        return messageType(scenario)
      }
      case 'redirect-button':
      {
        let elements = messageData.buttons.map((btn, i) => {
          return <Button key={`btn-${i}`} variant="contained" color="primary" disableElevation>{btn.label}</Button>
        })
        return <HygeiaMessage text={elements} />
      }
      default: return null
    }
  }

  useEffect(() => {
    if(!bufferDone) {
      setTimeout(function() {
        setBuffer(true)
      }, 500);
    } else {
      let comp = messageType(message)
      setComponent(comp)
    }
  },[bufferDone, message, dependencyFormData])
  
  return component
}