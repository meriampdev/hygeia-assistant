import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendAnswer } from '../../redux'
import { localStorageSetResponses } from '../../utils/easyLocalStorage'
import { getLikeSymptoms } from '../../utils/api'

export default function MessageInput(props) {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState("")
  const [ suggestionList, setSuggestions ] = useState([])
  const inputProperties = useSelector(state => state.chat.inputProperties)
  const inputDisabled = useSelector(state => state.chat.inputDisabled)

  const onSend = () => {
    dispatch(sendAnswer({ ...inputProperties, value: value }))
    setValue("")
  }

  const onKeyPress = (e) => {
    e.persist()
    if(e.key === 'Enter') {
      dispatch(sendAnswer({ ...inputProperties, value: value }))
      setValue("")
    } 
  }

  const onType = (e) => {
    e.persist()
    setValue(e.target.value)
  }

	return (
    <div className="typing" style={{background: 'rgb(255, 255, 255)', borderTopColor: 'rgb(234, 234, 234)'}}>
      <input type={inputProperties ? inputProperties.inputType : "text"} 
        maxLength="256"  autoFocus 
        placeholder={inputProperties ? 'Type your answer here.' : ''} style={{color: '#000'}}
        disabled={inputProperties === null}
        value={value}
        onChange={onType}
        onKeyPress={onKeyPress}
      />
      <div className="send-icon" onClick={onSend}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#00796b"
              d="M22 11.7v.3h-.1c-.1 1-17.7 9.5-18.8 9.1-1.1-.4 2.4-6.7 3-7.5.7-.7 11-1.6 11-1.6H17v-.2c0-.4-10.2-1-10.8-1.7-.6-.7-4-7.1-3-7.5C4.3 2.1 22 10.5 22 11.7z"
            ></path>
          </svg>
      </div>
    </div>
  )
}

