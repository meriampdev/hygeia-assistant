import React, { useState, useEffect } from 'react'
import './signup.scss'
import OutAppLayout from '../../components/OutAppLayout'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Textfield from '../../components/FormFields/Textfield'
import Button from 'react-md/lib/Buttons/Button'
import Paper from 'react-md/lib/Papers/Paper'
import Divider from 'react-md/lib/Dividers/Divider'

export default function SignUp(props) {
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
    <OutAppLayout>
      <Paper className='signup-paper'>
        <Grid>
          <Cell size={12}>
            <h2 className='md-headline signup-headline'>Join Global Health Way Now!</h2>
          </Cell>
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
              defaultProps={{ id: "password", type: "password", label: "Password", passwordIcon: null }}
              fieldKey="password" leftIcon="visibility"
              onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
              validations={['required']}
            />
          </Cell>
          <Cell size={6}>
            <Textfield
              defaultProps={{ id: "confirmPassword", type: "password", label: "Confirm Password", passwordIcon: null }}
              fieldKey="confirmPassword" leftIcon="visibility"
              onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
              validations={['required']}
            />
          </Cell>
        </Grid>
        <Divider />
        <Grid>
          <Cell size={6}>
            <Textfield
              defaultProps={{ id: "streedAddressLine1", type: "text", label: "Street Address Line 1" }}
              fieldKey="streedAddressLine1" 
              onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
              validations={['required']}
            />
          </Cell>
          <Cell size={6}>
            <Textfield
              defaultProps={{ id: "streedAddressLine2", type: "text", label: "Street Address Line 2" }}
              fieldKey="streedAddressLine2" 
              onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
              validations={[]}
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
              defaultProps={{ id: "zipCodeFirst5", type: "text", label: "Zip Code (First 5)" }}
              fieldKey="zipCodeFirst5" 
              onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
              validations={['required']}
            />
          </Cell>
          <Cell size={6}>
            <Textfield
              defaultProps={{ id: "zipCodeNext4", type: "text", label: "Zip Code (Next 4)" }}
              fieldKey="zipCodeNext4" 
              onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
              validations={['required']}
            />
          </Cell>
          <Cell size={12}>
            <Button onClick={() => setAttempt( prevAttempt => prevAttempt + 1 )} flat primary swapTheming>Save</Button>
          </Cell>
        </Grid>
      </Paper>
    </OutAppLayout>
  )
}