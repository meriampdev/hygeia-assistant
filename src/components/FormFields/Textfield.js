import React, { useState, useEffect } from 'react'
import TextField from 'react-md/lib/TextFields/TextField'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import isValid from './validationHelper'

export default function Text(props) {
  let defaultValue = props.defaultProps.type === 'date' ? new Date() : ""
  const [ value, setValue ] = useState(defaultValue)
  const [ validation, setValidation ] = useState({})
  useEffect(() => {
    if(props.submitAttempt) {
      if(props.validations.length > 0) {
        let isError = [], message = []
        props.validations.map((rule) => {
          let result = isValid(rule, value)
          isError.push(result.isError)
          message.push(result.message)

        })
        setValidation({ error: isError.includes(true), message: message })
        props.onInputError(props.fieldKey, isError.includes(true))
      }
    }
  }, [props.submitAttempt])

  const onChange = (val) => {
    setValidation({})
    setValue(val)
    props.onInputChange(props.fieldKey, val, props.data)
  }

  return (
    <TextField {...props.defaultProps}
      onChange={(val) => onChange(val)}
      value={value}
      error={validation.error}
      errorText={validation.message}
      leftIcon={props.leftIcon ? <FontIcon>{props.leftIcon}</FontIcon> : null}
      rightIcon={props.rightIcon ? <FontIcon>{props.rightIcon}</FontIcon> : null}
    />
  )
}