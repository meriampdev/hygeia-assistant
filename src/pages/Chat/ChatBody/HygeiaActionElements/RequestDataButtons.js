import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import HygeiaMessage from '../../../../components/HygeiaMessage'
import { localStorageGet } from '../../../../utils/easyLocalStorage'

export default function ButtonOption(props) {
  let responses = localStorageGet('responses', 'object')
  let inputOptions = responses[props.message.dataKey] || []
  console.log('inputOptions-----', inputOptions)
  return (
    <HygeiaMessage>
      <div className='hygeia-buttons'>
        {
          inputOptions.map((item, i) => {

            return <Button 
              onClick={() => props.handleHygeiaButtonOption({ 
                userAction: { value: item[props.message.valueKey], label: item[props.message.labelKey] }, 
                messageData: props.message, 
                messageIndex: props.messageIndex 
              })}
              className='button'
              flat primary swapTheming 
              key={`${item[props.message.valueKey]}-btn-${i}`}
            >
              {item[props.message.labelKey]}
            </Button>
          })
        }
      </div>
    </HygeiaMessage>
  )
}