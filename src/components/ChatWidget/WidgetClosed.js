import React from 'react'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'

export default function WidgetIcon(props) {
  console.log('WidgetIcon', props)
  
  return (
    <div id="app" className="chat-widget" data-align="right" onClick={props.toggleWidget}>
        <div className="chat-widget-wrapper chat-widget-responsive">
          <div data-align="right" className="minimized">
            <div className="theme-bubble" style={{background: 'var(--primary-color)'}}>
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FontIcon style={{ fontSize: '36px', color: '#FFFF' }}>message</FontIcon>
            </div>
            </div>
          </div>
        </div>
      </div>
  )
}