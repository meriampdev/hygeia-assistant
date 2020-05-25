import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoaderWithLogo from '../LoaderWithLogo'

const roleNoAccess = []
const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ authState, setAuthState ] = useState({ requesting: true, isAuth: false })
  const [ sentValidationRequest, setRequestStatus ] = useState({ sent: false, compareRoute: '' })
  const token_validation = useSelector(state => state.auth.token_validation);
  const token = localStorage.getItem('token');

  useEffect(() => {
    let userHasNavigated = (history.location.pathname !== sentValidationRequest.compareRoute)
    if(userHasNavigated) {
      // dispatch token validation
      setRequestStatus({ sent: true, compareRoute: history.location.pathname })
    }
  }, [history.location.pathname, sentValidationRequest, token])

  useEffect(() => {
    if(sentValidationRequest.sent && token_validation) {
      let authResponse = token_validation && !token_validation.error
      let newState = { ...authState, requesting: false, isAuth: authResponse }
      setAuthState(newState)
    }

  },[dispatch, token_validation, token])

  const roleHasAccess = (component) => {
    if(token_validation && token_validation.role) {
      let noAccessList = roleNoAccess[token_validation.role] || []
      if(noAccessList.length > 0) {
        let basePaths = noAccessList.map((path) => {
          return history.location.pathname.includes(path)
        })
        let hasNoAccess = basePaths.includes(true)
        // add other logic on what to render, e.g. redirect if any
        return hasNoAccess ? <div>You have no power here.</div> : component
      } else {
        return component
      }
    } else {
      return component
    }
  }

  const decideRender = () => {
    if(props.whenAuthRedirect) {
      return authState.isAuth ? <Redirect to={props.whenAuthRedirect} /> : roleHasAccess(props.component)
    } else {
      return authState.isAuth ? roleHasAccess(props.children) : <Redirect to={props.redirectTo} />
    }
  }

  let toRender = <LoaderWithLogo /> // just display loader if request has not yet been sent (this is onload scenario)

  if(sentValidationRequest.sent) {  // if validationRequest is done
    if(!token) {
      toRender = decideRender()
    } else {
      if(!authState.requesting) {
        toRender = decideRender()
      }
    }
  }

  return toRender
}

export default ProtectedRoute;
