import React from 'react'
//const
import { ArrowDownDark } from 'src/utils/Icons'
import { DAYS_OF_WEEK_TO_PERSIAN } from '../utils/constant'
const SelectOption = (props) => {
  const {
    title,
    required,
    data = [],
    width,
    handleMenu,
    selectRow,
    showMenu,
    showValue,
    node,
  } = props
  return (
    <div className={`flex flex-col cursor-pointer relative p-2 ${width}`} ref={node}>
      <div className="text-color2 text-xs font-yekanbold relative mb-2">
        {title}
        {required ? <span className="absolute bg-error w-1 h-1 rounded-full "></span> : ''}
      </div>
      <div
        className="flex flex-row justify-between  w-full rounded-xlg bg-color5 px-2 py-3 "
        onClick={handleMenu}
      >
        {showValue ? (
          <div className="text-sm font-yekanlight text-color4">
            {DAYS_OF_WEEK_TO_PERSIAN[showValue]}
          </div>
        ) : (
          <div className=" text-sm font-yekanlight text-color4">انتخاب کنید</div>
        )}

        <img className="w-2 ml-2" src={ArrowDownDark} alt="آیکن" />
      </div>
      {showMenu ? (
        <div
          className="px-4 py-2 bg-white absolute rounded-lg shadow-md overflow-scroll"
          style={{
            top: '5rem',
            left: '.5rem',
            right: '.5rem',
            zIndex: 1001,
            maxHeight: 200,
          }}
        >
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="text-sm py-2 text-color2 hover:text-opacity-50"
                onClick={() => selectRow(item.title)}
              >
                {DAYS_OF_WEEK_TO_PERSIAN[item.title]}
              </div>
            )
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default React.memo(SelectOption)
