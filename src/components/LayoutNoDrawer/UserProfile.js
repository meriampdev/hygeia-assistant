import React, { useState, useEffect } from 'react'
import MenuButton from 'react-md/lib/Menus/MenuButton'
import Subheader from 'react-md/lib/Subheaders/Subheader'
import Divider from 'react-md/lib/Dividers/Divider'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
export default function UserProfile({ id, className }) {
  const [ name, setName ] = useState("")
  const auth = useSelector(state => state.auth)
  useEffect(()=> {
    if(auth) {
      setName(auth.data.name)
    }
  }, [auth])

  return (
    <div className='header-user-section'>
      <MenuButton
        id='UserProfile'
        icon
        className={className}
        menuItems={[
          <Subheader key='Subheader' primaryText={name || 'Provider'} />,
          { primaryText: 'Edit Profile'},
          { 
            onClick: () => {},
            primaryText: 'Settings'
          },
          <Divider key='divider' />,
          { 
            onClick: () => {},  
            primaryText: 'Logout'
          }
        ]}
      >
        person_pin
      </MenuButton>
      <div className='user-name'>{`Dr. ${name}`}</div>
    </div>
  )
}