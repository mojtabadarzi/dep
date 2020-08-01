import React from 'react'
import { statusConvertor1 } from '../utils/helpers'
function TextIcon(props) {
  const [color, setColor] = React.useState('#536b88')
  const [bgColor, setBgColor] = React.useState('#f7f9fc')
  const [brColor, setBorderColor] = React.useState('#f7f9fc')
  const {
    title,
    icon,
    status,
    borderWidth,
    border = false,
    content,
    iconMargin = 'ml-1',
    m = 'm-1',
    p = 'py-1 px-2',
    titleFontSize = 'text-xs',
    contentFontSize = 'text-xs',
  } = props

  React.useEffect(() => {
    statusConvertor1(setColor, setBgColor, setBorderColor, status)
  }, [status])

  return (
    <div
      className={`${p} ${m} inline-flex rounded-lg items-center`}
      style={{
        backgroundColor: bgColor,
        fontFamily: 'YekanLight',
        borderWidth: border ? borderWidth : 0,
        borderColor: brColor,
      }}
    >
      {icon ? <img className={`w-5 ${iconMargin}`} src={icon} alt="آیکن" /> : ''}

      <span className={`text-white ${titleFontSize} font-yekanlight`} style={{ color }}>
        {title}
      </span>
      {content ? (
        <span className={`text-white ${contentFontSize} font-yekanbold mr-2`} style={{ color }}>
          {content}
        </span>
      ) : (
        ''
      )}
    </div>
  )
}
export default TextIcon
