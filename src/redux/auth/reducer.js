import { LOG_IN, FACEBOOK_AUTH, GOOGLE_AUTH } from './types'

const initialState = {
  authenticated: false,
  loading: false,
  token_validation: false,
  authDomain: '',
  data: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, data: action.payload, loading: false }
    case FACEBOOK_AUTH:
      return { ...state, data: action.payload }
    case GOOGLE_AUTH:
      return { ...state, data: action.payload }
    default:
      return state;
  }
}

export default authReducer;
