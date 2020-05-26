import React from 'react'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'

export const employeeListColumns = (handleAnswerCall, handleViewMore) => {
  // | Name | Description | Est. Hours | isMilestone
  return [
    {
      fieldType: 'action',
      buttons: [
        { 
          type: 'menu-button',
          displayType: 'icon',
          icon: <FontIcon primary>touch_app</FontIcon>,
          items: [
            { text: 'Answer Call', onClick: handleAnswerCall },
            { text: 'View More', onClick: handleViewMore }
          ]
        }
      ],
      className: 'max-content'
    },
    { title: 'Call Status', fieldType: 'compoundField',
      fields: ['status'], filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'status' },
      className: 'max-content'
    },
    { title: 'Waiting Time', fieldType: 'time-interval',
      field: 'call_start_timestamp', filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'call_start_timestamp' },
      className: 'max-content'
    },
    { title: 'Patient',
      fields: ['patientName', 'gender', 'age'], fieldType: 'compoundField', 
      filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'userData.patientName' },
      className: 'max-content capitalize'
    },
    // { title: 'Concern', fieldType: 'compoundField',
    //   fields: ['userData.complaint'], filterType: 'inputSearch', showFilter: false,
    //   filterOption: { dataKey: null, dataFields: [], filterSelector: 'userData.complaint' },
    //   className: 'max-content'
    // },
    { title: 'Location', fieldType: 'compoundField',
      fields: ['stateOfResidence'], filterType: 'inputSearch', showFilter: false,
      filterOption: { dataKey: null, dataFields: [], filterSelector: 'userData.patientLocation' },
    }
  ] 
}

export const mockList = () => {
  return [{
      "internal_member_key": "7435851493",
      "employee_id": "2010639995",
      "first_name": "Michele",
      "last_name": "Menichillo",
      "email": "mmenichillo0@istockphoto.com",
      "phone_number": "(337) 4907302",
      "date_of_birth": "2019-09-04T01:43:40Z",
      "gender": "F",
      "primary_worksite": "8 Mayer Terrace",
      "status": "not_cleared",
      "questionnaire": "2020-01-09T07:30:56Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "7435851493",
      "first_name": "Lexis",
      "last_name": "Skehens",
      "email": "lskehens1@shop-pro.jp",
      "phone_number": "(690) 1483959",
      "date_of_birth": "2020-04-26T03:58:38Z",
      "gender": "F",
      "primary_worksite": "1 Eagan Terrace",
      "status": "not_cleared",
      "questionnaire": "2019-09-05T16:29:14Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "9002441681",
      "first_name": "Mireielle",
      "last_name": "Reichert",
      "email": "mreichert3@github.com",
      "phone_number": "(588) 7512433",
      "date_of_birth": "2020-03-25T11:41:57Z",
      "gender": "F",
      "primary_worksite": "737 Knutson Terrace",
      "status": "unknown",
      "questionnaire": "2020-01-17T08:33:01Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "7234509100",
      "first_name": "Moria",
      "last_name": "McSaul",
      "email": "mmcsaul5@jigsy.com",
      "phone_number": "(503) 7596999",
      "date_of_birth": "2019-11-26T23:55:55Z",
      "gender": "F",
      "primary_worksite": "1 Bunker Hill Street",
      "status": "not_cleared",
      "questionnaire": "2019-08-27T18:48:46Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "0127881328",
      "first_name": "Alice",
      "last_name": "Batts",
      "email": "abatts7@livejournal.com",
      "phone_number": "(344) 8072778",
      "date_of_birth": "2020-02-25T10:31:46Z",
      "gender": "F",
      "primary_worksite": "0 Chive Terrace",
      "status": "not_cleared",
      "questionnaire": "2020-04-27T00:53:48Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "7613261700",
      "first_name": "Shaine",
      "last_name": "Twelvetree",
      "email": "stwelvetree9@cpanel.net",
      "phone_number": "(723) 4039971",
      "date_of_birth": "2020-03-29T09:10:27Z",
      "gender": "F",
      "primary_worksite": "3700 Hazelcrest Park",
      "status": "unknown",
      "questionnaire": "2020-03-08T02:50:50Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "6336427854",
      "first_name": "Mordy",
      "last_name": "Hocking",
      "email": "mhockingb@baidu.com",
      "phone_number": "(228) 7222593",
      "date_of_birth": "2019-12-13T08:47:17Z",
      "gender": "M",
      "primary_worksite": "889 Rieder Court",
      "status": "unknown",
      "questionnaire": "2019-10-07T04:39:20Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "0617602735",
      "first_name": "Anny",
      "last_name": "Gillbanks",
      "email": "agillbanksc@vinaora.com",
      "phone_number": "(678) 5678148",
      "date_of_birth": "2020-03-21T00:16:23Z",
      "gender": "F",
      "primary_worksite": "5678 Redwing Center",
      "status": "unknown",
      "questionnaire": "2020-04-07T19:24:47Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "9351947416",
      "first_name": "Nessie",
      "last_name": "Jackling",
      "email": "njacklinge@alexa.com",
      "phone_number": "(943) 3883066",
      "date_of_birth": "2020-01-21T23:15:30Z",
      "gender": "F",
      "primary_worksite": "4 Walton Road",
      "status": "not_cleared",
      "questionnaire": "2019-10-15T17:25:34Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "3969438756",
      "first_name": "Artemis",
      "last_name": "Chaplin",
      "email": "achaplinf@arstechnica.com",
      "phone_number": "(157) 4327974",
      "date_of_birth": "2020-02-13T19:09:45Z",
      "gender": "M",
      "primary_worksite": "804 Mosinee Place",
      "status": "not_cleared",
      "questionnaire": "2020-02-10T14:29:41Z"
    }, {
      "internal_member_key": "07435851493",
      "employee_id": "0812541715",
      "first_name": "Sella",
      "last_name": "Decaze",
      "email": "sdecazeh@hao123.com",
      "phone_number": "(467) 5782513",
      "date_of_birth": "2020-02-06T07:58:09Z",
      "gender": "F",
      "primary_worksite": "43272 Mariners Cove Crossing",
      "status": "unknown",
      "questionnaire": "2019-09-24T11:11:33Z"
    }, {
      "internal_member_key": "7435851493",
      "employee_id": "1655589199",
      "first_name": "Dori",
      "last_name": "Ratt",
      "email": "drattj@yellowpages.com",
      "phone_number": "(406) 7073795",
      "date_of_birth": "2019-08-31T08:24:27Z",
      "gender": "F",
      "primary_worksite": "3990 Washington Lane",
      "status": "not_cleared",
      "questionnaire": "2019-09-24T20:07:26Z"
    }]
}

export const readCSV = (rawContent) => {
  if(rawContent) {
    let rowArray = rawContent.split('\n') 
    let headerRow = rowArray[0]
    let headerKeys = headerRow.split(',')
    let dataRows = rowArray.slice(1, rowArray.length)
    let jsonData = dataRows.map((row) => {
      let rowData = row.split(',')
      let objData = {}
      rowData.forEach((item, itemIndex) => {
        objData[headerKeys[itemIndex]] = item
      })
      return objData
    })

    return jsonData
  }

  return []
}

export default { }