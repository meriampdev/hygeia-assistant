import { USER_SEND_ANSER, SET_INPUT_TYPING, TRIGGER_NEXT } from './types'

export function userSendAnswer(payload) {
	const { inputProperties, value } = payload
	let responses = localStorage.getItem('responses') ? JSON.parse(localStorage.getItem('responses')) : {}
	responses[inputProperties.inputKey] = value
	localStorage.setItem('responses', JSON.stringify(responses))
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