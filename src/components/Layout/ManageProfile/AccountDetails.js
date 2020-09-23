import React, { useState, useEffect } from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Textfield from '../../FormFields/Textfield'
import Button from 'react-md/lib/Buttons/Button'

export default function AccountDetails(props) {
  const [ formData, setFormData ] = useState({})
  const [ formErrors, setFormErrors ] = useState({})
  const [ submitAttempt, setAttempt ] = useState(0)

  useEffect(() => {
    if(submitAttempt) {
      // submit logic here.. 
      let errors = Object.keys(formErrors).map((key) => formErrors[key])
      if(!errors.includes(true)) {
        props.onSubmit(formData)
      }
    }
  }, [formErrors])

  const onInputChange = (key, value) => {
    setFormData( prevState => ({ ...prevState, [key]: value }) )
  }

  const onInputError = (key, value) => {
    setFormErrors( prevState => ({ ...prevState, [key]: value }))
  }

  return (
    <Grid>
      <Cell size={4}>
        <Textfield
          defaultProps={{ id: "firstName", type: "text", label: "First Name" }}
          fieldKey="firstName" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={4}>
        <Textfield
          defaultProps={{ id: "lastName", type: "text", label: "Last Name" }}
          fieldKey="lastName" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={4}>
        <Textfield
          defaultProps={{ id: "nickName", type: "text", label: "Nick Name" }}
          fieldKey="nickName" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={4}>
        <Textfield
          defaultProps={{ id: "mobileNumber", type: "tel", label: "Mobile Number" }}
          fieldKey="mobileNumber" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={4}>
        <Textfield
          defaultProps={{ id: "dateOfBirth", type: "date", label: "Date of Birth" }}
          fieldKey="dateOfBirth" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={4}>
        <Textfield
          defaultProps={{ id: "email", type: "email", label: "Email Address" }}
          fieldKey="email" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={6}>
        <Textfield
          defaultProps={{ id: "city", type: "text", label: "City" }}
          fieldKey="city" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={6}>
        <Textfield
          defaultProps={{ id: "state", type: "text", label: "State" }}
          fieldKey="state" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={6}>
        <Textfield
          defaultProps={{ id: "zipCode", type: "text", label: "Zip Code" }}
          fieldKey="zipCode" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={12}>
        <Button onClick={() => setAttempt( prevAttempt => prevAttempt + 1 )} flat primary swapTheming>Save</Button>
      </Cell>
    </Grid>
  )
}