import React from 'react'

const SelectMonths = (props) => {
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
    <div className={`flex flex-col cursor-pointer relative p-2 ${width}`}>
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
          <option value={1}> فروردین</option>
          <option value={2}> اردیبهشت</option>
          <option value={3}> خرداد</option>
          <option value={4}> تیر</option>
          <option value={5}> مرداد</option>
          <option value={6}> شهریور</option>
          <option value={7}> مهر</option>
          <option value={8}> آبان</option>
          <option value={9}> آذر</option>
          <option value={10}> دی</option>
          <option value={11}> بهمن</option>
          <option value={12}> اسفند</option>
        </select>
      </div>
      <span className="text-xxs font-yekanlight text-error mt-1 h-3">{error}</span>
    </div>
  )
}

export default SelectMonths
