import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSendAnswer, stopQuestions } from '../../redux'
import { localStorageSetResponses } from '../../utils/easyLocalStorage'
import { getLikeSymptoms } from '../../utils/api'

export default function MessageInput(props) {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState("")
  const [ suggestionList, setSuggestions ] = useState([])
  const inputProperties = useSelector(state => state.chat.inputProperties)
  const inputDisabled = useSelector(state => state.chat.inputDisabled)

  const onSend = () => {
    console.log('inputProperties', inputProperties)
    console.log('value', value)
    if(!inputDisabled) {
      if(inputProperties.inputKey === 'stopQuestions') {
        dispatch(stopQuestions(true))
      }
      dispatch(userSendAnswer({ inputProperties: inputProperties, value: value }))
      setValue("")
    }
  }

  const onKeyPress = (e) => {
    e.persist()
    if(e.key === 'Enter') {
      if(inputProperties.inputKey === 'stopQuestions') {
        dispatch(stopQuestions(true))
      }
      dispatch(userSendAnswer({ inputProperties: inputProperties, value: value }))
      setValue("")
    } 
  }

  const onType = (e) => {
    e.persist()
    if(inputProperties.inputKey === 'bodyAreaSelection') {
      let suggestionList = getLikeSymptoms(value)
      localStorageSetResponses('bodyAreaSymptoms', suggestionList)
      setSuggestions(suggestionList)
    } 

    setValue(e.target.value)
  }

	return (
    <div className="typing" style={{background: 'rgb(255, 255, 255)', borderTopColor: 'rgb(234, 234, 234)'}}>
      {
        suggestionList.length > 0 ?
          <div className='suggestion-list'>
            {
              suggestionList.map((item) => {
                return <div className='suggestion-item' key={item.id}>{item.common_name}</div>
              })
            }
          </div>
        : null
      }
      <input type={inputProperties ? inputProperties.inputType : "text"} 
        maxLength="256"  autoFocus 
        placeholder={inputProperties ? 'Type your answer here.' : ''} style={{color: 'rgb(150, 155, 166)'}}
        disabled={inputDisabled}
        value={value}
        onChange={onType}
        onKeyPress={onKeyPress}
      />
      <div className="send-icon" onClick={onSend}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#d7d7d7"
              d="M22 11.7v.3h-.1c-.1 1-17.7 9.5-18.8 9.1-1.1-.4 2.4-6.7 3-7.5.7-.7 11-1.6 11-1.6H17v-.2c0-.4-10.2-1-10.8-1.7-.6-.7-4-7.1-3-7.5C4.3 2.1 22 10.5 22 11.7z"
            ></path>
          </svg>
      </div>
    </div>
  )
}

