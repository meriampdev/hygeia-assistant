import React, { useState, useEffect } from 'react'
import HygeiaMessage from '../../../../components/HygeiaMessage'
import TypingIndicator from '../../../../components/TypingIndicator'
import SingleQuestion from './SingleQuestion'
import GroupSingle from './GroupSingle'
import GroupMultiple from './GroupMultiple'
import Button from 'react-md/lib/Buttons/Button'

export default function HygeiaQuestion(props) {
  const [ component, setComponent ] = useState(<TypingIndicator />)

  const questionType = (question) => {
    switch(question.questionType) {
      case 'message':
        return question.text ? <HygeiaMessage text={question.text} /> : <TypingIndicator />
      case 'single':
      {
        return <SingleQuestion {...question} {...props} />
      }
      case 'group_single':
      {
        return <GroupSingle {...question} {...props} />
      }
      case 'group_multiple':
      {
        return <GroupMultiple {...question} {...props} />
      }
      case 'continuation-buttons':
      {
        return question.options ? <HygeiaMessage>
          <div className='hygeia-buttons'>
            {
              question.options.map((opt, i) => {
                return (<Button key={`option-${i}`}
                    onClick={opt.handler}
                    className='button'
                    flat primary swapTheming 
                  >
                    {opt.text}
                  </Button>)
              })
            }
            
          </div>
        </HygeiaMessage> : <TypingIndicator />
      }
      default: return null
    }
  }

  useEffect(() => {
    let comp = questionType(props)
    setComponent(comp)
  }, [props.text])

	return component 
}