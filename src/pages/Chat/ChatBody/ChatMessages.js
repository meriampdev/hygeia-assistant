import React from 'react'
import UserInputMessage from '../../../components/UserInputMessage'
import HygeiaMessageRenderer from './Hygeia'
import UserForm from './UserForm'
import _ from 'lodash'

export default function ChatMessages(props) {

  const handleHygeiaButtonOption = ({ userAction, messageData, messageIndex }) => {
    // remove buttons from render
    let newConversationFlow = props.conversationFlow.map((item) => {
      if(item.code === messageData.inputKey) {
        let newconversation = item.conversation.filter((f) => f.message.type !== 'button-option')
        return { ...item, conversation: newconversation }
      } else { return item }
    })

    if(messageData.inputKey === 'userRole') {
      if(userAction.value === 'client') {
        props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
      }
    } else {
      props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
    }
  }

  const { conversationFlow } = props
  return (
     <div className='ChatBody'>
      {
        conversationFlow.map((step, i) => {
          let hygeiaMessages = step.conversation.filter((f) => f.from === 'hygeia')
          let userMessages = step.conversation.filter((f) => f.from === 'user')
          return (<div className='message-block' key={`message-block-${i}`}>
            <div className='hygeia-message-block'>
            {
              hygeiaMessages.map((message, mi) => {
                return <HygeiaMessageRenderer key={`message-${mi}`} 
                    {...message} messageIndex={mi}
                    handleHygeiaButtonOption={handleHygeiaButtonOption}
                  />
              })
            }
            </div>
            <div className='user-message-block'>
            {
              userMessages.map((message, mi) => {
                return (<UserInputMessage key={`message-${mi}`}>
                  {
                    message.message.type === 'message' ? message.message.text
                    :
                    <UserForm code={step.stepCode}
                      messageData={message}
                    />
                  }
                </UserInputMessage>)
              })
            }
            </div>
          </div>)
        })
      }
    </div>
  )
}

{/*<UserForm code={step.stepCode}
  handleNext={this.handleNext.bind(this)}
  inputs={message.userForm.inputs} 
  formKey={message.userForm.onSuccessAction} 
  setFormData={this.setFormData.bind(this)}
  handleRedirectButtons={this.handleRedirectButtons.bind(this)}
  newChat={this.newChat}
/>*/}