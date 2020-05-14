import React from 'react'
import './user-message.scss'

export default function UserInputMessage({ children }) {
  return (
    <div data-padding="symmetrical" className="tpl-response">
    	<div className="user-response-wrapper">
        <div data-type="user" className="tpl-text-response-wrapper">
          <div className="anchors tpl-text-response" style={{background: 'var(--primary-color)', color: 'rgb(255, 255, 255)'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}