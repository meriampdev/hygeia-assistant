import React, { useState, useEffect } from 'react'
import './verticaltab.scss'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'

export default function VerticalTabs(props) {
  const [ activeTab, setActiveTab ] = useState(0)
  const { tabItems, children } = props
  useEffect(() => {
    if(props.activeTab >= 0) {
      setActiveTab(props.activeTab)
    } 
  }, [props.activeTab])

  const onChangeTab = (tabIndex) => {
    if(props.onChangeTab) {
      props.onChangeTab(tabIndex)
    }
    setActiveTab(tabIndex)
  }

  return (
    <div className='vertical-tabs'>
      <div className='tabitems'>
        {
          tabItems.map((tab, tabIndex) => {
            let tabClass = activeTab === tabIndex ? `activeTab` : ``
            return([
                <input key={`tabinput-${tabIndex}`} onChange={() => {}} className='tab-radio' id={`tab${tabIndex}`} type="radio" name="tabs" checked={activeTab === tabIndex} />,
                <div className={`verticaltab ${tabClass}`} key={`tablabel-${tabIndex}`} onClick={() => onChangeTab(tabIndex)} htmlFor={`tab${tabIndex}`} >
                  <FontIcon>{tab.icon}</FontIcon>
                  {tab.name}
                </div>
              ])
          })
        }
      </div>
      <div className='content'>
      {
        React.Children.map(children, (child, i) => {
          return (
            <section key={`tab-child-${i}`} className={activeTab === i ? 'active-section' : ''}>
              {child}
            </section>
          )
        })
      }
      </div>
    </div>
  )
}