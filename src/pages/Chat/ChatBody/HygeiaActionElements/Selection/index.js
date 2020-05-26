import React, { useState } from 'react'
import Button from 'react-md/lib/Buttons/Button'
import HygeiaMessage from '../../../../../components/HygeiaMessage'
import symptoms from './symptoms'
import DetailedOptions from './DetailedOptions'
import { localStorageGet, localStorageSetResponses } from '../../../../../utils/easyLocalStorage'

export default function ButtonOption(props) {
  const [ selected, setSelected ] = useState(null)

  const onDone = (selectedItems) => {
    if(selectedItems.length > 0) {
      let responses = localStorageGet('responses', 'object')
      let symptomsGroup = responses.symptomsGroup ? [ ...responses.symptomsGroup, selected ] : [selected]
      localStorageSetResponses('symptomsGroup', symptomsGroup)
    }
    
    setSelected(null)
    props.afterSymptoms()
  }

  return (
    <HygeiaMessage>
      <div className='hygeia-buttons'>
        {
          props.message.inputOptions.map((item, i) => {
            return <Button 
              onClick={() => { setSelected(item)}}
              className='button'
              flat primary swapTheming 
              key={`${props.message.inputKey}-btn-${i}`}
            >
              {item.label}
            </Button>
          })
        }
      </div>
      {
        selected ? 
          <DetailedOptions details={symptoms[selected.value]} onDone={onDone} />
        : null
      }
    </HygeiaMessage>
  )
}