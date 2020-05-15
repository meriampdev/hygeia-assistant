import { USER_SEND_ANSER, SET_INPUT_TYPING, TRIGGER_NEXT } from './types'
import { localStorageSetResponses } from '../../utils/easyLocalStorage'

export function userSendAnswer(payload) {
	const { inputProperties, value } = payload
  localStorageSetResponses(inputProperties.inputKey, value)
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