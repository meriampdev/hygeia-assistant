import React, { useState } from 'react'
import './landingpage.scss'
import ChatWidget from '../../components/ChatWidget'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Button from 'react-md/lib/Buttons/Button'
import Chatv2 from '../Chat/ChatBody/Chatv2'
import NavBar from '../../components/NavBar'

export default function LandingPage(props) {
  const [ widgetOpen, setWidget ] = useState(false)
  return (
    <div style={{height: '100%'}}>
      <NavBar />
      <Grid className='grid-container'>
        <div className='page-content'>
          <section className="hero-content">
            <header className="hero-main">
                <h2 className="herom-main-text">You can take charge of your health and well-being by using your mobile device.</h2>
            </header>
            <div className='get-started'>
              <Button onClick={() => { setWidget(!widgetOpen) }} flat primary swapTheming >Get Started</Button>
            </div>
            <div className="hero-items md-grid">
              <div className="hero-item md-cell md-cell--4 md-cell--center">
                  <div className="hero-icon">
                    <img src="https://img.icons8.com/wired/64/000000/private2.png" />
                  </div>
                  <div className='hero-text'>
                      It is a highly secure and user-friendly platform 
                      that provides real-time connection between you and your doctor or your healthcare provider.
                  </div>
              </div>
              <div className="hero-item md-cell md-cell--4 md-cell--center">
                  <div className="hero-icon">
                    <img src="https://img.icons8.com/carbon-copy/100/000000/form.png"/>
                  </div>
                  <div className='hero-text'>
                      Our Remote Medical Consultation platform 
                      enables you to send a request for consultation 
                      to all appropriate board-certified healthcare providers according to the symptoms that you provide. 
                  </div>
              </div>
              <div className="hero-item md-cell md-cell--4 md-cell--center">
                  <div className="hero-icon">
                    <img src="https://img.icons8.com/carbon-copy/100/000000/medical-doctor.png"/>
                  </div>
                  <div className='hero-text'>
                      You will  have access to hundreds of community providers
                      waiting to speak with you as soon as you complete the Symptoms Q&A with Hygeia.
                  </div>
              </div>
            </div>
          </section>
        </div>
      </Grid>
      <ChatWidget open={widgetOpen} toggleWidget={() => setWidget(!widgetOpen)}>
        <Chatv2 />
      </ChatWidget>
    </div>
  )
} 