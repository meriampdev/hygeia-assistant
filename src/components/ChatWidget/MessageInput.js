import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSendAnswer, stopQuestions } from '../../redux'
import { localStorageSetResponses } from '../../utils/easyLocalStorage'
import { getLikeSymptoms } from '../../utils/api'
import 'react-responsive-select/dist/ReactResponsiveSelect.css'
import RRS from 'react-responsive-select'
import _ from 'lodash'

export default function MessageInput(props) {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState("")
  const [ options, setOptions ] = useState(null)
  const [ suggestionList, setSuggestions ] = useState([])
  const inputProperties = useSelector(state => state.chat.inputProperties)
  const inputDisabled = useSelector(state => state.chat.inputDisabled)

  useEffect(() => {
    if(inputProperties) {
      if(inputProperties.inputType === 'select') {
        if(inputProperties.optionType === 'range') {
          let end = inputProperties.rangeEnd
          if(inputProperties.rangeEnd === 'currentYear') {
            let date = new Date()
            end = date.getFullYear() + 1
          }
          let range = _.range(inputProperties.rangeStart, end)
          let optionList = range.map((item) => {
            return { text: item, value: item }
          })
          setOptions(optionList)
        } else if(inputProperties.optionType === 'given') {
          setOptions(inputProperties.options)
        }
      }
    }
  }, [inputProperties])

  console.log('inputProperties', inputProperties)
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
        inputProperties && inputProperties.inputType === 'select' && options ?
          <RRS
            options={options}
            onChange={(selected, e) => { dispatch(userSendAnswer({ inputProperties: inputProperties, value: selected.value })) }}
          />
        :
          <input type={inputProperties ? inputProperties.inputType : "text"} 
            maxLength="256"  autoFocus 
            placeholder={inputProperties ? 'Type your answer here.' : ''} style={{color: '#000'}}
            disabled={inputProperties === null}
            value={value}
            onChange={onType}
            onKeyPress={onKeyPress}
          />
      }
      {
        !(inputProperties && inputProperties.inputType === 'select' && options) ?
          <div className="send-icon" style={{pointerEvents: !value ? 'none': ''}} onClick={onSend}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="#00796b"
                  d="M22 11.7v.3h-.1c-.1 1-17.7 9.5-18.8 9.1-1.1-.4 2.4-6.7 3-7.5.7-.7 11-1.6 11-1.6H17v-.2c0-.4-10.2-1-10.8-1.7-.6-.7-4-7.1-3-7.5C4.3 2.1 22 10.5 22 11.7z"
                ></path>
              </svg>
          </div>
        : null
      }
     </div>
  )
}

