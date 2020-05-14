import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import HygeiaMessage from '../../../../components/HygeiaMessage'

export default function ButtonOption(props) {
  return (
    <HygeiaMessage>
      <div className='hygeia-buttons'>
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
    </HygeiaMessage>
  )
}