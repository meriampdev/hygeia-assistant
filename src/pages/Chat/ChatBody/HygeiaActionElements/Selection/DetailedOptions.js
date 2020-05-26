import React, { useState } from 'react'
import Button from 'react-md/lib/Buttons/Button'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './selection.scss'
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

export default function DetailedOptions(props) {
  let responses = localStorageGet('responses', 'object')
  let alreadySelected = responses.symptoms ? responses.symptoms : []
  const [ selected, setSelected ] = useState(alreadySelected)
  const [ ids, setSelectedIds ] = useState(alreadySelected)

  const onSelectSymptom = (symptom) => {
    if(ids.includes(symptom)) {
      let newlist = selected.filter((f) => f !== symptom)
      let newids = ids.filter(f => f !== symptom)
      setSelected(newlist)
      setSelectedIds(newids)
    } else {
      const newlist = [ ...selected, symptom ]
      const newids = [ ...ids, symptom ]
      setSelected(newlist)
      setSelectedIds(newids)
    }
  }

  const onDone = () => {
    localStorageSetResponses('symptoms', selected)
    props.onDone(selected)
  }

  return (
    <div className='selection-swipeable-wrapper'>
      <div className='instruction' >Please select all that applies.</div>
      {
        props.details.map((item, i) => {
          return (
            <div className='symptom-item' key={`symptom-item-${i}`}>
              { item.title ? <div className='title'>{item.title}</div> : null }
              <div className='item-detailed-options'>
              {
                item.options.map((opt, optindex) => {
                  return <Button key={`option-ididid-${optindex}`} primary flat swapTheming 
                    onClick={() => onSelectSymptom(opt)}
                    className={`soption-button ${ids.includes(opt) ? 'selected' : ''}`}>{opt}</Button>
                })
              }
              </div>
            </div>
          )
        })
      }
      <Button onClick={onDone} className='close-btn' flat swapTheming>Done</Button>
    </div>
  )
}