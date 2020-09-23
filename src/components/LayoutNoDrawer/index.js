import React, { useState, useEffect } from 'react'
import './layout-nodrawer.scss'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Toolbar from 'react-md/lib/Toolbars/Toolbar'
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { setCallConnector } from '../../redux'
import UserProfile from './UserProfile'
import NavigationRow from './NavigationRow'
// import navItems from './NavItems'

import QueueSocket from './QueueSocket'
import Dialog from '../Dialog'

export default function Root(props) {
  const dispatch = useDispatch()
  const [ socket, initSocket ] = useState(null)
  const [ initSocketStatus, setInitSocketStatus ] = useState(false)
  const [ navItems, setNavItems ] = useState([])
  const history = useHistory()
  
  useEffect(() =>{
    setNavItems(props.navItems)
  },[props.navItems])

  console.log('NavigationRow', props)
  console.log('history', history)

  useEffect(() => {
    if(!initSocketStatus) {
      setInitSocketStatus(true)
      let URL=process.env.REACT_APP_VC_SIGNAL_SERVER
      let socketInstance = new WebSocket(URL)
      initSocket(socketInstance)
    }
  },[initSocketStatus])

  if(socket) {
    QueueSocket(socket, dispatch)
  }

  return (<Grid style={{margin: '0', padding: '0'}}>
      <Cell size={12} style={{margin: '0', width: '100%'}}>
        <Toolbar
          colored
          title={<NavigationRow navItems={navItems} />}
          actions={<UserProfile />}
        />
      </Cell>
      <Cell size={12}>
        <Switch key={history.location.path}>
          <Route exact path={props.indexRoute} >{props.indexComponent}</Route>
          {
            navItems.map((item) => {
              return <Route key={`navItem-${item.to}`} exact path={item.to} 
                component={() => item.component} />
            })
          }
        </Switch>
      </Cell>
    </Grid>)
}
// <WebRTC URL="wss://hygeia-vc-server.herokuapp.com/" />

