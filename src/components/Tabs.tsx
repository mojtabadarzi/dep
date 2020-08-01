import React from 'react'

const Tabs = (props) => {
  const { data = [], changeTab, activeTabIndex } = props

  return (
    <div className="flex items-center">
      {data.map((item, index) => {
        const { name, icon, inactiveIcon, id } = item
        return (
          <div key={id}>
            {icon ? (
              <div
                className={
                  activeTabIndex === index ? 'active-edit-driver-tab' : 'inactive-edit-driver-tab'
                }
                onClick={() => changeTab(index)}
              >
                <img
                  className="w-4 ml-2"
                  src={activeTabIndex === index ? icon : inactiveIcon}
                  alt={name}
                />
                <span>{name}</span>
              </div>
            ) : (
              <div
                className={
                  activeTabIndex === index ? 'active-edit-driver-tab' : 'inactive-edit-driver-tab'
                }
                onClick={() => changeTab(index)}
              >
                {name}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default Tabs
