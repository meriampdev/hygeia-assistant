import { LOG_IN } from './types'

const initialState = {
  authenticated: false,
  loading: false,
  token_validation: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, authenticated: true, loading: false }
    default:
      return state;
  }
}

export default authReducer;
