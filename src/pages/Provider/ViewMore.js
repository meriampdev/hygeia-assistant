import React from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import TextField from '@material-ui/core/TextField';

export default function ViewMore(props) {
  const { data } = props
  const symptomsGroup = data.symptomsGroup ? data.symptomsGroup.map((item) => item.label) : null
  let displaygroup = symptomsGroup ? symptomsGroup.join() : ''
  let textgroup = displaygroup ? displaygroup.replace(',',', ') : ''
  let symptoms = data.symptoms ? data.symptoms.join() : ''
  let stext = symptoms ? symptoms.replace(',',', ') : ''
  return (
     <Grid>
      <Cell size={4}>
        <div className='data-label'>Name</div>
      </Cell>
      <Cell size={4}>
        <div className='data-label'>Gender</div>
      </Cell>
      <Cell size={4}>
        <div className='data-label'>Age</div>
      </Cell>
      <Cell size={4}>
        <TextField value={data.patientName} inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell size={4}>
        <TextField value={data.gender} inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell size={4}>
        <TextField value={data.age} inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell size={12}>
        <div className='data-label'>Symptom Group</div>
      </Cell>
      <Cell size={12}>
        <TextField fullWidth value={textgroup} inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell>
        <div className='data-label'>Selected Symptoms</div>
      </Cell>
      <Cell size={12} className='symptoms'>
        <TextField fullWidth value={stext} inputProps={{readOnly: true}} variant="filled" />
      </Cell>
     </Grid>
  )
}