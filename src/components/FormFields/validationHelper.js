export default function Helper(rule, value, inputLength) {
  switch(rule) {
    case 'required':
    {
      let isError = value === '' || typeof value === null || typeof value === undefined
      let message = isError ? 'This Field is Requried.' : ''
      return { isError, message }
    }
    case 'email':
    {
      let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isError = !(regex.test(value))
      let message = isError ? 'Invalid Format' : ''
      return { isError, message }
    }
    case 'us-phone-number-formatted':
    {
      let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      let isError = !(regex.test(value))
      let message = isError ? 'Invalid Format' : ''
      return { isError, message }
    }
    case 'us-phone-number-unformatted':
    {
      let regex = /^\+1\d{10}$/
      let isError = !(regex.test(value))
      let message = isError ? 'Invalid Format' : ''
      return { isError, message }
    }
    case 'number-with-length':
    {
      let isError, message
      if(isNaN(value)) { 
        isError = true 
        message = 'Not a number.'
      } else {
        isError = value && value.length !== inputLength
        message = 'Invalid length.'
      }
      return { isError, message }
    }
    case 'date':
    {

    }
    default:
      return { isError: false, message: '', noRule: true }
  }
}