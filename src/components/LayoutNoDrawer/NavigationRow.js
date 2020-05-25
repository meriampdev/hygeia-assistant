import React from 'react'
import { useHistory } from "react-router-dom";
import MobileMenu from './MobileMenu'

export default function NavigationRow({ navItems }) {
  const history = useHistory()
  const pathname = history.location.pathname
  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  return (
    <div className={`navigation-row ${isMobile ? 'mobile' : ''}`}>
      <div className='header-brand'>
        <img src={require('../../sass/logo.png')} alt="protectwell" />
      </div>
      <div className='navigation-items'>
      {
        navItems.map((nav) => {
          let isActive = pathname === nav.to
          if(pathname === '/auth' && nav.to === '/auth/dashboard') {
            isActive = true
          }
          return <div onClick={() => history.push(nav.to)} 
            className={`nav-item ${isActive ? 'active' : ''}`} 
            key={nav.to}>{nav.label}</div>
        })
      }
      </div>
      {
        isMobile ? <MobileMenu navItems={navItems} pathname={pathname} history={history} /> : null
      }
    </div>
  )
}