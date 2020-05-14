import React from 'react'
import signup_flow from '../utils/signup_flow'
import consultation_flow from '../utils/consultation_flow'
import ChatMessages from './ChatMessages'
import _ from 'lodash'
import '../styles/chatv2.scss'

export default class Chatv2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', conversationFlow: [] }
    this.conversation = consultation_flow
    this.runConversation(0)
  }

  runConversation(conversationIndex) {
    return new Promise(async (resolve) => {
      if(conversationIndex < this.conversation.length) {
        let block = this.conversation[conversationIndex]
        await this.runBlock(block.conversation, 0, block, conversationIndex)
        resolve(this.runConversation(conversationIndex+1))
      } else {
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
          this.runBlock(conversationBlock, blockIndex+1, block, conversationIndex)
        } else {

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
        let message = await this.bufferedMessage(messages[messageIndex])
        if(this.runMessagesTimeout) {
          clearTimeout(this.runMessagesTimeout)
        }
        this.runMessagesTimeout = setTimeout(function() {
          let newConversationFlow = context.appendMessage(conversationIndex, messageIndex, message, messageGroup, block, context)
          context.setState({ conversationFlow: newConversationFlow })
          resolve(context.runMessages(messages, messageIndex+1, messageGroup, blockIndex, block, conversationIndex))
        }, 600)
      } else {  
        resolve()
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

  startNext(inputsRemovedFlow, stepCode, value, valueInMessage) {
    let responses = localStorage.getItem('responses') ? JSON.parse(localStorage.getItem('responses')) : {}
    responses[stepCode] = value
    localStorage.setItem(responses, responses)
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
    this.runConversation(nextIndex)
  }

  render() {
    const { conversationFlow } = this.state
    return (
      <ChatMessages conversationFlow={conversationFlow}
        startNext={this.startNext.bind(this)} 
      />
    )
  }
}