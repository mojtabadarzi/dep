import React from 'react'
//const
const SelectDays = (props) => {
  const {
    title,
    required,
    width,
    error,
    change,
    defaultValue = 0,
    borderColor = 'border-transparent',
  } = props

  return (
    <div className={`flex flex-col cursor-pointer relative p-2 ${width} `}>
      <div className="text-color2 text-xs font-yekanbold relative mb-2">
        {title}
        {required ? <span className="absolute bg-error w-1 h-1 rounded-full "></span> : ''}
      </div>
      <div
        className={`flex flex-row justify-between  w-full rounded-xlg bg-color5 p-2 border ${borderColor}`}
      >
        <select
          className="w-full text-color2 bg-transparent"
          defaultValue={defaultValue}
          onChange={change}
        >
          <option selected disabled value={0}>
            انتخاب کنید
          </option>
          <option value={1}> شنبه</option>
          <option value={2}> یکشنبه</option>
          <option value={3}> دوشنبه</option>
          <option value={4}> سه شنبه</option>
          <option value={5}> چهارشنبه</option>
          <option value={6}> پنج شنبه</option>
          <option value={7}> جمعه</option>
        </select>
      </div>
      <span className="text-xxs font-yekanlight text-error mt-1 h-3">{error}</span>
    </div>
  )
}

export default SelectDays
