import React from 'react'
import './layout-nodrawer.scss'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Toolbar from 'react-md/lib/Toolbars/Toolbar'
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import UserProfile from './UserProfile'
import NavigationRow from './NavigationRow'
import navItems from './NavItems'

export default function LayoutNoDrawer(props) {
  const history = useHistory()
  return (
    <Grid style={{margin: '0', padding: '0'}} className='page-container'>
      <Cell size={12} style={{margin: '0', width: '100%'}}>
        <Toolbar
          style={{background: '#FFF'}}
          title={<NavigationRow navItems={navItems} />}
          actions={<UserProfile />}
        />
      </Cell>
      <Cell size={12} style={{height: '100%', minHeight: '100vh'}}>
        <Switch key={history.location.path}>
        {
          // <Route path='/provider/auth' exact component={() => <Provider />} />
        }
        {
          navItems.map((item) => {
            return <Route key={`navItem-${item.to}`} exact path={item.to} 
              component={() => item.component} />
          })
        }
        </Switch>
      </Cell>
    </Grid>
  )
}