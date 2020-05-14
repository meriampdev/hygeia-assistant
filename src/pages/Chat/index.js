import React, { useState } from 'react'
import './styles/index.scss'
import Header from '../../components/Header'
import ChatBody from './ChatBody'
import Chatv2 from './ChatBody/Chatv2'
import ProgressBar from './ProgressBar'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'

export default function Chat(props) {
  const [ progress, setProgress ] = useState(0)
  const [ stepsCount, setStepsCount ] = useState(0)

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const onLoadForms = (count) => {
    setStepsCount(count)
  }

  return (
    <Grid style={{padding: 0}}>
      <Cell size={4} style={{margin: 0}}></Cell>
      <Cell size={4} style={{margin: 0}}>
        <div className='Chat'>
          <Header />
          {/*<ChatBody onProgress={onProgress} onLoadForms={onLoadForms} />*/}
          <Chatv2 />
          {
            progress ? 
              <div className="footer-progress">
                <ProgressBar progress={progress} stepsCount={stepsCount} />
              </div>
            : null
          }
        </div>
      </Cell>
      <Cell size={4} style={{margin: 0}}></Cell>
    </Grid>
  )
}