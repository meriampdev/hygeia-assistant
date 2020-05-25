import React from 'react'
import './loader.scss'

export default function LoaderWithLogo(props) {
  return (
    <div className='loader-logo-wrapper'>
      <div className='inner-wrapper'>
        <div className="loader loader-1">
          <div className="loader-outter"></div>
          <div className='logo-container'><img src={require('./hygeia-logo-icon.png')} alt='hygeia-logo' /></div>
          <div className="loader-inner"></div>
        </div>
      </div>
    </div>
  )
}