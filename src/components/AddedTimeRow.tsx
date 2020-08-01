import React from 'react'

function AddedTimeRow(props) {
  const { title, content, classname, dir = '' } = props

  return (
    <div className={classname}>
      <div className="p-2 p-2 flex flex-col ">
        <div className="text-color2 text-xs font-yekanbold relative mb-2">{title}</div>
        <div
          className={`rounded-xlg border border-color5 bg-color5 px-2 py-3 text-color2 text-sm ${dir} font-yekanlight focus:bg-white`}
          style={{ height: 47 }}
        >
          <span>{content}</span>
        </div>
      </div>
    </div>
  )
}
export default AddedTimeRow
