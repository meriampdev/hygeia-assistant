import React from 'react'
import './widget.scss'
import './chat-widget.scss'
import WidgetClosed from './WidgetClosed'
import ChatWidget from './ChatWidget'

export default function WidgetApp(props) {
  return (
    <div className={`widget-container ${props.open ? 'open' : ''}`}>
      {
        !props.open ?
          <WidgetClosed {...props} />
        : 
          <ChatWidget {...props} />
      }
    </div>
  )
}