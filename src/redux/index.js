import { login, facebookAuth, googleAuth } from './auth/actions';
import { userSendAnswer, setInputTyping, startDiagnosis, stopQuestions, sendAnswer } from './chat/actions';
import { addToQueue, setCallConnector, getQueue, updateCall, removeQueue } from './socket/actions'

export {
  login, facebookAuth, googleAuth,
  userSendAnswer, setInputTyping,
  startDiagnosis, stopQuestions,
  sendAnswer, 

  addToQueue, setCallConnector, getQueue, updateCall,
  removeQueue
};
