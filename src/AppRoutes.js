import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import Call from './pages/Call'
import ChatSignup from './pages/Chat/ChatBody/SignUp'
import Layout from './components/Layout'
import SecureRoute from './components/SecureRoute'
import Provider from './pages/Provider'

export default function AppRoutes() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" render={(props) => (
            <LandingPage />
          )} />
          {/*<Route exact path="/" render={(props) => (
            <ProtectedRoute {...props} whenAuthRedirect='/home' component={<div>Login</div>} />
          )} />*/}
          <Route exact path="/login" render={(props) => (
            <Login />
          )} />

          <Route exact path="/signup" render={(props) => (
            <SignUp />
          )} />

          <Route exact path="/call" render={(props) => (
            <Call />
          )} />

          <Route exact path="/provider" render={(props) => (
            <Layout navItems={[
                {
                  label: 'Provider', path: '/provider',
                  to: `/provider`,
                  exact: true,
                  icon: 'assignment_ind',
                  component: <Provider />
                }
              ]} 
            />
          )} />
          {
            // <Route path="/provider" render={(props) => (
            //   <SecureRoute
            //     component={
            //       <Layout 
            //         indexRoute='/provider'
            //         indexComponent={<Provider />}
            //         navItems={[{
            //           label: 'Waiting Room', path: '/waitingroom',
            //           to: `/provider/waitingroom`,
            //           exact: true,
            //           icon: 'web',
            //           component: <Provider />
            //         }]}
            //       />
            //     } />
            // )} />
          }

          <Route  path="*" render={(props) => (
            <div>Not Found</div>
          )} />
        </Switch>
    </Router>
  )
}