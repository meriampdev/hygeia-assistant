/*eslint-disable*/
import './datatable.scss'
import React from 'react';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'
import ActionMenuButton from './ActionMenuButton'
import CustomHeader from './CustomHeaderWithFilters'

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class DataTable extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = { tableData: null, tableFilters: {} }
    this.columns = []
    this.constructColumns(this.props.tableColumns)
    this.updateTableData = this.updateTableData.bind(this)
  }

  getFilterValue(filter) {
    if(filter.constructor.name === 'Date') {
      return filter
    } else if(filter.constructor.name === 'String') {
      return filter.toLowerCase()
    } else if(filter.constructor.name === 'Object'){
      let filterValues = Object.keys(filter).filter((key) => filter[key])
      return filterValues.join().toLowerCase()
    } else {
      return filter
    }
  }

  getFilterSelector(filterOption) {
    let filterSelector = filterOption.filterSelector
    if(filterOption.dataKey) {
      filterSelector = `${filterOption.dataKey}.${filterOption.filterSelector}`
    }
    return filterSelector
  }

  getFieldData(fieldData) {
    return fieldData.toString().toLowerCase()
  }

  shouldDisplay(filterValue, fieldData, filterType, dateFormat) {
    if(filterType === 'select') {
      if(filterValue.length <= 0) {
        return true
      }
      if(!fieldData) return false
      return filterValue.includes(fieldData)
    } else if(filterType === 'inputSearch') {
      return fieldData.includes(filterValue)
    } else if(filterType === 'date') {
      let filterValueInDate = moment(filterValue).format(dateFormat)
      let fieldDataInDate = moment(fieldData).format(dateFormat)
      return filterValueInDate === fieldDataInDate
    } else {
      return false
    }
  }

  updateTableData(filter) {
    let newFilters = { ...this.state.tableFilters, [filter.columnOrder]: filter.filters }
    const { tableData, tableColumns } = this.props
    let newList = this.props.tableData.filter((row) => {
      let shouldDisplay = Object.keys(newFilters).map((key) => {
        if(newFilters[key]) {
          let filterValue = this.getFilterValue(newFilters[key])
          let filterSelector = this.getFilterSelector(tableColumns[key].filterOption)
          let extractFieldData = ''
          try {
            extractFieldData = eval(`row.${filterSelector}`)
          } catch(e) {

          }
          let fieldData = this.getFieldData(extractFieldData)
          return this.shouldDisplay(filterValue, fieldData, tableColumns[key].filterType, tableColumns[key].format)
        }
        return true
      })
      return !shouldDisplay.includes(false)
    })
    this.setState({ tableData: newList, tableFilters: newFilters })
  }

  renderActionButtons(buttons, rowData, colData) {
    return buttons.map((button)=>{
      switch(button.type) {
        case 'menu-button':
        {
          return <ActionMenuButton
            key={`actionbutton-${Math.random()}`}
            menuItems={button.items}
            menuProps={button}
            rowData={rowData}
          />
        }
        default:
      }
    })
  }

  constructColumns(columns) {
    this.columns = columns.map((col) => {
      switch(col.fieldType) {
        case 'compoundField':
        {
          let colData = { ...col,
            render: (rowData) => {
              let texts = []
              try {
                texts = col.fields.map((field) => eval(`rowData.${field}`) )
              } catch (e) {

              }

              let arrToString = texts.join().replace(',', ' ')
              let displayText = arrToString ? arrToString : col.defaultText
              return <div className={col.className}> <span>{displayText}</span> </div>
            },
            customFilterAndSearch: (term, rowData) => {
              let texts = []
              try {
                texts = col.fields.map((field) => eval(`rowData.${field}`) )
              } catch (e) {

              }
              let displayText = texts.join().replace(',', ' ').toLowerCase()
              return displayText.includes(term.toLowerCase())
            },
            name: 'default'
          }
          return colData
        }
        case 'date':
        {
          let colData = { ...col,
            render: (rowData) => {
              let fieldData = ''
              try {
                fieldData = eval(`rowData.${col.field}`)
              } catch(e) {

              }
              let displayText = fieldData ? moment(fieldData).format(col.format) : ''
              return <div className={col.className}>{displayText}</div>
            }
          }
          return colData
        }
        case 'icon':
        {
          let colData = { ...col,
            render: (rowData) => {
              let icons = col.fields.map((field) => {
                let shouldDisplay = false
                try {
                  shouldDisplay = eval(`rowData.${field}`)
                } catch(e) {

                }

                if(shouldDisplay) return col.iconDisplays[field]
              })
              return <div className={col.className}>{icons}</div>
            },
            customFilterAndSearch: (term, rowData) => {
              if(term.length > 0) {
                let matched = []
                try {
                  matched = term.map((field) => eval(`rowData.${field}`))
                } catch(e) {

                }

                return matched.includes(true)
              } else {
                return true
              }
            },
            name: 'default'
          }
          return colData
        }
        case 'icon-link':
        {
          let colData = { ...col,
            render: (rowData) => {
              return <div className={col.className}>
                {
                  col.iconDisplays.map((icon, i) => {
                    return <IconButton key={`icon-link-${i}`} onClick={() => col.iconHandler(rowData, icon.key)}>
                            {icon.icon}
                          </IconButton>
                  })
                }
              </div>

            }
          }
          return colData
        }
        case 'action':
        {
          let colData = { ...col,
            render: (rowData) => {
              return <div className={col.className}>{this.renderActionButtons(col.buttons, rowData, col)}</div>
            }
          }
          return colData
        }
        default:
        {
          if(col.render) return col
          else {
            return { ...col, render: (rowData) => {
                let displayText = rowData[col.field] ? rowData[col.field]: col.defaultText
                return <div className={col.className}><span>{displayText}</span></div>
              }
            }
          }
        }
      }
    })
  }

  render() {
    return (
      <div className="datatable-wrapper">
        <MaterialTable
          {...this.props}
          icons={this.props.icons ? this.props.icons : tableIcons}
          columns={this.columns}
          data={this.state.tableData ? this.state.tableData : this.props.tableData}
          components={{
            Header: props => <CustomHeader
              {...props}
              data={this.props.tableData}
              tableFilters={this.state.tableFilters}
              updateTableData={this.updateTableData}
            />
          }}
        />
      </div>
    )
  }
}

export default DataTable
