import React from 'react'

function TextIconHiddenText(props) {
  const [color, setColor] = React.useState('#536b88')
  const [bgColor, setBgColor] = React.useState('#f7f9fc')
  const {
    title,
    icon,
    status,
    iconMargin = 'm-0',
    m = 'm-0',
    p = 'py-1 px-2',
    titleFontSize,
  } = props

  React.useEffect(() => {
    switch (status) {
      case 'default':
        setColor('#536b88')
        setBgColor('#f7f9fc')
        break
      case 'primary':
        setColor('#1641ff')
        setBgColor('#f7f9fc')
        break
      case 'error':
        setColor('#f5222d')
        setBgColor('#fff1f0')
        break
      case 'warning':
        setColor('#fa8c16')
        setBgColor('#fff7e6')
        break
      case 'success':
        setColor('#00dbb5')
        setBgColor('#F2FDFB')
        break
      case 'initial':
        setColor('#bdc8d6')
        setBgColor('#fff')
        break
      default:
        break
    }
  }, [status])

  return (
    <div
      className={`${p} ${m} inline-flex rounded-lg items-center parent-driver-float-status`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      {icon ? <img className={`w-5 ${iconMargin}`} src={icon} alt="آیکن" /> : ''}
      <span
        className={`text-white ${titleFontSize} font-yekanlight driver-float-status`}
        style={{ color }}
      >
        {title}
      </span>
    </div>
  )
}
export default TextIconHiddenText
