import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendAnswer } from '../../redux'
import { localStorageSetResponses } from '../../utils/easyLocalStorage'
import { getLikeSymptoms } from '../../utils/api'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import 'react-responsive-select/dist/ReactResponsiveSelect.css'
import RRS from 'react-responsive-select'
import _ from 'lodash'

export default function MessageInput(props) {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState("")
  const [ suggestionList, setSuggestions ] = useState([])
  const inputProperties = useSelector(state => state.chat.inputProperties)
  const inputDisabled = useSelector(state => state.chat.inputDisabled)
  const [ options, setOptions ] = useState(null)
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    let selectedDate = moment(date).format('YYYY-MM-DD')
    dispatch(sendAnswer({ ...inputProperties, value: selectedDate }))
  };

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

  let hideSendIcon = false
  let inputElement = (
      <input type={inputProperties ? inputProperties.inputType : "text"} 
        maxLength="256"  autoFocus 
        placeholder={inputProperties ? 'Type your answer here.' : ''} style={{color: '#000'}}
        disabled={inputProperties === null}
        value={value}
        onChange={onType}
        onKeyPress={onKeyPress}
      />
    )
  if(inputProperties) {
    if(inputProperties.inputType === 'select' && options) {
      inputElement = (
          <RRS
            options={options}
            onChange={(selected, e) => { dispatch(sendAnswer({ ...inputProperties, value: selected.value })) }}
          />
        )
      hideSendIcon = true
    } else if(inputProperties.inputType === 'datePicker') {
      inputElement = (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label=""
            format="MM/dd/yyyy"
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      )
      hideSendIcon = true
    }
  }

	return (
    <div className="typing" style={{background: 'rgb(255, 255, 255)', borderTopColor: 'rgb(234, 234, 234)'}}>
      {inputElement}
      {
        !hideSendIcon ? 
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

