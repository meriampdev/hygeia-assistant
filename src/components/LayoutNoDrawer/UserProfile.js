import React from 'react'
import MenuButton from 'react-md/lib/Menus/MenuButton'
import { useHistory } from "react-router-dom";

export default function UserProfile({ id, className }) {
  const history = useHistory()

  return (
    <MenuButton
      id='UserProfile'
      icon
      className={className}
      menuItems={[
        { primaryText: 'Test User' },
        { primaryText: 'Edit Profile'},
        { 
          onClick: () => { history.push('/') },  
          primaryText: 'Logout'
        }
      ]}
    >
      person_pin
    </MenuButton>
  )
}