import React, { useState } from 'react'
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
import Button from 'react-md/lib/Buttons/Button'
import HygeiaMessage from '../../../../components/HygeiaMessage'

export default function GroupSingle(props) {
  let [ selected, setSelected ] = useState([])
  let radioControls = props.options.map((option) => {
    return { label: option.name, value: option.id }
  })

  const onChange = (value) => {
    if(!selected.includes(value)) {
      selected = [ ...selected, value ]
      setSelected(selected)
    } else {
      selected = selected.filter((f) => f !== value)
      setSelected(selected)
    }
  }

  const onSend = () => {
    if(selected.length > 0) {
      props.containerProps.selectGroupMultiple(selected, radioControls, props.lineID)
    }
  }

	return (
    <HygeiaMessage>
      <div className='hygeia-buttons'>
        {
          radioControls.map((item, i) => {
            return <Button 
              onClick={() => onChange(item.value)}
              className={`button ${selected.includes(item.value) ? 'selected' : ''}`}
              flat primary swapTheming 
              key={item.value}
            >
              {item.label}
            </Button>
          })
        }
      </div>
      <div className='group-multiple-ok'>
        <Button 
          onClick={onSend}
          className='button'
          flat primary swapTheming 
        >
          Send
        </Button>
      </div>
    </HygeiaMessage>
  )
} 