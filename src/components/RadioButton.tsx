import React from 'react'

function RadioButton(props) {
  const { title, name, checkedValue, change, required, data, width, node, error } = props

  return (
    <div className={`p-2 ${width} flex-col`}>
      <div className="text-color2 text-xs font-yekanbold relative mb-2">
        {title}
        {required ? <span className="absolute bg-error w-1 h-1 rounded-full "></span> : ''}
      </div>
      <div className="flex justify-between items-center py-2 px-2">
        {data.map((item, index) => {
          const { id, label } = item
          return (
            <div key={index} className="w-1/2 ">
              <input
                className="radio-button-input cursor-pointer"
                type="radio"
                name={name}
                id={id}
                checked={checkedValue === id}
                onChange={() => {
                  change(id)
                  console.log(checkedValue)
                }}
                ref={node}
              />
              <label
                htmlFor={id}
                className="radio-button-label relative cursor-pointer text-color2 text-sm font-yekanlight mr-2"
              >
                {label}
              </label>
            </div>
          )
        })}
      </div>
      <span className="text-xxs font-yekanlight text-error mt-1 h-3">{error}</span>
    </div>
  )
}
export default RadioButton
