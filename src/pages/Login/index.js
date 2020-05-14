import React, { useState, useEffect } from 'react'
import GridFullHeight from '../../components/GridFullHeight'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Paper from 'react-md/lib/Papers/Paper'
import Textfield from '../../components/FormFields/Textfield'
import Button from 'react-md/lib/Buttons/Button'

export default function Login(props) {
  const [ formData, setFormData ] = useState({ username: '', password: '' })
  const [ formErrors, setFormErrors ] = useState({})
  const [ submitAttempt, setAttempt ] = useState(0)

  useEffect(() => {
    if(submitAttempt) {
      // submit logic here.. 
    }
  }, [formErrors])

  const onInputChange = (key, value) => {
    setFormData( prevState => ({ ...prevState, [key]: value }) )
  }

  const onInputError = (key, value) => {
    setFormErrors( prevState => ({ ...prevState, [key]: value }))
  }

  return (
    <GridFullHeight position="center" align="middle">
      <Cell size={4}></Cell>
      <Cell size={4} className="fullHeight-center-content flex-column">
        <h1>Easy</h1>
        <Paper className="md-background--card md-text-container">
          <Grid>
            <Cell size={12}>
              <Textfield
                defaultProps={{ id: "username", type: "text", label: "Username" }}
                fieldKey="username" leftIcon="alternate_email"
                onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
                validations={['required']}
              />
            </Cell>
            <Cell size={12}>
              <Textfield  
                defaultProps={{ id: "password", type: "password", label: "Password", passwordIcon: null }}
                fieldKey="password" leftIcon="visibility"
                onInputError={onInputError} onInputChange={onInputChange} submitAttempt={submitAttempt}
                validations={['required']}
              />
            </Cell>
            <Cell size={12}>
              <Button onClick={() => setAttempt( prevAttempt => prevAttempt + 1 )} flat primary swapTheming>Log In</Button>
            </Cell>
          </Grid>
        </Paper>
      </Cell>
      <Cell size={4}></Cell>
    </GridFullHeight>
  )
}