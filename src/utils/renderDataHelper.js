export const removeMessageType = (dataArray, type, stepCode) => {
	let newArray = dataArray.map((item) => {
    if(item.code === stepCode) {
      // let newconversation = item.conversation.filter((f) => f.message.type !== 'button-option')
      let newconversation = item.conversation.map((f) => {
        if(f.message.type === type) {
          return { ...f, dontRender: true }
        } else {
          return f
        }
      })
      return { ...item, conversation: newconversation }
    } else { return item }
  })

  return newArray
}