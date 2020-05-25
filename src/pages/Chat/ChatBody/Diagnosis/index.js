import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UserInputMessage from '../../../../components/UserInputMessage'
import HygMessageGroupWrapper from '../../../../components/HygeiaMessage/MessageGroupWrapper'
import HygeiaMessage from '../../../../components/HygeiaMessage'
import { localStorageGet, localStorageSetResponses, localStorageRemoveResponse } from '../../../../utils/easyLocalStorage'
import { removeMessageType } from '../../../../utils/renderDataHelper'
import { startDiagnosis } from '../../../../redux'
import HygeiaQuestions from './HygeiaQuestions'
import Button from 'react-md/lib/Buttons/Button'

export default function Diagnosis(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  // this for user initiated stoppage
  const should_stop = useSelector(state => state.chat.should_stop)
  const userMessage = useSelector(state => state.chat.dataForNext)

  const [ continuation, setContinuation ] = useState([])
  const [ diagnosisDone, setDiagnosisDone ] = useState(false)

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
    let elmnt = document.getElementById("bottom-of-chat");
    if(elmnt) {  elmnt.scrollIntoView() }
  }, [conversation])

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
    setDiagnosisDone(false)
    let action = dispatch(startDiagnosis({
      "sex": SEX, "age": AGE, "evidence":evidence
    }))

    action.request.then((response) => {
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

  const onContinue = () => {
    setDiagnosisDone(true)
    setContinuation([{ type: 'question', questionType: 'continuation-buttons', text: '', lineID: 0 }])
    setTimeout(function() {
      setContinuation([{ 
        type: 'question', questionType: 'continuation-buttons', 
        options: [{ text: 'Connect with a healthcare provider', handler: connectWithProvider }],
        lineID: 0 
      }])
    }, 1000);
  }

  const connectWithProvider = () => {
    history.push('/call')
    // let uanswer = [ ...continuation, { type: 'answer', text: 'Connect with a healthcare provider' }]
    // setContinuation(uanswer)
   
    // let cc = [ ...uanswer, 
    //   { type: 'question', questionType: 'continuation-buttons', text: '', lineID: uanswer.length,
    //     options: null
    //   }]
    // setContinuation(cc)
    // setTimeout(function() {
    //   setContinuation([ ...uanswer, 
    //     { type: 'question', questionType: 'message', text: "How would you like to pay?", lineID: uanswer.length },
    //     { type: 'question', questionType: 'continuation-buttons', text: '', lineID: uanswer.length+1,
    //       options: [
    //         { text: 'Use my insurance', handler: () => handleEnd('Use my insurance') },
    //         { text: 'Continue without insurance', handler: () => handleEnd('Continue without insurance') }
    //       ]
    //     }
    //   ])
    // }, 1000);
  }

  const handleEnd = (text) => {
    setContinuation(prevState => [ ...prevState, { type: 'answer', text: text }])
  }

  let diagnosisMessage = ''
  if(should_stop || shouldStop) {
    let responses = localStorageGet('responses', 'object')
    diagnosisMessage = `Hi ${responses.patientName}, these are the probable conditions based on your answers.`
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
              type='question' questionType='message' text={diagnosisMessage}
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
            <HygeiaMessage>
              <div className='hygeia-buttons'>
                <Button 
                  onClick={onContinue}
                  className='button'
                  flat primary swapTheming 
                >
                  Continue
                </Button>
              </div>
            </HygeiaMessage>
          </HygMessageGroupWrapper>
        : null
      }
      {
        diagnosisDone && continuation.length > 0 ?
          continuation.map((item, mi) => {
            return (
              item.type === 'question' ?
                <HygMessageGroupWrapper key={`question-${mi}`} >
                  {
                    !item.dontRender ?
                      <HygeiaQuestions {...item} /> 
                    : null
                  }
                </HygMessageGroupWrapper>
              :  <UserInputMessage noEdit={true} key={`user-answer-${mi}`}>{item.text}</UserInputMessage>

            )
          })
        : null
      }
    </div>
  )
}