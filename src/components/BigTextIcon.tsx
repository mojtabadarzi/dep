import React from 'react'

function BigTextIcon(props) {
  const [color, setColor] = React.useState('#536b88')
  const [bgColor, setBgColor] = React.useState('#f7f9fc')
  const { title, icon, status, borderWidth, borderColor, content, marginLeft } = props

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
        setColor('#52c41a')
        setBgColor('#f6ffed')
        break
      default:
        break
    }
  }, [status])

  return (
    <div
      className="px-4 py-2 inline-flex rounded-lg items-center"
      style={{
        backgroundColor: bgColor,
        fontFamily: 'YekanLight',
        borderWidth,
        borderColor,
        marginLeft,
      }}
    >
      <img className="w-10 ml-4" src={icon} alt="آیکن" />
      <div className="flex flex-col items-center ">
        <span className="text-white text-sm font-yekanlight mb-2" style={{ color }}>
          {title}
        </span>
        <span className="text-white text-base font-yekanbold" style={{ color }}>
          {content}
        </span>
      </div>
    </div>
  )
}
export default BigTextIcon
