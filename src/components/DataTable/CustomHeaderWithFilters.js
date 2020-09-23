import React from 'react'
import HeaderFilter from './HeaderFilter'

export default function CustomHeaderWithFilters(props) {
  return ( <thead className='MuiTableHead-root custom-header'><tr className='MuiTableRow-root MuiTableRow-head'>
      {
        props.columns.map((header, i) => {
          let headerStyle = Object.assign({}, header.headerStyle)
          return <th scope="col" style={headerStyle} key={`custom-header-${i}`} className={`${header.className} MuiTableCell-root MuiTableCell-head MTableHeader-header-255 MuiTableCell-alignLeft`}>
            {
              header.fieldType !== 'action' ?
                <HeaderFilter {...header}
                  data={props.data}
                  columnOrder={i}
                  updateTableData={props.updateTableData}
                  tableFilters={props.tableFilters}
                />
              : null
            }
          </th>
        })
      }
    </tr></thead>
  )
}
