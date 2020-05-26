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
        <img src={require('../../assets/hygeia-logo-icon.png')} alt="globalhealthway" />
        {
          !isMobile ? <div className='brand-name'>Global Health Way</div> : null
        }
      </div>
      <div className='navigation-items'>
      {
        navItems.map((nav) => {
          let isActive = pathname === nav.to
          if(pathname === '/provider/auth' && nav.to === '/provider/auth/waitingroom') {
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