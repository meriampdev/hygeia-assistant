import { USER_SEND_ANSER, SET_INPUT_TYPING, TRIGGER_NEXT, STOP_QUESTIONS, SEND_ANSWER } from './types'

const initialState = {
  inputDisabled: true,
  inputProperties: null,
  next: 0, dataForNext: null,
  should_stop: false,
  userAnswer: null
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
  	case SET_INPUT_TYPING:
  	 return { ...state, inputDisabled: false, inputProperties: action.payload }
    case USER_SEND_ANSER:
      return { ...state, userAnswer: true, inputDisabled: true, inputProperties: null }
    case TRIGGER_NEXT:
      return { ...state, next: state.next + 1, dataForNext: action.payload }
    case STOP_QUESTIONS:
      return { ...state, should_stop: action.payload }
    case SEND_ANSWER:
      return { ...state, userAnswer: action.payload }
    default:
      return state;
  }
}

export default chatReducer;
