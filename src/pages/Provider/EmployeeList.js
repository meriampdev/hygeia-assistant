import React, { useState, useEffect } from 'react'
import './styles.scss'
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
import { getList, getQueue, updateCall } from '../../redux'
import WebRTC from './WebRTC'
import ViewMore from './ViewMore'

export default function EmployeeList(props) {
  const dispatch = useDispatch()
  const [ visible, setVisibility ] = useState(false)
  const [ viewMore, setViewMore ] = useState(false)
  const [ fileName, setFileName ] = useState("")
  const [ csvJson, setCSVJson ] = useState([])
  const [ fullDialogWidth, setDialogWitdh ] = useState(false)
  const dashboard = useSelector(state => state.dashboard)
  const socket_queue = useSelector(state => state.socket.call_queue)
  const call_list = useSelector(state => state.socket.call_list)
  const error_get_queue = useSelector(state => state.socket.error_get_queue)
  const [ call_queue, setList ] = useState(socket_queue)
  const [ callData, setCallData ] = useState(null)
  const history = useHistory()

  useEffect(() => {
    if(call_list && call_list.length > 0) {
      setList(call_list)
    }
  }, [call_list])

  const handleAnswerCall = (data) => {
    //  TODO: CHANGE LOGIC TO INCLUDE PROVIDER INFORMATION (WHO ANSWERED WHAT CALL)
    dispatch(updateCall(data.roomKey, 'ANSWERED'))
    setCallData(data)
    setVisibility(true)
  }

  const handleViewMore = (data) => {
    setCallData(data)
    setViewMore(true)
  }

  const handleStopCall = () => {
    // TODO: Update list on close
    setCallData(null)
    setVisibility(false)
  }

  return (
    <Grid style={{maring: 0, width: '100%'}}>
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
          tableData={call_list}
        />
      </Cell>
      {
        visible ? 
          <Dialog visible={true} handleCancel={() => setVisibility(false)} nativeProps={{ fullScreen: true, className: 'vc-interface-dialog' }} noActionBtns={true} >
            <WebRTC callData={callData} closeCall={handleStopCall} URL="wss://hygeia-vc-server.herokuapp.com/" />
          </Dialog>
        : null
      }
      {
        viewMore ? 
          <Dialog handleCancel={() => setViewMore(false)} title="Client Data" visible={true} >
            <ViewMore data={callData} />
          </Dialog>
        : null
      }
    </Grid>
  )
}