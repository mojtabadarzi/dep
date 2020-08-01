import React from 'react'
import { SORTING } from '../utils/constant'
import { SortDark, ArrowDownDark } from 'src/utils/Icons'

const data = ['inc', 'dec']

function FilterSelectOption(props) {
  const { handleMenu, showMenu, showValue, selectRow, node } = props
  return (
    <div
      className="flex flex-row items-center cursor-pointer relative"
      style={{ width: 220 }}
      ref={node}
    >
      <div className="flex flex-row justify-between items-center w-full" onClick={handleMenu}>
        <img className="h-6 ml-2" src={SortDark} alt="آیکن" />
        <div className="align-right w-full text-sm font-yekanbold text-color2">
          مرتب سازی براساس : <span className="text-xs font-bakhlight">{showValue}</span>
        </div>
        <div
          className="p-2 mr-2 flex items-center justify-center border rounded-lg border-color3"
          style={{ borderRadius: 16 }}
        >
          <img className="w-6 p-1" src={ArrowDownDark} alt="آیکن" />
        </div>
      </div>
      {showMenu ? (
        <div
          className="px-4 py-2 bg-white absolute w-full rounded-lg"
          style={{ top: 'calc(100% + 10px)', left: 0, zIndex: 13 }}
        >
          {data.map((item, index) => {
            return (
              <div key={index} className="text-sm my-2" onClick={() => selectRow(item)}>
                {SORTING[item]}
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
export default FilterSelectOption
