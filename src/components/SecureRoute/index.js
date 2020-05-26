import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoaderWithLogo from '../LoaderWithLogo'
import { googleAuth } from '../../redux'

export default function SecureRoute(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const [ component, setComponent ] = useState(<LoaderWithLogo />)
  const [ gapiInstance, setGapiInstance ] = useState(null)
  const auth = useSelector(state => state.auth)

  const onFulfilled = (data) => {
    if(data.isSignedIn.le) {
      dispatch(googleAuth({ name: data.currentUser.le.Tt.Bd }))
      setComponent(props.component)
      let instance = window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'profile'
      })
      setGapiInstance(instance)
    } else {
      history.push('/')
    }
  } 

  const onRejected = (data) => {
    alert("Google authentication has errored.")
    setComponent(<Redirect to='/' />)
  }

  if(!gapiInstance && window.gapi) {
    window.gapi.load('auth2', function() {
      window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'profile'
      }).then(onFulfilled, onRejected)
    })
  } 

  if(gapiInstance) {
    if(!gapiInstance.isSignedIn.le) {
      history.push('/')
    }
  }

  return component
}