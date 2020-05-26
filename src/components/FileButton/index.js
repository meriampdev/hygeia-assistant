import React from 'react'

export default function FileButton(props) {
  let variant = props.variant || 'default'
  const btnClass = {
    'primary': "md-btn md-btn--flat md-btn--text md-pointer--hover md-background--primary md-background--primary-hover md-inline-block",
    'secondary': "md-btn md-btn--flat md-btn--text md-pointer--hover md-background--secondary md-background--secondary-hover md-inline-block",
    'default': "md-btn md-btn--flat md-btn--text md-pointer--hover md-text md-inline-block"
  }
  return (
    <>
      <input id="uploadFile" type='file' accept={props.accept} style={{display: 'none'}} onChange={props.onChange} />
      <label htmlFor="uploadFile" className={btnClass[variant]}>{props.text}</label>
    </>
  )
}