import React from 'react'

export default function WidgetIcon(props) {
  console.log('WidgetIcon', props)
  
  return (
    <div id="app" data-align="right" onClick={props.toggleWidget}>
        <div className="app-wrapper app-responsive">
          <div data-align="right" className="minimized">
            <div className="theme-bubble" style={{background: 'rgb(0, 108, 255)'}}>
              <svg width="100%" height="100%" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.333 26.324l6.449 6.376a.752.752 0 001.28-.535V21.44l-7.729 4.884z" fill="#ffffff" />
                <path d="M3.946 0h22.109a3.008 3.008 0 013.008 3.008V21.44l-7.624 5.004H3.945a3.008 3.008 0 01-3.007-3.008V3.008A3.008 3.008 0 013.946 0z" fill="#ffffff" />
                <path fillRule="evenodd" clipRule="evenodd" d="M21.439 26.444L.937 4.981v21.463H21.44z" fill="url(#gradient)" />
                <defs>
                  <linearGradient id="gradient" x1="13.451" y1="12.325" x2="5.559" y2="22.297" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#000000" stopOpacity=".2" />
                    <stop offset={1} stopColor="transparent" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
             {/* <svg width="100%" height="100%" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 1175V0h2360v2350H0V1175zm1793 618c3-5 27-167 53-360 27-194 52-353 55-353 4 0 11 35 15 78l9 77h250v-100l-80-3-81-3-28-202c-40-286-30-257-87-257-27 0-49 1-50 3 0 1-24 166-53 367-34 236-55 354-59 335-3-16-32-217-63-445s-61-425-65-437c-7-19-16-23-53-23-41 0-45 2-50 28-2 15-24 163-47 330l-42 302h-117V781l-26-20c-14-11-33-17-42-14-38 13-42 32-42 210v174l-102-3-103-3-3-175c-2-161-4-176-22-192-23-18-56-13-72 11-9 15-16 15-77-6-221-75-454 45-523 270-57 190 33 391 216 480 74 36 146 46 169 22 36-35 11-77-53-90-194-41-298-256-209-433 35-71 92-124 157-146 66-23 176-20 232 5 78 35 80 39 80 156v103H620v49c0 48 0 48 38 55 20 3 79 6 130 6h92v134c0 109 3 138 16 150 18 19 38 20 65 6 17-10 19-23 19-150v-140h210v132c0 108 3 135 17 150 20 22 51 23 75 1 16-14 18-33 18-149v-133l53-6c29-4 60-6 67-5 8 1 31 2 51 1l36-1 25-177c14-98 28-171 31-163s31 204 62 435 60 432 62 448c5 25 9 27 54 27 26 0 50-3 52-7z"
                  transform="matrix(.1 0 0 -.1 0 235)"
                ></path>
              </svg>*/}
            </div>
          </div>
        </div>
      </div>
  )
}