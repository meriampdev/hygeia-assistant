import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './auth/reducer';
import chatReducer from './chat/reducer';
import socketReducer from './socket/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  socket: socketReducer
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

export default store;
