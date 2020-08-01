import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

function Template({ children }) {
  return (
    <>
      <div className="flex bg-primary">
        <Sidebar />
        <div className="content-box">
          <div className="bottom-grabient-white"></div>
          <Topbar />
          <div className="secondary-bg" style={{height: 'calc(100vh - 5rem)'}}>{children}</div>
        </div>
      </div>
    </>
  )
}
export default Template
