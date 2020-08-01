import React from 'react'

function Button(props) {
  const {
    title,
    icon,
    iconWidth = 'w-5',
    click,
    backgroundColor,
    color = 'text-white ',
    margin = '',
    padding = 'px-4 py-2',
    width = '',
    height = '',
    text = 'text-xs',
    font = 'font-yekanregular',
    border = '',
    borderColor = '',
    btnType = 'button',
    disabled = false,
    loading = false,
    iconMargin = 'ml-2',
  } = props

  return (
    <button
      className={`${padding} inline-flex rounded-xlg items-center justify-center hover:opacity-75 cursor-pointer ${border} ${borderColor} ${margin}`}
      style={{
        backgroundColor: disabled ? '#ddd' : backgroundColor,
        width,
        height,
      }}
      onClick={click}
      type={btnType}
      disabled={disabled}
    >
      {loading ? (
        <div className="sp sp-clock"></div>
      ) : (
        <>
          {icon ? <img className={`${iconWidth}  ${iconMargin}`} src={icon} alt="آیکن" /> : ''}
          <span className={` ${color} ${font} ${text}`}>{title}</span>
        </>
      )}
    </button>
  )
}
export default Button
