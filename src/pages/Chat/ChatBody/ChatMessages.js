import React, { useEffect } from 'react'
import UserInputMessage from '../../../components/UserInputMessage'
import HygMessageGroupWrapper from '../../../components/HygeiaMessage/MessageGroupWrapper'
import HygeiaMessageRenderer from './Hygeia'
import UserForm from './UserForm'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const ChatMessages = React.forwardRef((props, ref) => {
  const next = useSelector(state => state.chat.next)
  const dataForNext = useSelector(state => state.chat.dataForNext)
  const history = useHistory()

  useEffect(() => {
    if(next) {
      const { inputProperties, value } = dataForNext
      props.startNext(props.conversationFlow, inputProperties.inputKey, value, value)
    }
    
  }, [next])

  useEffect(() => {
    let elmnt = document.getElementById("bottom-of-chat");
    if(elmnt) {  elmnt.scrollIntoView() }
  }, [props.conversationFlow])

  const handleHygeiaButtonOption = ({ userAction, messageData, messageIndex }) => {
    // remove buttons from render
    let newConversationFlow = props.conversationFlow.map((item) => {
      if(item.code === messageData.inputKey) {
        // let newconversation = item.conversation.filter((f) => f.message.type !== 'button-option')
        let newconversation = item.conversation.map((f) => {
          if(f.message.type === 'button-option') {
            return { ...f, dontRender: true }
          } else {
            return f
          }
        })
        return { ...item, conversation: newconversation }
      } else { return item }
    })

    if(messageData.inputKey === 'userRole') {
      if(userAction.value === 'client') {
        props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
      } else {
        history.push('/signup')
      }
    } else {
      props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
    }
  }

  const { conversationFlow } = props
  return (
     <div id="ChatBody" className='ChatBody' ref={ref}>
      {
        conversationFlow.map((step, i) => {
          let hygeiaMessages = step.conversation.filter((f) => f.from === 'hygeia')
          let userMessages = step.conversation.filter((f) => f.from === 'user')
          return (<div className='message-block' key={`message-block-${i}`}>
            <HygMessageGroupWrapper>
            {
              hygeiaMessages.map((message, mi) => {
                return (!message.dontRender ?
                  <HygeiaMessageRenderer key={`message-${mi}`} 
                    {...message} messageIndex={mi}
                    handleHygeiaButtonOption={handleHygeiaButtonOption}
                  /> : null)
              })
            }
            </HygMessageGroupWrapper>
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
      <div id="bottom-of-chat" style={{ visibility: 'hidden', height: '20px'}}></div>
    </div>
  )
})

export default ChatMessages
{/*<UserForm code={step.stepCode}
  handleNext={this.handleNext.bind(this)}
  inputs={message.userForm.inputs} 
  formKey={message.userForm.onSuccessAction} 
  setFormData={this.setFormData.bind(this)}
  handleRedirectButtons={this.handleRedirectButtons.bind(this)}
  newChat={this.newChat}
/>*/}