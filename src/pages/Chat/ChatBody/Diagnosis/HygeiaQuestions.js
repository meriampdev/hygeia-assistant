import React, { useState, useEffect } from 'react'
import HygeiaMessage from '../../../../components/HygeiaMessage'
import TypingIndicator from '../../../../components/TypingIndicator'
import SingleQuestion from './SingleQuestion'
import GroupSingle from './GroupSingle'
import GroupMultiple from './GroupMultiple'

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
      default: return null
    }
  }

  useEffect(() => {
    let comp = questionType(props)
    setComponent(comp)
  }, [props.text])

	return component 
}