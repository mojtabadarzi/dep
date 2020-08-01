import React from 'react'
import PageTitle from '../components/PageTitle'
import TextIcon from '../components/TextIcon'
import Tabs from '../components/Tabs'
import OrderStatus from '../components/OrderStatus'
function WrapperSimple(props) {
  const {
    wrpperTitle,
    wrpperSubtitle = false,
    orderTitle,
    orderNumber,
    orderStatus,
    leftTitle,
    iconStatus,
    iconTitle,
    tab = false,
    tabData,
    changeTab,
    activeTabIndex,
    position = '',
  } = props
  return (
    <div className={`p-4 mb-4 bg-white rounded-lg ${position}`}>
      <div className="flex flex-row justify-between border-b pb-2 mb-4 border-gray-100">
        <div className="inline-flex items-center">
          <div className="flex flex-col justify-center">
            <PageTitle classname="text-base ml-2" title={wrpperTitle} />
            {wrpperSubtitle ? (
              <PageTitle
                classname="text-xs my-3 font-yekanlight text-color4"
                title={wrpperSubtitle}
              />
            ) : (
              ''
            )}
          </div>
          <div className="mr-4">
            {tab ? (
              <Tabs data={tabData} activeTabIndex={activeTabIndex} changeTab={changeTab} />
            ) : (
              ''
            )}
            {orderNumber ? (
              <TextIcon title={orderTitle} content={orderNumber} status={orderStatus} />
            ) : (
              ''
            )}
          </div>
        </div>
        {leftTitle ? (
          <div className="inline-flex items-center">
            <p className="ml-2">{leftTitle}</p>
            <OrderStatus
              icon={iconStatus}
              borderWidth={iconStatus === 0 ? 1 : 0}
              border={true}
              title={iconTitle}
              status={iconStatus}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div>{props.children}</div>
    </div>
  )
}
export default WrapperSimple
