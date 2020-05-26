import React, { useState, useEffect } from 'react'
import moment from 'moment'

export default function TimeInterval({ value }) {
  const [ display, setDisplay ] = useState("0 mins")

  let val = moment(value)

  setInterval(function() {
    let current = new Date().toISOString()
    let mcurrent = moment(current)
    let diff = mcurrent.diff(val, 'minutes')
    let text = `${diff} minutes`
    setDisplay(text)
  }, 1000); 

  return (
    <div>{display}</div>
  )
}