import { LOG_IN, FACEBOOK_AUTH, GOOGLE_AUTH } from './types'

export const login = (payload) => {
  return {
    type: LOG_IN,
    payload: payload
  }
}

export const facebookAuth = (payload) => {
  return {
    type: FACEBOOK_AUTH,
    payload: { domain: 'facebook', data: payload }
  }
}

export const googleAuth = (payload) => {
  return {
    type: GOOGLE_AUTH,
    payload: { domain: 'google', data: payload }
  }
}