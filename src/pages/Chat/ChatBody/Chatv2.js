import React from 'react'
import signup_flow from '../utils/signup_flow'
import consultation_flow from '../utils/consultation_flow'
import ChatMessages from './ChatMessages'
import _ from 'lodash'
import '../styles/chatv2.scss'
import '../styles/symptoms-model.scss'
import { localStorageGet, localStorageSetResponses, localStorageRemoveResponse } from '../../../utils/easyLocalStorage'
import { getLikeSymptoms } from '../../../utils/api'
import { useDispatch } from 'react-redux'
import { setInputTyping, stopQuestions } from '../../../redux'

export default function Chatv2HookWrap(props) {
  const dispatch = useDispatch()

  const allowInputTyping = (messageData) => {
    dispatch(setInputTyping(messageData))
    if(messageData.inputKey === 'stopQuestions') {
      dispatch(stopQuestions(false))
    }
  }
  class Chatv2 extends React.Component {
    constructor(props) {
      super(props)

      localStorage.removeItem('responses')
      this.state = { message: '', conversationFlow: [] }
      this.conversation = consultation_flow
      this.runConversation(0)
      this.editMode = false
    }

    runConversation(conversationIndex) {
      return new Promise(async (resolve) => {
        if(conversationIndex < this.conversation.length) {
          let block = this.conversation[conversationIndex]
          await this.runBlock(block.conversation, 0, block, conversationIndex)
          resolve(this.runConversation(conversationIndex+1))
        } else {
          this.editMode = false
          resolve()
        }
      })
    }

    runBlock(conversationBlock, blockIndex, block, conversationIndex) {
      return new Promise(async (resolve) => {
        if(blockIndex < conversationBlock.length) {
          let messageGroup = conversationBlock[blockIndex]
          if(messageGroup.from === 'hygeia') {
            await this.runMessages(messageGroup.messages, 0, messageGroup, blockIndex, block, conversationIndex)
            /*
              when the code reaches this point,
              the assumption is that hygeia messages are all done
              and it's time for user input.
              we don't resolve here because we depend on user action
              to run next block of conversation
            */
            
          }
        } else {
          resolve()
        }
      })
    }

    bufferedMessage(message) {
      return new Promise((resolve) => {
        setTimeout(function() { resolve(message) }, 600);
      })
    }

    runMessages(messages, messageIndex, messageGroup, blockIndex, block, conversationIndex) {
      return new Promise(async (resolve) => {
        if(messageIndex < messages.length) {
          const context = this
          let message = messages[messageIndex]
          let responses = localStorageGet('responses', 'object')
          if(message.skippable) {
            let inputValue = responses[message.skipValueKey]
            let canSkip = message.skippableValues.includes(inputValue)
            if(canSkip) {
              resolve(context.runMessages(messages, messageIndex+1, messageGroup, blockIndex, block, conversationIndex))
              return
            } 

            if(!canSkip && inputValue === 'question' && message.redoPoint) {
              await this.bufferedMessage(messages[messageIndex])
              if(this.runMessagesTimeout) {
                clearTimeout(this.runMessagesTimeout)
              }
              this.runMessagesTimeout = setTimeout(function() {
                localStorageSetResponses(message.inputKey, 'redo')
                let newConversationFlow = context.appendMessage(conversationIndex, messageIndex, message, messageGroup, block, context)
                context.setState({ conversationFlow: newConversationFlow })
                resolve(context.redoStep(message.inputKey))
              }, 600)
              return
            }
          }
          await this.bufferedMessage(messages[messageIndex])
          if(this.runMessagesTimeout) {
            clearTimeout(this.runMessagesTimeout)
          }
          this.runMessagesTimeout = setTimeout(function() {
            let newConversationFlow = context.appendMessage(conversationIndex, messageIndex, message, messageGroup, block, context)
            context.setState({ conversationFlow: newConversationFlow })
            resolve(context.runMessages(messages, messageIndex+1, messageGroup, blockIndex, block, conversationIndex))
          }, 600)
        } else {  
          let lastMessage = messages[messageIndex-1]
          resolve(lastMessage)
        }
      })
    }

    appendMessage(conversationIndex, messageIndex, message, messageGroup, block, context) {
      let newConversationFlow
      let newConvoMessage = this.state.conversationFlow
      if(this.state.conversationFlow[conversationIndex]) {
        let blockConversation = [...this.state.conversationFlow[conversationIndex].conversation, { from: messageGroup.from, message: message }]
        let convoBlock = this.state.conversationFlow[conversationIndex]
        let newBlock = { ...convoBlock, conversation: blockConversation }
        newConvoMessage = this.state.conversationFlow.map((block, cmi) => {
          if(cmi === conversationIndex) {
            return { ...block, conversation: blockConversation }
          } else { return block }
        })
        newConversationFlow = newConvoMessage
      } else {
        // if beginning conversation
        let newConvoBlock = [{ from: messageGroup.from, message: message }]
        newConversationFlow = this.state.conversationFlow.concat([{ code: block.code, conversation: newConvoBlock }])
      }

      return newConversationFlow
    }

    changeAnswer(stepCode) {
      this.editMode = true
      if(stepCode !== 'selectedFromSuggestion') {
        
      } else {
        localStorageRemoveResponse(stepCode)
      }
      this.setState({ startDiagnosis: false })
      
      let currentIndex = _.findIndex(this.state.conversationFlow, { code: stepCode })
      let newConversationFlow = this.state.conversationFlow.filter((f, i) => i <= currentIndex)
      newConversationFlow = newConversationFlow.map((step) => {
        if(step.code === stepCode) {
          let indexOfQuestion = -1
          let newConversation = step.conversation.map((message, mi) => {
            if(message.message.inputKey === stepCode) {
              indexOfQuestion = mi
              if(message.message.type === 'input-type-message') {
                allowInputTyping(message.message)
              }
              return { ...message, dontRender: false }
            } else { return message }
          })

          let indexOfAnswer = indexOfQuestion+1 // +1 because the answer is always right after the question
          let purgedFromAnswer = newConversation
          if(indexOfAnswer > -1) {
            purgedFromAnswer = newConversation.filter((f, i) => i !== indexOfAnswer )
          }
          return { ...step, conversation: purgedFromAnswer }
        } else { return step }
      })

      this.setState({ conversationFlow: newConversationFlow })
    }

    redoStep(stepCode) {
      let currentIndex = _.findIndex(this.state.conversationFlow, { code: stepCode })
      this.runConversation(currentIndex)
    }

    startNext(inputsRemovedFlow, stepCode, value, valueInMessage) {
      let responses = localStorageGet('responses', 'object')
      responses[stepCode] = value
      localStorageSetResponses(stepCode, value)
      let currentIndex = _.findIndex(inputsRemovedFlow, { code: stepCode })
      let currentConversation = inputsRemovedFlow[currentIndex] ? inputsRemovedFlow[currentIndex].conversation : []
      let newConversation = [ ...currentConversation, { from: 'user', message: { type: 'message', text: valueInMessage } } ]
      let newConversationFlow = inputsRemovedFlow.map((item) => {
        if(item.code === stepCode) {
          return { ...item, conversation: newConversation }
        } else return item
      })
      this.setState({ conversationFlow: newConversationFlow })
      let nextIndex = currentIndex+1
      let nextBlock = this.conversation[nextIndex]
      if(nextBlock.code === 'diagnosis') {
        allowInputTyping({ inputType: 'text', inputKey: 'stopQuestions' })
        this.setState({ startDiagnosis: true })
      } else {
        this.runConversation(nextIndex)
      }
    }

    afterSymptoms() {
      let responses = localStorageGet('responses', 'object')
      if(!this.state.hasSymptomsSelected) {
        let currentIndex = _.findIndex(this.conversation, { code: 'symptoms' })
        let nextIndex = currentIndex+1
        this.setState({ hasSymptomsSelected: true })
        this.runConversation(nextIndex)
      }
    }

    continueAfterDiagnosis() {
      let currentIndex = _.findIndex(this.conversation, { code: 'diagnosis' })
      let nextIndex = currentIndex+1
      this.runConversation(nextIndex)
    }

    render() {
      const { conversationFlow } = this.state
      return (
        <ChatMessages conversationFlow={conversationFlow}
          startNext={this.startNext.bind(this)} 
          redoStep={this.redoStep.bind(this)}
          changeAnswer={this.changeAnswer.bind(this)}
          startDiagnosis={this.state.startDiagnosis}
          continueAfterDiagnosis={this.continueAfterDiagnosis.bind(this)}
          afterSymptoms={this.afterSymptoms.bind(this)}
        />
      )
    }
  }

  return <Chatv2 />
}

