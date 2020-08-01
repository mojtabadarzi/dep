import React from 'react'

function Seprator(props) {
  const { title, bgColor = '#ccc', height = 'h-8', margin = 'mx-4' } = props
  return (
    <div className={`${margin} w-px ${height} `} style={{ backgroundColor: bgColor }}>
      {title}
    </div>
  )
}
export default Seprator
