import React from 'react'
import './navbar.scss'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Button from 'react-md/lib/Buttons/Button'
import MenuButton from 'react-md/lib/Menus/MenuButton'
import ListItem from 'react-md/lib/Lists/ListItem'
import { useHistory } from 'react-router-dom'

export default function NavBar(props) {
  const history = useHistory()

  let navButton = null, navListItems = []
  if(history.location.pathname !== '/login') {
    navButton = <Button onClick={() => history.push('/login')} flat 
              style={{border: '1px solid var(--primary-color)'}}>Sign In</Button>
    navListItems = [<ListItem onClick={() => history.push('/login')} key={1} primaryText="Sign In" />]
  }
  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          <div className='img-logo' onClick={() => history.push('/')}>
            <img src={require('../../sass/logo.png')} alt="Global Health Way" />
          </div>
        </div>
      </div>
      <div className="nav-btn">
        <MenuButton
          id="menu-button-2"
          icon
          menuItems={navListItems}
          listInline
          centered
          anchor={{
            x: MenuButton.HorizontalAnchors.CENTER,
            y: MenuButton.VerticalAnchors.CENTER,
          }}
        >
          more_vert
        </MenuButton>
      </div>
      
      <div className="nav-links">
        {navButton}
      </div>
    </div>
  )
}