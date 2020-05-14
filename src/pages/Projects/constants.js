export const columns = () => {
  // | Name | Description | Est. Hours | isMilestone
  return [
    { title: 'Project Name',
      field: 'roadName', fieldType: 'text',
      filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'roadName' },
    },
    { title: 'Client Name',
      field: 'clientName', fieldType: 'text', 
      filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'clientName' },
    },
    { title: 'Description',
      field: 'description', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'name' },
      className: 'truncate-text'
    },
    { title: 'Estimated Hours of Completion',
      field: 'estHours', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'estHours' },
      className: 'truncate-text'
    }
  ] 
}

export default { }