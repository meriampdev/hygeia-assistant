import React, { useEffect } from 'react'
import UserInputMessage from '../../../components/UserInputMessage'
import HygMessageGroupWrapper from '../../../components/HygeiaMessage/MessageGroupWrapper'
import HygeiaMessageRenderer from './Hygeia'
import UserForm from './UserForm'
import Diagnosis from './Diagnosis'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { localStorageGet, localStorageSetResponses, localStorageRemoveResponse } from '../../../utils/easyLocalStorage'
import { getLikeSymptoms } from '../../../utils/api'
import { removeMessageType } from '../../../utils/renderDataHelper'

const ChatMessages = React.forwardRef((props, ref) => {
  const next = useSelector(state => state.chat.next)
  const dataForNext = useSelector(state => state.chat.dataForNext)
  const history = useHistory()

  useEffect(() => {
    if(next) {
      const { inputProperties, value } = dataForNext
      if(inputProperties.inputKey !== 'stopQuestions') {
        props.startNext(props.conversationFlow, inputProperties.inputKey, value, value)
      }
    }
    
  }, [next])

  useEffect(() => {
    let elmnt = document.getElementById("bottom-of-chat");
    if(elmnt) {  elmnt.scrollIntoView() }
  }, [props.conversationFlow])

  const handleHygeiaButtonOption = ({ userAction, messageData, messageIndex }) => {
    // remove buttons from render
    let newConversationFlow = removeMessageType(props.conversationFlow, 'button-option', messageData.inputKey)

    localStorageSetResponses(messageData.inputKey, userAction.value)
    if(messageData.inputKey === 'userRole') {
      if(userAction.value === 'client') {
        props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
      } else {
        history.push('/signup')
      }
    } else if(messageData.inputKey == 'visitFor') {
      const responses = localStorage.getItem('responses') ? JSON.parse(localStorage.getItem('responses')) : {}
      props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
    } else if(messageData.inputKey === 'gender') {
      if(userAction.value === 'question') {
        props.redoStep(messageData.inputKey)
      } else {
        props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
      }
    } else {
      props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
    }
  }

  const handleRequestTriggerButtons = ({ userAction, messageData, messageIndex }) => {

    if(messageData.inputKey === 'bodyAreaSelection') {
      let newConversationFlow = removeMessageType(props.conversationFlow, 'request-trigger-buttons', messageData.inputKey)
      let suggestions = getLikeSymptoms(userAction.value)
      localStorageSetResponses('bodyAreaSymptoms', suggestions)
      props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
    } else {
      let newConversationFlow = removeMessageType(props.conversationFlow, 'swipeable-list', messageData.inputKey)
      props.startNext(newConversationFlow, messageData.inputKey, userAction.value, userAction.label)
    }
  }

  const handChangeAnswer = (data) => {
    localStorageRemoveResponse('gender')
    props.changeAnswer(data.step.code)
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
                    handleRequestTriggerButtons={handleRequestTriggerButtons}
                  /> : null)
              })
            }
            </HygMessageGroupWrapper>
            <div className='user-message-block'>
            {
              userMessages.map((message, mi) => {
                return (<UserInputMessage handChangeAnswer={() => handChangeAnswer({ step, message })} key={`message-${mi}`}>
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
      {
        props.startDiagnosis ?
          <Diagnosis continueAfterDiagnosis={props.continueAfterDiagnosis} />
        : null
      }
      <div id="bottom-of-chat" style={{ visibility: 'hidden', height: '20px'}}></div>
    </div>
  )
})

export default ChatMessages
{/*<UserForm code={step.stepCode}
  handleNext={this.ha,ndleNext.bind(this)}
  inputs={message.userForm.inputs} 
  formKey={message.userForm.onSuccessAction} 
  setFormData={this.setFormData.bind(this)}
  handleRedirectButtons={this.handleRedirectButtons.bind(this)}
  newChat={this.newChat}
/>*/}