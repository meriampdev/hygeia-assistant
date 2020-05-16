import React from 'react'
import MessageInput from './MessageInput'
import SignupMessageInput from './SignupMessageInput'

export default function ChatWidget(props) {

  // device detection
  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

  return (
    <div className="chat-widget" data-align="right">
      <div className="chat-widget-wrapper chat-widget-responsive">
        <div data-mobile={isMobile} className="maximized">
          <div className="content-screen">
            <div data-shadow="true" className="top" style={{backround: 'rgb(255, 255, 255)'}} >
              <div className="close" onClick={props.toggleWidget}>
                  <div data-size="normal" className="tpl-close">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          fill="#FFFF"
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        ></path>
                      </svg>
                  </div>
              </div>
              <div className="avatar">
                  <div className="tpl-avatar">
                      <div className="tpl-avatar-image">
                          <div data-status="loaded" data-cover="true" className="lazy-img">
                            <img src={require('./hygeia-logo-icon.png')} alt="hygeia" className="lazy-img-loaded" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="company">
                  <div className="header">
                    Global Health Way 
                  </div>
              </div>
            </div>
            <div className="conversation" style={{background: 'rgb(234, 238, 243)'}}>
              {props.children}
            </div>
            {
              props.signUp ? <SignupMessageInput />
              : <MessageInput />
            }
            {/*<div className="tpl-powered-by" style="border-top-color: rgb(238, 238, 238); background: rgb(249, 249, 249);">
              <span>
                <span style="color: rgb(155, 166, 178);">Powered by</span> 
                <a target="_blank" href="https://www.chatbot.com/powered-by-chatbot?utm_source=chat_window&amp;utm_campaign=https%3A%2F%2Fwww.chatbot.com%2Fhelp%2Fchat-widget%2Fwidget-installation%2F" style="color: rgb(18, 91, 251);">ChatBot</a>
              </span>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}