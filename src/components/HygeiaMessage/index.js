import React from 'react'
import './hygeia.scss'

export default function HygeiaMessage(props) {
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
          <div className="anchors tpl-text-response" style={{background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)"}}>
            {props.text ? props.text : props.children}
          </div>
          <div className="caption-text" style={{color: 'rgb(24, 25, 25)'}}>
            Hygeia
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}