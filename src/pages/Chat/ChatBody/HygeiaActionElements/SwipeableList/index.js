import React, { useState, useEffect } from 'react'
import HygeiaMessage from '../../../../../components/HygeiaMessage'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields/TextField'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './swipeable.scss'
import _ from 'lodash'
import { localStorageGet, localStorageSetResponses } from '../../../../../utils/easyLocalStorage'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function SwipeableList(props) {
  let responses = localStorageGet('responses', 'object')
  let symptomsOptions = responses[props.message.dataKey] || []
  const [ symptomList, setSymptomList ] = useState(symptomsOptions)
  const [ search, setSearch ] = useState("")
  let defaultList = responses[props.message.inputKey] ? responses[props.message.inputKey] : []
  const [ selected, setSelected ] = useState(defaultList)
  let defaultIds = defaultList.map((s) => s.id)
  const [ ids, setSelectedIds ] = useState(defaultIds)

  const handleSearch = (value) => {
    let vlowercase = value ? value.toLowerCase() : ""
    if(vlowercase) {
      let newList = symptomsOptions.filter((f) => {
        let ll = f.common_name.toLowerCase()
        return ll.includes(value)
      })
      setSymptomList(newList)
    } else {
      setSymptomList(symptomsOptions)
    }
    setSearch(value)
  }

  const onSelectSymptom = (symptom) => {
    if(ids.includes(symptom.id)) {
      let newlist = selected.filter((f) => f.id !== symptom.id)
      let newids = ids.filter(f => f !== symptom.id)
      setSelected(newlist)
      setSelectedIds(newids)
    } else {
      const newlist = [ ...selected, symptom ]
      const newids = [ ...ids, symptom.id ]
      setSelected(newlist)
      setSelectedIds(newids)
    }
  }

  const handleDone = () => {
    localStorageSetResponses(props.message.inputKey, selected)
    console.log('handleDone', props.message.inputKey, selected)
    let names = selected.map((s) => s.common_name)
    let inString = names.join()
    inString = inString.replace(',', ', ')
    props.handleHygeiaButtonOption({ 
      userAction: { value: selected, label: inString }, 
      messageData: props.message, 
      messageIndex: props.messageIndex 
    })
  }

  let chunkie = _.chunk(symptomList, 8)
  return (
    <div className='swipeable-wrapper'>
      <Button onClick={handleDone} className='close-btn' icon swapTheming secondary>done</Button>
      <TextField id="search-suggested" label="Search Symptoms"
        lineDirection="center" className="md-cell md-cell--bottom"
        fullWidth onChange={handleSearch} value={search}
      />
      <Carousel swipeable={true} responsive={responsive}>
        {
          chunkie.map((page, i) => {
            return (<div key={`swipeable-page-${i}`} className='swipeable-page'>
                {
                  page.map((item) => {
                    return ( <Button onClick={() => onSelectSymptom(item)}
                        className={`button ${ids.includes(item.id) ? 'selected' : ''}`}
                        flat primary swapTheming 
                        key={item.id}
                      >
                        {item.common_name}
                      </Button>
                    )
                  })
                }
              </div>)
          })
        }
      </Carousel>
    </div>
  )
}