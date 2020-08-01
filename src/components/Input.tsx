import React from 'react'

function Input(props) {
  const {
    parentClass,
    title,
    click,
    backgroundColor,
    margin,
    width,
    required = false,
    error,
    padding = 'p-2',
    node = null,
    ...other
  } = props

  return (
    <div className={parentClass}>
      <div
        className={`${padding} flex flex-col`}
        style={{
          backgroundColor,
          fontFamily: 'YekanLight',
          margin,
          width,
        }}
        onClick={click}
      >
        <div className="text-color2 text-xs font-yekanbold relative mb-2">
          {title}
          {required ? <span className="absolute bg-error w-1 h-1 rounded-full "></span> : ''}
        </div>
        <input ref={node} {...other} />
        <span className="text-xxs font-yekanlight text-error mt-1 h-3">{error}</span>
      </div>
    </div>
  )
}
export default Input
