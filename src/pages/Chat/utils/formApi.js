import signup_flow from './signup_flow'
import _ from 'lodash'

export const getConversationBlock = (index) => {
  let block = index < signup_flow.length ? signup_flow[index] : null
  return block
}

export const messageBuffer = () => {
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve()
    }, 1000);
  })
}