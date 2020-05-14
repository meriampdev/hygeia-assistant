import React, { useState, useEffect } from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Paper from 'react-md/lib/Papers/Paper'
import Textfield from '../../components/FormFields/Textfield'
import Button from 'react-md/lib/Buttons/Button'

export default function RoadMapForm(props) {
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

  //| Name | Description | Est. Hours | isMilestone
  return (
    <Grid>
      <Cell size={6}>
        <Textfield
          defaultProps={{ id: "roadName", type: "text", label: "Name" }}
          fieldKey="roadName" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={6}>
        <Textfield
          defaultProps={{ id: "estHours", type: "number", label: "Estimated Hours" }}
          fieldKey="estHours" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={12}>
        <Textfield  
          defaultProps={{ id: "description", type: "text", label: "Description" }}
          fieldKey="description"
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