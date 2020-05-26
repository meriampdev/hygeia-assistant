import React, { useState, useEffect } from 'react'
import './styles.scss'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Paper from 'react-md/lib/Papers/Paper'
import Textfield from '../../components/FormFields/Textfield'
import Button from 'react-md/lib/Buttons/Button'
import OutAppLayout from '../../components/OutAppLayout'
import FacebookLogin from 'react-facebook-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { googleAuth } from '../../redux'
import GoogleLogin from 'react-google-login'

export default function Login(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [ headLine, setHeadLine ] = useState("Sign in with Phone Number")
  const [ defaultProps, setDefaultProps ] = useState({ id: "phoneNumber", type: "tel", label: "Phone" })
  const [ formData, setFormData ] = useState({ username: '', password: '' })
  const [ formErrors, setFormErrors ] = useState({})
  const [ submitAttempt, setAttempt ] = useState(0)

  const responseFacebook = (response) => {
    console.log(response);
    if (response.accessToken) {
      // window.open(`${process.env.REACT_APP_PROVIDER_SITE}/auth?domain=facebook`)
    } else {
      
    }
  }

  const responseGoogle = (response) => {
    console.log('responseGoogle', response);
    if (response.accessToken) {
      dispatch(googleAuth(response.profileObj))
      window.location.replace(`${process.env.REACT_APP_PAGE_URL}/provider`)
    } else {
      
    }
  }

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

  console.log('process', process.env.REACT_APP_GOOGLE_CLIENT_ID)
  console.log(process.env.REACT_APP_PROVIDER_SITE)

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
        {
          // <FacebookLogin
          //   appId={process.env.REACT_APP_FB_APP_ID}
          //   autoLoad={true}
          //   fields="name,email"
          //   scope="public_profile"
          //   callback={responseFacebook}
          //   icon="fa-facebook" />
        }
        {
          <button className="loginBtn loginBtn--facebook">
            Login with Facebook
          </button>
        }

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <button className="loginBtn loginBtn--google" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        </Cell>
      </Grid>
    </OutAppLayout>
    
  )
}