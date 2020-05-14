import React from 'react'
import './navbar.scss'
import Button from 'react-md/lib/Buttons/Button'

export default function NavBar(props) {
	return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          <div className='img-logo'>
            <img src={require('../../../sass/logo.png')} alt="Global Health Way" />
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
        <Button>Sign In</Button>
      </div>
    </div>
  )
}