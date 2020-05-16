import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatWidget from '../../../../components/ChatWidget'
import UserInputMessage from '../../../../components/UserInputMessage'
import HygMessageGroupWrapper from '../../../../components/HygeiaMessage/MessageGroupWrapper'
// import HygeiaMessage from '../../../../components/HygeiaMessage'
import HygeiaMessageTypes from './HygeiaMessageTypes'
import { localStorageGet, localStorageSetResponses, localStorageRemoveResponse } from '../../../../utils/easyLocalStorage'
import { removeMessageType } from '../../../../utils/renderDataHelper'
import { getConversationBlock, messageBuffer } from '../../utils/formApi'
import { setInputTyping, sendAnswer } from '../../../../redux'
import _ from 'lodash'

export default function SignUp(props) {
  const dispatch = useDispatch()
  const [ editMode, setEditMode ] = useState(null)
  const [ blockIndex, setBlockIndex ] = useState(0)
  const [ conversation, setConversation ] = useState([])
  const [ widgetOpen, setWidget ] = useState(true)
  const [ userAnswers, setUserAnswers ] = useState({})
  const userAnswer = useSelector(state => state.chat.userAnswer)

  useEffect(() => {
    let elmnt = document.getElementById("bottom-of-chat");
    if(elmnt) {  elmnt.scrollIntoView() }
  }, [conversation])

  useEffect(() => {
    let data = userAnswer
    console.log('userAnswer', userAnswer)
    dispatch(setInputTyping(null)) // set back to null para ma disable ang input
    sendAnswer(null) // set back to null para sure sad ta clear ni sa sunod na input
    if(data) {
      let newAnswers = { ...userAnswers, [data.inputKey]: data.value }
      setUserAnswers(newAnswers)
      let index = _.findIndex(conversation, { code: userAnswer.inputKey })
      let block = conversation[index]
      if(block) {
        if(block.stoppingConditions) {
          let shouldStop = handleStoppingCondition(block, data.inputKey, data.value)
          if(shouldStop) return
        } 
        let messages = block.messages
        let newMessage = { ...userAnswer, text: data.value, code: block.code, messageType: 'answer' }
        let newMessages = [...messages, newMessage]
        let newConversation = conversation.map((step) => {
          if(step.code === block.code) {
            return { ...step, messages: newMessages }
          } else { return step }
        })
        setConversation(newConversation)
        if(editMode) {
          newConversation = [...newConversation, ...editMode.otherHalf]
          setConversation(newConversation)
          setEditMode(null)
          setBlockIndex(newConversation.length)
        } else {
          setBlockIndex(index+1)
        }
      }
    }
  }, [userAnswer])

  useEffect(() => {
    let block = getConversationBlock(blockIndex)
    if(block) {
      if(block.skippable) {
        let shouldSkip = block.skippableValues.includes(userAnswers[block.skipValueKey])
        if(shouldSkip) {
          let newConversation = [ ...conversation, { skip: true } ]
          setConversation(newConversation)
          setBlockIndex(blockIndex+1)
          return
        }
      }
      let code = block.code 
      let messages = block.messages
      let newBlock = { ...block, messages: [] }
      let newMessages = []
      const sequencer = (index) => {
        return new Promise(async (resolve) => {
          if(index < messages.length) {
            let message = messages[index]
            if(message.type === 'input-type-message') {
              dispatch(setInputTyping(message))
              // stop ta diri.. di mani i-render
              return
            } else if(message.type === 'message-answer-dependent') {
              if(userAnswers[message.inputKey]) {
                let text = message.text.replace(`{${message.inputKey}}`, userAnswers[message.inputKey])
                message = { ...message, text: text, type: 'message' }
              } 
            }
            newMessages = [...newMessages, { ...message, messageType: 'question' }]
            newBlock = { ...newBlock, messages: newMessages }
            let newConversation = [ ...conversation, newBlock ]
            setConversation(newConversation)
            await messageBuffer()
            resolve(sequencer(index+1))
          } else {
            resolve()
          }
        })
      }
      sequencer(0, messages, newMessages, newBlock)
    }
  }, [blockIndex])

  const handleStoppingCondition = (block, inputKey, value) => {
    let shouldStop = block.stoppingConditions.responseValues.includes(value)
    if(shouldStop) {
      let exitMessage = block.stoppingConditions.exitMessages[value]
      let messages = block.messages
      let newMessages = [...messages, { ...exitMessage, messageType: 'question' }]
      let newConversation = conversation.map((step) => {
        if(step.code === block.code) {
          return { ...step, messages: newMessages }
        } else { return step }
      })
      setConversation(newConversation)
    }
    return shouldStop
  }

  const handleButtonOption = (inputKey, value, label) => {
    let index = _.findIndex(conversation, { code: inputKey })
    let block = conversation[index]
    if(block.stoppingConditions) {
      let shouldStop = handleStoppingCondition(block, inputKey, value)
      if(shouldStop) return
    }

    let messages = block.messages
    let setDontRender = messages.map((m) => {
      if(m.type === 'button-option'){ return { ...m, dontRender: true } }
      else return m
    })
    let newMessages = [...setDontRender, { messageType: 'answer', inputKey, text: label, code: block.code, type: 'button-option' }]
    let newConversation = conversation.map((step) => {
      if(step.code === block.code) {
        return { ...step, messages: newMessages }
      } else { return step }
    })
    setConversation(newConversation)
    let newAnswers = { ...userAnswers, [inputKey]: value }
    setUserAnswers(newAnswers)
    setBlockIndex(index+1)

  }

  const handChangeAnswer = (message, code) => {
    let index = _.findIndex(conversation, { code: code })
    let removeOther = _.slice(conversation, 0, index)
    let otherHalf = _.slice(conversation, index+1, conversation.length)
    setConversation(removeOther)
    setBlockIndex(removeOther.length)
  }

  return (
    <ChatWidget open={widgetOpen} signUp={true} toggleWidget={() => setWidget(!widgetOpen)}>
      <div className='ChatBody'>
      {
        conversation.map((step) => {
          return !step.skip ? (<HygMessageGroupWrapper key={step.code}>
            {
              step.messages.map((message, mi) => {
                return message.messageType === 'question' ?
                    (!message.dontRender ?
                      <HygeiaMessageTypes {...message} key={`${step.code}-message-${mi}`}
                        containerProps = {{
                          handleButtonOption: handleButtonOption
                        }}
                      /> 
                    : null)
                :  
                  <UserInputMessage 
                    handChangeAnswer={() => handChangeAnswer(message, step.code)}
                    key={`user-answer-${mi}`}>{message.text}</UserInputMessage>
              })
            }
            </HygMessageGroupWrapper>) : null
        })
      }
      <div id="bottom-of-chat"></div>
      </div>
    </ChatWidget>
  )
}