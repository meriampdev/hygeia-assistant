import React, { useState, useEffect } from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import DataTable from '../../components/DataTable'
import FileButton from '../../components/FileButton'
import Dialog from '../../components/Dialog'
import Button from 'react-md/lib/Buttons/Button'
import { employeeListColumns, mockList, readCSV } from './constants'
import TextField from '@material-ui/core/TextField'
import { getQueue, updateCall } from '../../redux'
import WebRTC from './WebRTC'

export default function EmployeeList(props) {
  const dispatch = useDispatch()
  const [ visible, setVisibility ] = useState(false)
  const [ fileName, setFileName ] = useState("")
  const [ csvJson, setCSVJson ] = useState([])
  const [ fullDialogWidth, setDialogWitdh ] = useState(false)
  const dashboard = useSelector(state => state.dashboard)
  const socket_queue = useSelector(state => state.socket.call_queue)
  const error_get_queue = useSelector(state => state.socket.error_get_queue)
  const [ call_queue, setList ] = useState(socket_queue)
  const [ callData, setCallData ] = useState(null)
  const history = useHistory()

  useEffect(() => {
    if(socket_queue && socket_queue.length > 0) {
      setList(socket_queue)
    }
  }, [socket_queue])

  const handleAnswerCall = (data) => {
    //  TODO: CHANGE LOGIC TO INCLUDE PROVIDER INFORMATION (WHO ANSWERED WHAT CALL)
    dispatch(updateCall(data.roomKey, 'ANSWERED'))
    setCallData(data)
    setVisibility(true)
  }

  const handleViewMore = (data) => {
    console.log('handleViewMore data', data)
  }

  const handleStopCall = () => {
    // TODO: Update list on close
    setCallData(null)
    setVisibility(false)
  }

  return (
    <Grid>
      <Cell size={6}>
      </Cell>
      <Cell size={6}>
        <TextField id="outlined-basic" label="Search" variant="outlined" size="small" fullWidth />
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
          tableColumns={employeeListColumns(handleAnswerCall, handleViewMore)}
          tableData={call_queue}
        />
      </Cell>
      {
        visible ? 
          <Dialog visible={true} nativeProps={{ fullScreen: true, className: 'vc-interface-dialog' }} noActionBtns={true} >
            <WebRTC callData={callData} closeCall={handleStopCall} URL="wss://hygeia-vc-server.herokuapp.com/" />
          </Dialog>
        : null
      }
    </Grid>
  )
}