import React from 'react'
import './navbar.scss'
import Button from 'react-md/lib/Buttons/Button'
import { useHistory } from 'react-router-dom'

export default function NavBar(props) {
  const history = useHistory()
  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          <div className='img-logo' onClick={() => history.push('/')}>
            <img src={require('../../sass/logo.png')} alt="Global Health Way" />
          </div>
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      
      <div className="nav-links">
        {
          history.location.pathname !== '/login' ? 
            <Button onClick={() => history.push('/login')} flat 
              style={{border: '1px solid var(--primary-color)'}}>Sign In</Button>
          : null
        }
      </div>
    </div>
  )
}