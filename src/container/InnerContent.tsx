import React from 'react'

const InnerContent = (props) => {
  const { w = '', h = 'h-full', p = 'p-5', m = 'm-0', position = '',overFlow = 'overflow-y-scroll', other = '' } = props

  return <div className={`${w} ${h} ${p} ${m} ${position} ${overFlow} ${other} `}>{props.children}</div>
}
export default InnerContent
