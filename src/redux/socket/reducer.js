import { ADD_TO_QUEUE, SET_CALL_CONNECTOR, GET_QUEUE, ERROR_GET_QUEUE, RMEOVE_FROM_QUEUE } from './types'

const initialState = {
  call_queue: [],
  callConnector: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_QUEUE:
    {
      let newData = action.payload.userData
      let newQueue = [ newData, ...state.call_queue ]
      return { ...state, call_queue: newQueue }
    }
    case SET_CALL_CONNECTOR:
      return { ...state, callConnector: action.payload }
    case GET_QUEUE:
    {
      return { ...state, call_queue: action.payload, error_get_queue: false }
    }
    case RMEOVE_FROM_QUEUE:
    {
      let newList = state.call_queue.filter(f => f.id !== action.payload)
      return { ...state, call_queue: newList, error_get_queue: false }
    }
    case ERROR_GET_QUEUE:
      return { ...state, call_queue: [], error_get_queue: true }
    default:
      return state;
  }
}

export default authReducer;
