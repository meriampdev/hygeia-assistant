import React, { useState, useEffect } from 'react'
import './styles.scss'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Paper from 'react-md/lib/Papers/Paper'
import Textfield from '../../components/FormFields/Textfield'
import Button from 'react-md/lib/Buttons/Button'
import OutAppLayout from '../../components/OutAppLayout'

export default function Login(props) {
  const [ headLine, setHeadLine ] = useState("Sign in with Phone Number")
  const [ defaultProps, setDefaultProps ] = useState({ id: "phoneNumber", type: "tel", label: "Phone" })
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

  const onChangeLoginWith = () => {
    if(headLine.includes("Phone")) {
      setHeadLine("Sign in with Email")
      setDefaultProps({ id: "email", type: "email", label: "Email" })
    } else {
      setHeadLine("Sign in with Phone Number")
      setDefaultProps({ id: "phoneNumber", type: "tel", label: "Phone Number" })
    }
  }

  return (
    <OutAppLayout>
      <Grid position="center" align="middle">
        <Cell size={12}><h2>{headLine}</h2></Cell>
        <Cell size={12} className="fullHeight-center-content flex-column">
          <Paper className="md-background--card md-text-container">
            <Grid>
              <Cell size={12}>
                <Textfield
                  defaultProps={defaultProps}
                  fieldKey={defaultProps.type} leftIcon="alternate_email"
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
        <Cell size={12}>
          <Button onClick={onChangeLoginWith} flat primary swapTheming>
            Sign in with {defaultProps.id === 'email' ? 'Phone Number' : "Email"}
          </Button>
        </Cell>
        <Cell size={12}>
          <p>or continue with</p>
        </Cell>
        <Cell size={12}>
          <button className="loginBtn loginBtn--facebook">
            Login with Facebook
          </button>

          <button className="loginBtn loginBtn--google">
            Login with Google
          </button>
        </Cell>
      </Grid>
    </OutAppLayout>
    
  )
}