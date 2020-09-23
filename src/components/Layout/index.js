import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavigationDrawer } from 'react-md';
import { toTitle } from '../../utils/strings';
import { useHistory } from "react-router-dom"
import NavItemLink from '../NavItemLink';
import ContentCard from './ContentCard'
import UserProfile from './UserProfile'

const styles = {
  content: { minHeight: 'auto' },
};

export default function DrawerLayout(props) {
  const history = useHistory()
  const location = history.location
  const [ toolbarTitle, setToolbarTitle ] = useState("")
  const navItems = props.navItems
  useEffect(() =>{
    if(history.location.pathname) {
      const pathname = history.location.pathname
      const lastSection = pathname.substring(pathname.lastIndexOf('/') + 1);
      if (lastSection === 'navigation-drawers') {
        return 'Inbox';
      }

      let title = toTitle(lastSection);
      setToolbarTitle(title)
    }
    
  },[history.location.pathname])

  return (
    <NavigationDrawer
      toolbarTitle={toolbarTitle}
      toolbarActions={<UserProfile />}
      mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
      tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
      desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
      navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
      contentId="main-demo-content"
      contentStyle={styles.content}
      contentClassName="md-grid"
    >
      <div className='page-content-container'>
      <Switch key={location.pathname}>
        {
          navItems.map((item) => {
            return <Route key={`navItem-${item.to}`} exact path={item.to} 
              component={() => item.component ? item.component : <ContentCard title={item.label} />} />
          })
        }
      </Switch>
      </div>
    </NavigationDrawer>
  );
}