import React from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import VerticalTabs from '../../components/VerticalTabs'
import AccountDetails from './AccountDetails'
import Password from './Password'
import PaymentBilling from './PaymentBilling'

const tabItems = [
  { name: 'Account Details', icon: 'web' },
  { name: 'Change Password', icon: 'web' },
  { name: 'Payment and Billing', icon: 'web' },
]
export default function ManageProfile(props) {
  return (
    <Grid>
      <Cell size={12}>
        <VerticalTabs tabItems={tabItems}>
          <AccountDetails />
          <Password />
          <PaymentBilling />
        </VerticalTabs>
      </Cell>
    </Grid>
  )
}