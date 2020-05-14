import React from 'react'
import Grid from 'react-md/lib/Grids/Grid'

export default function GridFullHeight(props) {
  return (
    <Grid style={{height: '100vh'}} {...props}>
      { props.children }
    </Grid>
  )
}