import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

export default function InputFilter(props) {
  const [selectedDate, setDate] = useState(props.tableFilters[props.columnOrder] || new Date());
  const handleDateChange = (date) => {
    props.handleDateChange(date)
  }

  const handleClear = () => {
    setDate(new Date())
    props.handleDateChange()
  }

  return <div className='date-filter-wrapper'>
    <Button color="primary" onClick={handleClear}>クリア</Button>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  </div>
}
