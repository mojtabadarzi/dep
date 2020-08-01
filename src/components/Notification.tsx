import React from 'react'

function Notification(props) {
  const { pic, notif = false, marginLeft, click, backgroundColor } = props
  return (
    <div
      style={{
        borderRadius: '16px',
        marginLeft,
        backgroundColor,
      }}
      className="relative flex w-12 h-12 p-2  bg-gray-200 items-center justify-center pl-2 cursor-pointer"
      onClick={click}
    >
      <img className="w-5 h-5" src={pic} alt="توجهات" />
      {notif ? (
        <span style={{ top: 10, right: 10 }} className="w-1 h-1 absolute rounded warning-bg"></span>
      ) : (
        ''
      )}
    </div>
  )
}
export default Notification
