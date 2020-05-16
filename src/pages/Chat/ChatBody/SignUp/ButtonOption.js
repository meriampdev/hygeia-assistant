import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import HygeiaMessage from '../../../../components/HygeiaMessage'
import { useHistory } from 'react-router-dom'

export default function ButtonOption(props) {
  const history = useHistory()

  const handleClick = (inputKey, value, label, action) => {
    if(action) {
      if(action.actionType === 'redirect') {
        history.push(action.route)
      }
    } else {
      props.containerProps.handleButtonOption(inputKey, value, label)
    }
  }
  return (
    <HygeiaMessage>
      <div className='hygeia-buttons'>
        {
          props.inputOptions.map((item, i) => {
            return <Button 
              onClick={() => handleClick(props.inputKey, item.value, item.label, item.action)}
              className='button'
              flat primary swapTheming 
              key={`${props.inputKey}-btn-${i}`}
            >
              {item.label}
            </Button>
          })
        }
      </div>
    </HygeiaMessage>
  )
}