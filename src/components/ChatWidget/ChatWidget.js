import React from 'react'

export default function ChatWidget(props) {
  return (
    <div id="app" data-align="right">
      <div className="app-wrapper app-responsive">
        <div data-mobile="false" className="maximized">
          <div className="content-screen">
            <div data-shadow="true" className="top" style={{backround: 'rgb(255, 255, 255)'}} >
              <div className="close" onClick={props.toggleWidget}>
                  <div data-size="normal" className="tpl-close">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          fill="#5e6165"
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        ></path>
                      </svg>
                  </div>
              </div>
              <div className="avatar">
                  <div className="tpl-avatar">
                      <div className="tpl-avatar-status" style={{borderColor: 'rgb(255, 255, 255)', background: 'rgb(105, 222, 64)'}}></div>
                      <div className="tpl-avatar-image">
                          <div data-status="loaded" data-cover="true" className="lazy-img">
                            <img src="https://cdn.chatbot.com/widget/5ca71c7e431af645ebb0f6fc/eSHxrqmcEA__.png" alt="" className="lazy-img-loaded" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="company">
                  <div className="header" style={{color: 'rgb(0, 0, 0)'}}>
                      ChatBot
                  </div>
                  <div className="status" style={{color: 'rgb(155, 166, 179)'}}>
                      Online
                  </div>
              </div>
            </div>
            <div className="conversation" style={{background: 'rgb(234, 238, 243)'}}>
                
            </div>
            <div className="typing" style={{background: 'rgb(255, 255, 255)', borderTopColor: 'rgb(234, 234, 234)'}}>
              <input type="text" maxLength="256" placeholder="Type your message here" style={{color: 'rgb(150, 155, 166)'}} />
              <div className="send-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      fill="#d7d7d7"
                      d="M22 11.7v.3h-.1c-.1 1-17.7 9.5-18.8 9.1-1.1-.4 2.4-6.7 3-7.5.7-.7 11-1.6 11-1.6H17v-.2c0-.4-10.2-1-10.8-1.7-.6-.7-4-7.1-3-7.5C4.3 2.1 22 10.5 22 11.7z"
                    ></path>
                  </svg>
              </div>
            </div>
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