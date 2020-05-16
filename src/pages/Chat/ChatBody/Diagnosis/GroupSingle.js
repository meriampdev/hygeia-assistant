import React from 'react'
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
import Button from 'react-md/lib/Buttons/Button'
import HygeiaMessage from '../../../../components/HygeiaMessage'

export default function GroupSingle(props) {
  let radioControls = props.options.map((option) => {
    return { label: option.name, value: option.id }
  })

  const onChange = (value) => {
    props.containerProps.selectGroupSingle(value, radioControls, props.lineID)
  }

	return (
    <HygeiaMessage>
      <div className='hygeia-buttons'>
        {
          radioControls.map((item, i) => {
            return <Button 
              onClick={() => onChange(item.value)}
              className='button'
              flat primary swapTheming 
              key={item.value}
            >
              {item.label}
            </Button>
          })
        }
      </div>
    </HygeiaMessage>
  )
}