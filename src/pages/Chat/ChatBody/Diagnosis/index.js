import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserInputMessage from '../../../../components/UserInputMessage'
import HygMessageGroupWrapper from '../../../../components/HygeiaMessage/MessageGroupWrapper'
import { localStorageGet, localStorageSetResponses, localStorageRemoveResponse } from '../../../../utils/easyLocalStorage'
import { removeMessageType } from '../../../../utils/renderDataHelper'
import { startDiagnosis } from '../../../../redux'
import HygeiaQuestions from './HygeiaQuestions'

export default function Diagnosis(props) {
  const dispatch = useDispatch()
  // this for user initiated stoppage
  const should_stop = useSelector(state => state.chat.should_stop)
  const userMessage = useSelector(state => state.chat.dataForNext)

  let responses = localStorageGet('responses', 'object')
  let SEX = responses.gender || 'female'
  let AGE = 30
  if(responses.birthYear) {
    let date = new Date()
    AGE = date.getFullYear() - parseInt(responses.birthYear)
  }
  let initialEvidence = []
  if(responses.selectedFromSuggestion) {
    initialEvidence = responses.selectedFromSuggestion.map((symptom) => {
      return { id: symptom.id, choice_id: 'present', initial: true }
    })
  }
  const [ evidence, setEvidence ] = useState(initialEvidence)
  const [ conversation, setConversation ] = useState([
    { type: 'question', questionType: 'message', 
      text: "Should you wish to stop, just type anything and hit send ", lineID: 0
    }
  ])
  // this for when diagnosis api should_stop is true
  const [ shouldStop, setShoudStop ] = useState(false)
  const [ conditions, setConditions ] = useState([])


  useEffect(() => {
    if(should_stop) {
      let lineID = conversation.length
      let addQuestionToConvo = [ ...conversation,
        { type: 'answer',text: userMessage.value, lineID: lineID }
      ]    
      setConversation(addQuestionToConvo)
    }
  }, [should_stop])

  useEffect(() => {
    let lineID = conversation.length
    let addQuestionToConvo = [ ...conversation,
      { type: 'question', questionType: 'message', text: '', lineID: lineID }
    ]

    setConversation(addQuestionToConvo)
    let action = dispatch(startDiagnosis({
      "sex": SEX, "age": AGE, "evidence":evidence
    }))

    action.request.then((response) => {
      console.log('response', response)
      let data = response.data
      let newConversation 

      if(!data.should_stop) {
        newConversation = addQuestionToConvo.map((line) => {
          if(line.lineID === lineID) {
            return { ...line, text: data.question.text }
          } else { return line }
        })
        newConversation = [ ...newConversation,
          {
            type: 'question',
            questionType: data.question.type,
            options: data.question.items,
            lineID: newConversation.length
          }
        ]
      } else {
        newConversation = addQuestionToConvo.map((line) => {
          if(line.lineID === lineID) {
            return { ...line, dontRender: true }
          } else { return line }
        })
      }
        
      setConversation(newConversation)
      setConditions(data.conditions)
      setShoudStop(data.should_stop)
    }).catch((e) => {
      console.log('Error')
    })
  }, [evidence])

  const selectSingleOption = (value, selectionControl, lineID, symptomId) => {
    let newConversation = conversation.map((f) =>{
      if(f.lineID === lineID) { return { ...f, dontRender: true } }
      else return f
    })
    let selected = selectionControl.filter(f => f.value === value)
    newConversation = [...newConversation,
      {
        type: 'answer',
        text: selected[0].label,
        lineID: newConversation.length
      }
    ]
    let newEvidence = [ ...evidence, 
      { id: symptomId, choice_id: value } 
    ]
    setEvidence(newEvidence)
    setConversation(newConversation)
  }

  const selectGroupSingle = (value, selectionControl, lineID) => {
    let newConversation = conversation.map((f) =>{
      if(f.lineID === lineID) { return { ...f, dontRender: true } }
      else return f
    })
    let selected = selectionControl.filter(f => f.value === value)
    newConversation = [...newConversation,
      {
        type: 'answer',
        text: selected[0].label,
        lineID: newConversation.length
      }
    ]
    let newEvidence = [ ...evidence, 
      { id: value, choice_id: 'present' } 
    ]
    setEvidence(newEvidence)
    setConversation(newConversation)
  }

  const selectGroupMultiple = (value, selectionControl, lineID) => {
    let newConversation = conversation.map((f) =>{
      if(f.lineID === lineID) { return { ...f, dontRender: true } }
      else return f
    })
    let evidenceSelected = []
    let text = value.map((id) => {
      let selected = selectionControl.filter(f => f.value === id)
      evidenceSelected.push({ id: id, choice_id: 'present' })
      return selected[0].label
    })
    let toTextString = text && text.length > 0 ? text.join() : ''
    newConversation = [...newConversation,
      { type: 'answer', text: toTextString.replace(',', ', '), lineID: newConversation.length }
    ]

    let newEvidence = [ ...evidence, ...evidenceSelected ]
    setEvidence(newEvidence)
    setConversation(newConversation)
  }
  
	return (
    <div>
      {
        conversation.map((item, mi) => {
          return (
            item.type === 'question' ?
              <HygMessageGroupWrapper key={`question-${mi}`} >
                {
                  !item.dontRender ?
                    <HygeiaQuestions 
                      {...item} 
                      containerProps={{
                        selectSingleOption: selectSingleOption,
                        selectGroupSingle: selectGroupSingle,
                        selectGroupMultiple: selectGroupMultiple
                      }}
                    /> 
                  : null
                }
              </HygMessageGroupWrapper>
            :  <UserInputMessage noEdit={true} key={`user-answer-${mi}`}>{item.text}</UserInputMessage>

          )
        })
      }
      {
        should_stop || shouldStop ?
          <HygMessageGroupWrapper >
            <HygeiaQuestions 
              type='question' questionType='message' text='These are the probable conditions.'
              containerProps={{
                selectSingleOption: selectSingleOption,
                selectGroupSingle: selectGroupSingle
              }}
            /> 
            {
              conditions.map((condition) => {
                let probability = parseFloat(condition.probability) * 100
                let text = `${condition.common_name} at ${probability.toFixed(2)}% probability.`
                let item = { type: 'question', questionType: 'message', text: text }
                return <HygeiaQuestions 
                  {...item} key={`condition-${condition.id}`}
                  containerProps={{
                    selectSingleOption: selectSingleOption,
                    selectGroupSingle: selectGroupSingle
                  }}
                /> 
              })
            }
          </HygMessageGroupWrapper>
        : null
      }
    </div>
  )
}