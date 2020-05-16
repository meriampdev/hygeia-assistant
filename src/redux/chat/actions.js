import axios from 'axios'
import { USER_SEND_ANSER, SET_INPUT_TYPING, TRIGGER_NEXT, DIAGNOSIS, STOP_QUESTIONS } from './types'
import { localStorageSetResponses } from '../../utils/easyLocalStorage'
import { getLikeSymptoms } from '../../utils/api'

function requestSymptomSuggestion(value) {
  let suggestions = getLikeSymptoms(value)
  localStorageSetResponses('bodyAreaSymptoms', suggestions)
}

export function userSendAnswer(payload) {
	const { inputProperties, value } = payload
  localStorageSetResponses(inputProperties.inputKey, value)

  if(inputProperties.inputKey === 'bodyAreaSelection') {
    requestSymptomSuggestion(value)
  }

	return function(dispatch) {
    dispatch({ type: TRIGGER_NEXT, payload: payload })
    dispatch( {
      type: USER_SEND_ANSER,
      payload: payload
    })
  }
}

export function setInputTyping(payload) {
  return {
    type: SET_INPUT_TYPING,
    payload: payload
  }
}

export function startDiagnosis(payload) {
  const request = axios.post('https://api.infermedica.com/v2/diagnosis', payload, {
    headers: {
      'App-Id': process.env.REACT_APP_APP_ID,
      'App-Key': process.env.REACT_APP_APP_KEY,
      'Content-Type': 'application/json'
    }
  })
  return {
    type: DIAGNOSIS,
    request: request
  }
}

export function stopQuestions(payload) {
  return { type: STOP_QUESTIONS, payload: payload }
}