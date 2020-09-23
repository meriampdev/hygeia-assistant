import React, { useState } from 'react'
import MenuButton from 'react-md/lib/Menus/MenuButton'
import Subheader from 'react-md/lib/Subheaders/Subheader'
import Divider from 'react-md/lib/Dividers/Divider'
import { useHistory } from "react-router-dom"
import Dialog from '../Dialog'
import ManageProfile from './ManageProfile'

export default function UserProfile({ id, className }) {
  // let token = localStorage.getItem('token')
  // let decoded = jwt.decode(token)
  const [ visible, setVisibility ] = useState(false)
  const history = useHistory()
  let decoded = {}

  return (
    <div className='header-user-section'>
      <MenuButton
        id='UserProfile'
        icon
        className={className}
        menuItems={[
          <Subheader key="usersubheader" primaryText={decoded.name}/>,
          { primaryText: 'Manage Profile', onClick: () => setVisibility(true) },
          <Divider key="userdivider" />,
          { 
            onClick: () => { 
              localStorage.removeItem('token');
              window.location.replace('/')
            },  
            primaryText: 'Logout'
          }
        ]}
      >
        person_pin
      </MenuButton>
      <div className='user-name'>{decoded.name}</div>
      <Dialog visible={visible} handleCancel={() => setVisibility(false)} 
        title="Manage Profile" nativeProps={{ maxWidth: 'md' }}  >
        <ManageProfile />
      </Dialog>
    </div>
  )
}