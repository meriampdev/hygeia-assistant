import { LOG_IN, FACEBOOK_AUTH, GOOGLE_AUTH } from './types'

const initialState = {
  authenticated: false,
  loading: false,
  token_validation: false,
  auth: null,
  authDomain: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, authenticated: true, loading: false }
    case FACEBOOK_AUTH:
      return { ...state, auth: action.payload }
    case GOOGLE_AUTH:
      return { ...state, auth: action.payload }
    default:
      return state;
  }
}

export default authReducer;
