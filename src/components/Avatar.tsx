import React from 'react'

function Avatar(props) {
  const {
    pic,
    online = false,
    borderColor,
    width,
    height,
    padding,
    borderRadiusParent,
    borderRadiusPic,
  } = props
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderWidth: '1px',
        borderRadius: borderRadiusParent,
        borderColor,
        width,
        height,
      }}
      className="relative"
    >
      <img
        style={{
          borderRadius: borderRadiusPic,
          padding,
        }}
        className="w-full h-full rounded-lg"
        src={pic}
        alt="عکس"
      />
      {online ? (
        <span className="w-2 h-2 absolute rounded top-0 right-0 online-bg border border-white"></span>
      ) : (
        ''
      )}
    </div>
  )
}
export default Avatar
