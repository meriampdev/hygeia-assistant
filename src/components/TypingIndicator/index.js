import React from 'react'
import './typing.scss'

export default function Typing(props) {
  return (
  	<div data-padding="inline" className="tpl-response">
      <div className="bot-caption-response-wrapper">
        <div className="caption">
          <div className="avatar">
            <div className="tpl-avatar">
              <div className="tpl-avatar-image">
                <div data-status="loaded" data-cover="true" className="lazy-img">
                  <img src={require('./hygeia-logo-icon.png')} alt="hygeia-logo" className="lazy-img-loaded" />
                </div>
              </div>
            </div>
          </div> 
          <div data-type="bot" className="tpl-text-response-wrapper">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}