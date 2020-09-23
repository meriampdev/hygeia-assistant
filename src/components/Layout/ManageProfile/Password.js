import React, { useState, useEffect } from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Textfield from '../../FormFields/Textfield'
import Button from 'react-md/lib/Buttons/Button'

export default function Password(props) {
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
      <Cell size={12}>
        <Textfield
          defaultProps={{ id: "currentPassword", type: "password", label: "Current Password" }}
          fieldKey="currentPassword" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={12}>
        <Textfield
          defaultProps={{ id: "newPassword", type: "password", label: "New Password" }}
          fieldKey="newPassword" 
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