export const columns = () => {
  // | Name | Description | Est. Hours | isMilestone
  return [
    { title: 'Name',
      field: 'roadName', fieldType: 'text', format: 'YYYY/MM/DD',
      filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'roadName' },
    },
    { title: 'Description',
      field: 'description', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'name' },
      className: 'truncate-text'
    },
    { title: 'Estimated Hours',
      field: 'estHours', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'estHours' },
      className: 'truncate-text'
    }
  ] 
}

export default { }