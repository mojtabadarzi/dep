import React from 'react'

function ReportCondition(props) {
  const { title, icon, content, titleColor, contentColor } = props

  return (
    <div
      className="px-4 py-2 inline-flex rounded-lg items-center"
      style={{
        fontFamily: 'YekanLight',
      }}
    >
      <img className="w-10 ml-4" src={icon} alt="آیکن" />
      <div className="flex flex-col items-start ">
        <span className="text-white text-base font-yekanbold" style={{ color: contentColor }}>
          {content}
        </span>
        <span className="text-white text-lg font-yekanbold mb-2" style={{ color: titleColor }}>
          {title}
        </span>
      </div>
    </div>
  )
}
export default ReportCondition
