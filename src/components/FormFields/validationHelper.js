export default function Helper(rule, value) {
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
    case 'us-phone-number':
    {
      let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      let isError = !(regex.test(value))
      let message = isError ? 'Invalid Format' : ''
      return { isError, message }
    }
    case 'date':
    {

    }
    default:
      return { isError: false, message: '' }
  }
}