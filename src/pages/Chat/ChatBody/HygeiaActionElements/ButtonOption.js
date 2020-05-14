import React from 'react'
import Button from 'react-md/lib/Buttons/Button'

export default function ButtonOption(props) {
  console.log('props', props)
  return (
    <div className='hygeia-buttons'>
      <div>
        {
          props.message.inputOptions.map((item, i) => {
            return <Button 
              onClick={() => props.handleHygeiaButtonOption({ userAction: item, messageData: props.message, messageIndex: props.messageIndex })}
              className='button'
              flat primary swapTheming 
              key={`${props.message.inputKey}-btn-${i}`}
            >
              {item.label}
            </Button>
          })
        }
      </div>
    </div>
  )
}