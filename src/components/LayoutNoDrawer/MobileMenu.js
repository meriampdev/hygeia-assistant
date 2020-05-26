import React, { useState } from 'react'
import {
  FontIcon,
  AccessibleFakeButton,
  IconSeparator,
  DropdownMenu,
  ListItem
} from 'react-md';

export default function MobieMenu({ navItems, pathname, history }) {
  let activePage  /* Get Active Page Lable for initial state */
  navItems.forEach((nav) => { if(nav.to === pathname) { activePage = nav.label } })
  if(pathname === '/provider/waitingroom') {
    activePage = 'Waiting Room'
  }

  const [ selected, setSelected ] = useState(activePage)
  const onClickMenu = (nav) => {
    setSelected(nav.label)
    history.push(nav.to)
  }

  let menu = navItems.map((nav) => {
          let isActive = pathname === nav.to
          if(pathname === '/provider' && nav.to === '/provider/waitingroom') {
            isActive = true
          }
          return <ListItem onClick={() => onClickMenu(nav)} 
            className={`nav-item ${isActive ? 'active' : ''}`} 
            primaryText={nav.label}
            key={nav.to} />
        })
  return (
    <DropdownMenu
      id='mobile-nav'
      menuItems={menu}
      anchor={{
        x: DropdownMenu.HorizontalAnchors.CENTER,
        y: DropdownMenu.VerticalAnchors.OVERLAP,
      }}
      position={DropdownMenu.Positions.TOP_LEFT}
      animationPosition="below"
      sameWidth
      simplifiedMenu={true}
    >
      <AccessibleFakeButton
        label={
          <IconSeparator label={selected || ""}>
            <FontIcon>arrow_drop_down</FontIcon>
          </IconSeparator>
        }
      />
    </DropdownMenu>
  )
}