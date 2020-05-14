import React, { useState } from 'react'
import GridFullHeight from '../../components/GridFullHeight'
import ChatWidget from '../../components/ChatWidget'
// import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Button from 'react-md/lib/Buttons/Button'

export default function LandingPage(props) {
  const [ widgetOpen, setWidget ] = useState(false)
  return (
    <GridFullHeight position="center" align="middle">
      <Cell size={12}>
        <Button flat primary swapTheming>Open</Button>
        Landing Page Yeah
      </Cell>

      <ChatWidget open={widgetOpen} toggleWidget={() => setWidget(!widgetOpen)} />
    </GridFullHeight>
  )
} 