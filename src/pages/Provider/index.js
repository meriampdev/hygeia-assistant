import React from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import EmployeeList from './EmployeeList'
import { useDispatch } from 'react-redux'
import { getQueue } from '../../redux'

let sendstatus = false
export default function Dashboard(props) {
  const dispatch = useDispatch()
  const [ requestSent, setRequestStatus ] = React.useState(false)
  React.useEffect(() => {
    if(!sendstatus) {
      sendstatus = true
      dispatch(getQueue())
    }
  },[sendstatus])

  return (
    <Grid>
      <Cell style={{margin: 0}} size={12}><EmployeeList /></Cell>
    </Grid>
  )
}