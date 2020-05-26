import React, { useState, useEffect } from 'react'
import HygeiaMessage from '../../../components/HygeiaMessage'
import TypingIndicator from '../../../components/TypingIndicator'
import Button from 'react-md/lib/Buttons/Button'
import { useDispatch } from 'react-redux'
import { setInputTyping } from '../../../redux'
import { localStorageGet } from '../../../utils/easyLocalStorage'
// import { localStorageGet } from '../../../utils/api'
import ButtonOption from './HygeiaActionElements/ButtonOption'
import RequestDataButtons from './HygeiaActionElements/RequestDataButtons'
import BodyModel from './HygeiaActionElements/BodyModel'
import SwipeableList from './HygeiaActionElements/SwipeableList'
import Selection from './HygeiaActionElements/Selection'

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
        console.log('messageData', messageData)
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
      case 'request-trigger-buttons':
      {
        let newProps = { ...props, handleHygeiaButtonOption: props.handleRequestTriggerButtons }
        return <ButtonOption {...newProps} />
      }
      case 'request-data-buttons':
      {
        let newProps = { ...props, handleHygeiaButtonOption: props.handleRequestTriggerButtons }
        console.log('request-data-buttons', props)
        return <RequestDataButtons {...newProps} />
      }
      case 'swipeable-list':
      {
        let newProps = { ...props, handleHygeiaButtonOption: props.handleRequestTriggerButtons }
        console.log('request-data-buttons', props)
        return <SwipeableList {...newProps} />
      }
      case 'selection':
      {
        let newProps = { ...props, afterSymptoms: props.afterSymptoms }
        return <Selection {...newProps} />
      }
      case 'body-model':
      {
        return <BodyModel />
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