import React from 'react'
import WaitingRoom from '../../pages/WaitingRoom'
import EmployerDetails from '../../pages/EmployerDetails'

const TO_PREFIX = '/provider/auth';
export default [
  {
    label: 'Waiting Room', path: '/waitingroom',
    to: `${TO_PREFIX}/waitingroom`,
    exact: true,
    icon: 'web',
    component: <WaitingRoom />
  }
]