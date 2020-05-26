import { ADD_TO_QUEUE, SET_CALL_CONNECTOR, GET_QUEUE, ERROR_GET_QUEUE, RMEOVE_FROM_QUEUE,
  GET_CALL_LIST } from './types'

const initialState = {
  call_queue: [],
  callConnector: null,
  call_list: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_QUEUE:
    {
      let newData = action.payload.userData
      let newQueue = [ newData, ...state.call_queue ]
      return { ...state, call_queue: newQueue, call_list: [ newData, ...state.call_list ] }
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
    case GET_CALL_LIST:
    {
      let list = action.payload.filter((f) => f.patientName)
      return { ...state, call_list: list, error_get_list: false }
    }
    case `${GET_CALL_LIST}_ERROR`:
      return { ...state, call_list: [], error_get_list: true }
    case ERROR_GET_QUEUE:
      return { ...state, call_queue: [], error_get_queue: true }
    default:
      return state;
  }
}

export default authReducer;
