export const localStorageGet = (key, type) => {
  switch(type) {
    case 'object':
    {
      let data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
      return data
    }
    case 'array':
    {
      let data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
      return data
    }
    default:
    {
      let data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
      return data
    }
  }
}

export const localStorageSet = (key, value) => {
  let jstring = JSON.stringify(value)
  localStorage.setItem(key, jstring)
}

export const localStorageSetResponses = (key, value) => {
  let responses = localStorage.getItem('responses') ? JSON.parse(localStorage.getItem('responses')) : {}
  responses[key] = value
  let jstring = JSON.stringify(responses)
  localStorage.setItem('responses', jstring)
}

export const localStorageRemoveResponse = (key) => {
  let responses = localStorage.getItem('responses') ? JSON.parse(localStorage.getItem('responses')) : {}
  responses[key] = null
  let jstring = JSON.stringify(responses)
  localStorage.setItem('responses', jstring)
}