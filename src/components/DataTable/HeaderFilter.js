import React from 'react'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import ActionMenuButton from './ActionMenuButton'
import InputFilter from './InputFilter'
import SelectFilter from './SelectFilter'
import DateFilter from './DateFilter'
import './custom-header.scss'

export default class HeaderFilter extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedDate: new Date(),
      inputSearch: ''
    }

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(filters) {
    this.props.updateTableData({ columnOrder: this.props.tableData.columnOrder, filters: filters })
  }

  renderHeaderType(header) {
    switch(header.filterType) {
      case 'select':
      {
        return <SelectFilter handleSelect={this.handleFilter}  {...this.props} {...header} />
      }
      case 'date':
      {
        return <DateFilter handleDateChange={this.handleFilter} {...header} />
      }
      case 'inputSearch':
      {
        return <InputFilter handleInputSearch={this.handleFilter} {...header} />
      }
      default: return null
    }
  }

  isFilterActive() {
    let filter = this.props.tableFilters[this.props.columnOrder]
    if(filter) {
      if(filter.constructor.name === 'Object') {
        let filterValues = Object.keys(filter).map((key) => filter[key])
        filter = filterValues.includes(true)
      }
    }
    return filter ? 'filter-active' : ''
  }

  render() {
    return (
      <div>
        {
          this.props.showFilter ?
            <ActionMenuButton
              key={`actionbutton-${Math.random()}`}
              className={`custom-filter ${this.isFilterActive()}`} fullWidth={true}
              menuItems={<div className='header-filter'>{this.renderHeaderType(this.props)}</div>}
              menuProps={this.props}
              rowData={this.props}
              text={this.props.title}
              endIcon={<KeyboardArrowDown />}
            />
          : this.props.title
        }
      </div>
    )
  }
}
