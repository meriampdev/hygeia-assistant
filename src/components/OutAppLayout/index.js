import React from 'react'
import './style.scss'
import NavBar from '../NavBar'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'

export default function OutAppLayout(props) {
	return (
    <div style={{height: '100%'}}>
      <NavBar />
      <Grid className='content-container'>
        <Cell size={12}>
          {props.children}
        </Cell>
      </Grid>
    </div>
  )
}
