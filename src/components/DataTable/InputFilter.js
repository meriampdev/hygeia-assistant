import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

export default function InputFilter(props) {
  const [searchValue, setSearchValue] = useState(props.tableFilters[props.columnOrder] || "");
  const handleInputSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const handleEnterKey = (event) => {
    if(event.keyCode === 13) {
      let lowerCase = searchValue ? searchValue.toLowerCase() : ''
      props.handleInputSearch(lowerCase)
    }
  }

  return <TextField id="standard-basic" label={`Search ${props.title}`}
    value={searchValue}
    onChange={handleInputSearch}
    onKeyUp={handleEnterKey}
  />
}
