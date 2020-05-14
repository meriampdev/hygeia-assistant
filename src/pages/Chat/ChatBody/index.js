import React from 'react'
import signup_flow from '../utils/signup_flow'
import consultation_flow from '../utils/consultation_flow'
import UserInputMessage from '../../../components/UserInputMessage'
import HygeiaMessageRenderer from './Hygeia'
import UserForm from './UserForm'
import _ from 'lodash'

let conversationFlow = signup_flow
export default class ChatBody extends React.Component {
  constructor(props) {
    super(props)

    this.state = { readyStep: [], convoMessages: [], currentFormIndex: 0, responses: {} }
    this.runSteps = this.runSteps.bind(this)
    this.newChat = this.newChat.bind(this)

    this.runSteps(0)
    this.props.onLoadForms(conversationFlow.length)
    this.props.onProgress(1)
  }

  newChat() {
    conversationFlow = consultation_flow
    this.setState({ readyStep: [], currentFormIndex: 0, responses: {} })
    this.runSteps(0)
    this.props.onLoadForms(conversationFlow.length)
    this.props.onProgress(1)
  }

  bufferedMessage(message) {
    return new Promise((resolve) => {
      setTimeout(function() { resolve(message) }, 1000);
    })
  }

  appendMessage(flowIndex, messageData, stepCode, context) {
    let convoMessages
    let newConvoMessage = context.state.convoMessages
    if(context.state.convoMessages[flowIndex]) {
      let blockConversation = [...context.state.convoMessages[flowIndex].conversation, messageData]
      let convoBlock = context.state.convoMessages[flowIndex]
      let newBlock = { ...convoBlock, conversation: blockConversation }
      newConvoMessage = context.state.convoMessages.map((block, cmi) => {
        if(cmi === flowIndex) {
          return { ...block, conversation: blockConversation }
        } else { return block }
      })
      convoMessages = newConvoMessage
    } else {
      // if beginning conversation
      let newConvoBlock = [messageData]
      convoMessages = context.state.convoMessages.concat([{ stepCode: stepCode, conversation: newConvoBlock }])
    }

    return convoMessages
  }

  runMessages(messages, i, flowIndex, stepCode) {
    return new Promise(async (resolve) => {
      if(i < messages.length) {
          let messageBuffered = await this.bufferedMessage(messages[i])
          let dependencyFormData, dependencyFormKey
          let isResponseDependent = messageBuffered.type === 'text-response-dependent' || messageBuffered.type === 'boolean-response-dependent'
          if(isResponseDependent) {
            dependencyFormData = this.state.previousFormData
            dependencyFormKey = this.state.dependencyFormKey
          } 

          let stepMessageData = { from: 'hygeia', message: messageBuffered, dependencyFormData, dependencyFormKey }
          let newReadyStep = [ ...this.state.readyStep, stepMessageData ]
          if(isResponseDependent && this.state.hasFormData &&  !(!this.state.dependencyFormKey)) {
            let findMessageIndex = _.findIndex(this.state.readyStep, (item) => { 
              return (typeof item.dependencyFormKey !== undefined) && (item.dependencyFormKey === this.state.dependencyFormKey)
            })
            if(findMessageIndex >= 0) {
              newReadyStep = newReadyStep.slice(0, findMessageIndex)
              newReadyStep = [ ...newReadyStep, stepMessageData ]
            } 
          } 

          const context = this
          setTimeout(function() {
            let convoMessages = context.appendMessage(flowIndex, stepMessageData, stepCode, context)
            context.setState({ readyStep: newReadyStep, convoMessages: convoMessages })
            resolve(context.runMessages(messages, i+1, flowIndex, stepCode))
          }, 1000)
         
      } else {
        resolve()
      }
    })
  }

  runStepConversation(conversation, ci, code, flowIndex) {
    return new Promise(async (resolve) => {
      if(ci < conversation.length) {
        let convo = conversation[ci]
        if(convo.from === 'hygeia') {
          await this.runMessages(convo.messages, 0, flowIndex, code)
          this.runStepConversation(conversation, ci+1, code, flowIndex)
        } else {
          await this.bufferedMessage(true)
          let newData = { ...convo, code: code }
          let newReadyStep = [ ...this.state.readyStep, newData ]
          const context = this
          setTimeout(function() {
            let convoMessages = context.appendMessage(flowIndex, newData, code, context)
            context.setState({ readyStep: newReadyStep, convoMessages: convoMessages })
          }, 1000)
          this.runStepConversation(conversation, ci+1, code, flowIndex)
        }
      } else {
        resolve()
      }
    })
  }

  runSteps(index) {
    return new Promise(async (resolve) => {
      if(index < conversationFlow.length) {
        let step = conversationFlow[index]
        await this.runStepConversation(step.conversation, 0, step.code, index)
        resolve(this.runSteps(index+1))
      } else {
        resolve()
      }
    })
  }

  setFormData(formKey, formData) {
    this.setState({ [formKey]: formData })
  }

  handleNext(formKey, code, formData) {
    let nextFormIndex
    conversationFlow.forEach((flow, i) => {
      if(flow.code === code) {
        nextFormIndex = i + 1
      }
    })

    let hasFormData = formData ? true : false
    this.props.onProgress(nextFormIndex+1)

    let responses = { ...this.state.responses, [code]: formData }
    localStorage.setItem('responses', JSON.stringify(responses))
    this.setState({ previousFormData: formData, hasFormData, 
      dependencyFormKey: formKey, [formKey]: formData,
      responses: responses
    })
    this.runSteps(nextFormIndex)
  }

  handleRedirectButtons(data) {

  }

  render() {
    const { readyStep, convoMessages } = this.state
    console.log('convoMessages', convoMessages)
    return (
      <div className='ChatBody'>
        {
          convoMessages.map((step, i) => {
            let hygeiaMessages = step.conversation.filter((f) => f.from === 'hygeia')
            let userMessages = step.conversation.filter((f) => f.from === 'user')
            return (<div className='message-block' key={`message-block-${i}`}>
              <div className='hygeia-message-block'>
              {
                hygeiaMessages.map((message, mi) => {
                  return <HygeiaMessageRenderer key={`message-${mi}`} 
                      {...message}
                    />
                })
              }
              </div>
              <div className='user-message-block'>
              {
                userMessages.map((message, mi) => {
                  return (<UserInputMessage key={`message-${mi}`}>
                        <UserForm code={step.stepCode}
                          handleNext={this.handleNext.bind(this)}
                          inputs={message.userForm.inputs} 
                          formKey={message.userForm.onSuccessAction} 
                          setFormData={this.setFormData.bind(this)}
                          handleRedirectButtons={this.handleRedirectButtons.bind(this)}
                          newChat={this.newChat}
                        />
                      </UserInputMessage>
                    )
                })
              }
              </div>
            </div>)
          })
        }
      </div>
    )
  }
}
