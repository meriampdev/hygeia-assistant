import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import HygeiaMessage from '../../../../components/HygeiaMessage'

export default function SingleQuestion(props) {
  let symptomId = props.options[0].id
  let radioControls = props.options[0].choices.map((choice) => {
    return { label: choice.label, value: choice.id }
  })

  const onChange = (value) => {
    props.containerProps.selectSingleOption(value, radioControls, props.lineID, symptomId)
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