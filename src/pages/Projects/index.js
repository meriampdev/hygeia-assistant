import React, { useState } from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Paper from 'react-md/lib/Papers/Paper'
import DataTable from '../../components/DataTable'
import Button from 'react-md/lib/Buttons/Button'
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer'
import ProjectForm from './ProjectForm'
import { columns } from './constants'

export default function Projects(props) {
  const [ visible, setVisibility ] = useState(false)
  const [ tableData, setTableData ] = useState([])

  const onSubmit = (data) => {
    setTableData(prevData =>([ ...prevData, data ]))
    setVisibility(false)
  } 
  
  return (
    <Grid>
      <Cell size={12}>
        <Grid>
          <Cell size={4}><Button onClick={() => setVisibility(true)} flat primary swapTheming>Add Project</Button></Cell>
        </Grid>
      </Cell>
      <Cell size={12}>
        <DataTable
          title="Yea!"
          options={{
            pageSize: 5,
            search: false,
            filtering: false,
            toolbar: false,
            actionsColumnIndex: -1
          }}
          tableColumns={columns()}
          tableData={tableData}
        />
      </Cell>
      <DialogContainer id="simple-list-dialog" title="Project" focusOnMount={false}
        width="50%"
        onHide={() => setVisibility(false)} visible={visible}
      >
        <ProjectForm onSubmit={onSubmit} />
      </DialogContainer>
    </Grid>
  )
}