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
        <TextField value={data.patientName} label="Name" inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell size={4}>
        <TextField value={data.gender} label="Gender" inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell size={4}>
        <TextField value={data.age} label="Age" inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell size={12}>
        <TextField label="Symptom Group" fullWidth value={textgroup} inputProps={{readOnly: true}} variant="filled" />
      </Cell>
      <Cell size={12} className='symptoms'>
        <TextField label="Symptoms" fullWidth value={stext} multiline rowsMax={6}
          inputProps={{readOnly: true }} variant="filled" 
        />
      </Cell>
    </Grid>
  )
}