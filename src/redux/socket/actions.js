import { ADD_TO_QUEUE, SET_CALL_CONNECTOR, GET_QUEUE, ERROR_GET_QUEUE, UPDATE_CALL_STATUS,
  RMEOVE_FROM_QUEUE, GET_CALL_LIST } from './types'
import axios from 'axios'

const API = process.env.REACT_APP_CONNECT_API
export const addToQueue = (call) => {
  return {
    type: ADD_TO_QUEUE,
    payload: call
  }
}

export const setCallConnector = (callConnector) => {
  return {
    type: SET_CALL_CONNECTOR,
    payload: callConnector
  }
}

export function getList(payload) {
  const request = axios.get(`${API}/client/call/list`)

  return dispatch => {
    return request.then((response) => {
      dispatch({
        type: GET_CALL_LIST,
        payload: response.data.list
      })
    }).catch((e) => {
      console.log('e', e.response)
      dispatch({
        type: `${GET_CALL_LIST}_ERROR`,
        error: e.response
      })
    })
  }
}

export function getQueue(payload) {
  const request = axios.get(`${API}/client/queue`)

  return dispatch => {
    return request.then((response) => {
      console.log('response', response)
      dispatch({
        type: GET_QUEUE,
        payload: response.data.queue
      })
    }).catch((e) => {
      console.log('e', e.response)
      dispatch({
        type: ERROR_GET_QUEUE,
        error: e.response
      })
    })
  }
}

export function removeQueue(payload) {
  return {
    type: RMEOVE_FROM_QUEUE,
    payload: payload
  }
}

export function updateCall(roomKey, status) {
  console.log('-----updateCall', roomKey, status)
  const request = axios.put(`${API}/client/call/update`, { roomKey, status })

  return dispatch => {
    return request.then((response) => {
      console.log('updateCall response', response)
      if(response.data.success) {
        dispatch({
          type: GET_QUEUE,
          payload: response.data.queue
        })
      }
    }).catch((e) => {
      console.log('e', e.response)
      dispatch({
        type: ERROR_GET_QUEUE,
        error: e.response
      })
    })
  }
}