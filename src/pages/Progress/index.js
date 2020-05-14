import React, { useState } from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Paper from 'react-md/lib/Papers/Paper'
import DataTable from '../../components/DataTable'
import Button from 'react-md/lib/Buttons/Button'
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer'
import SelectField from 'react-md/lib/SelectFields/SelectField'
import ProgressForm from './ProgressForm'

export default function Progress(props) {
  const [ visible, setVisibility ] = useState(false)

  const columns = [
    { title: 'Date',
      field: 'created_at', fieldType: 'date', format: 'YYYY/MM/DD',
      filterType: 'date', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'created_at' },
    },
    { title: 'Description',
      field: 'description', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'name' },
      className: 'truncate-text'
    },
    { title: 'Hours Spent',
      field: 'hours', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'name' },
      className: 'truncate-text'
    },
    { title: 'Status',
      field: 'hours', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'name' },
      className: 'truncate-text'
    },
  ]

  const projectList = [
    { label: 'Project 1', value: 1 },
    { label: 'Project 2', value: 2 },
    { label: 'Project 3', value: 3 }
  ]

  return (
    <Grid>
      <Cell size={12}>
        <Grid>
          <Cell size={4}><Button onClick={() => setVisibility(true)} flat primary swapTheming>Add Progress</Button></Cell>
          <Cell size={4}></Cell>
          <Cell size={4}><Button onClick={() => window.open('https://hygeia-demo.herokuapp.com')} flat primary swapTheming>Go to App</Button></Cell>
        </Grid>
      </Cell>
      <Cell size={12}>
        <SelectField
          id="select-field-6"
          placeholder="Select Project"
          className="md-cell"
          menuItems={projectList}
          position={SelectField.Positions.BELOW}
          simplifiedMenu={true}
        />
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
          tableColumns={columns}
          tableData={[]}
        />
      </Cell>
      <DialogContainer id="simple-list-dialog" title="Simple List Dialog" focusOnMount={false}
        width="50%"
        onHide={() => setVisibility(false)} visible={visible}
      >
        <ProgressForm />
      </DialogContainer>
    </Grid>
  )
}