import { LOG_IN } from './types'

export const login = (payload) => {
  return {
    type: LOG_IN,
    payload: payload
  }
}