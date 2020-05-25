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
import Layout from './components/LayoutNoDrawer'

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
            <ChatSignup />
          )} />

          <Route exact path="/call" render={(props) => (
            <Call />
          )} />

          <Route path="/auth" render={(props) => (
            <Layout />
          )} />

          <Route  path="*" render={(props) => (
            <div>Not Found</div>
          )} />
        </Switch>
    </Router>
  )
}