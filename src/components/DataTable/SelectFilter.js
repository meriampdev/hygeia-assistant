import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default function SelectFilter(props) {
  const [selectedOptions, setSelectedOptions] = useState(props.tableFilters[props.columnOrder] || {});

  let filterOptions = props.data
  if(props.filterOption.dataKey) {
    filterOptions = props.data.map((row) => {
      return row[props.filterOption.dataKey]
    })
  }

  let ids = [], options = []
  filterOptions.forEach((opt) => {
    if(opt && opt[props.filterOption.filterSelector]) {
      if(!(ids.includes(opt[props.filterOption.filterSelector]))) {
        options.push(opt)
        ids.push(opt[props.filterOption.filterSelector])
      }
    }
  })

  const handleCheckChange = (event) => {
    setSelectedOptions(prevState => {
      return { ...prevState, [event.target.name]: (event.target.checked) };
    })
  }

  const selectAll = (value) => {
    let objData = {}
    options.forEach((option) => {
      objData[option[props.filterOption.filterSelector]] = value
    })
    setSelectedOptions(prevState => {
      return { ...prevState, ...objData }
    })
  }

  const handleOk = () => {
    props.handleSelect(selectedOptions)
  }

  // すべて選択 - Select All   クリア - Clear   キャンセル - Cancel
  return <div className='select-filter-container'>
    <div className='filter-actions'>
      <Button color="primary" onClick={() => { selectAll(true) }}>すべて選択</Button>
      <Button color="primary" onClick={() => { selectAll(false) }}>クリア</Button>
    </div>
    <div className='filter-options'>
      {
        options.map((option) => {
          let label = ''
          props.filterOption.dataFields.forEach((field) => {
            label = `${label}${option[field]} `
          })
          return <FormGroup aria-label="position" row key={Math.random()}>
            <FormControlLabel
              value={option[props.filterOption.filterSelector]}
              control={
                <Checkbox
                  name={`${option[props.filterOption.filterSelector]}`}
                  checked={selectedOptions[option[props.filterOption.filterSelector]] === true}
                  color="primary"
                />
              }
              onChange={handleCheckChange}
              label={label}
              labelPlacement="end"
              className='table-select-filter'
            />
          </FormGroup>
        })
      }
    </div>
    <div className='filter-footer'>
      <Button color="primary">キャンセル</Button>
      <Button onClick={handleOk} variant="contained" color="primary" disableElevation>
        Ok
      </Button>
    </div>
  </div>
}
