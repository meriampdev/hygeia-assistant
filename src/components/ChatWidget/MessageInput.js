import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSendAnswer } from '../../redux'

export default function MessageInput(props) {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState("")
  const inputProperties = useSelector(state => state.chat.inputProperties)
  const inputDisabled = useSelector(state => state.chat.inputDisabled)

  const onSend = () => {
    dispatch(userSendAnswer({ inputProperties: inputProperties, value: value }))
    setValue("")
  }

  const onInput = (e) => {
    e.persist()
    if(e.key === 'Enter') {
      dispatch(userSendAnswer({ inputProperties: inputProperties, value: value }))
      setValue("")
    } 
  }

	return (
    <div className="typing" style={{background: 'rgb(255, 255, 255)', borderTopColor: 'rgb(234, 234, 234)'}}>
      <input type={inputProperties ? inputProperties.inputType : "text"} 
        maxLength="256"  autoFocus 
        placeholder={inputProperties ? 'Type your answer here.' : ''} style={{color: 'rgb(150, 155, 166)'}}
        disabled={inputDisabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onInput}
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