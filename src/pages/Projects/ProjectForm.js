import React, { useState, useEffect } from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Paper from 'react-md/lib/Papers/Paper'
import Textfield from '../../components/FormFields/Textfield'
import SelectField from 'react-md/lib/SelectFields/SelectField'
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

  const clientList = [
    { label: 'Client 1', value: 1 },
    { label: 'Client 2', value: 2 },
    { label: 'Client 3', value: 3 }
  ]

  //| Name | Description | Est. Hours | isMilestone
  return (
    <Grid>
      <Cell size={6}>
        <Textfield
          defaultProps={{ id: "projectName", type: "text", label: "Project Name" }}
          fieldKey="projectName" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={6}>
        <Textfield
          defaultProps={{ id: "estHoursOfCompletion", type: "number", label: "Estimated Hours of Completion" }}
          fieldKey="estHoursOfCompletion" 
          onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
          validations={['required']}
        />
      </Cell>
      <Cell size={12}>
        <SelectField
          id="select-field-6" fullWidth
          placeholder="Select Client"
          menuItems={clientList}
          position={SelectField.Positions.BELOW}
          simplifiedMenu={true}
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