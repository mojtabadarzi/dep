import React from 'react'

//icons
import plak from 'src/assets/images/pics/plak.svg'
import {
  DeliveryCheckListGray,
  CloseRectangleDark,
  DeliveryTruckGray,
  PinLocationGray,
  DeliveryBoxGray,
  Nopic,
} from 'src/utils/Icons'

//components
import AgentStatus from '../components/AgentStatus'
import Avatar from './Avatar'
import TextIcon from './TextIcon'
import NoItem from '../components/NoItem'

//const
import { timeStampToJalali } from '../utils/helpers'
import { agentStatusConvertorIcon } from 'src/utils/helpers'

const OrderFloatBox = (props) => {
  const { closeFloat, data, loading } = props
  const {
    id,
    userFullName,
    userPhoneNumber,
    userAvatar,
    userAddress,
    userOrderWastes = [],
    totalPrice,
    agentFullName,
    agentAvatar,
    agentStatus,
    vehicleName,
    vehiclePlate,
    createdTime,
    processTime,
  } = data

  const render = () => {
    if (loading) {
      return (
        <div className="order-float-child p-4">
          <div className="w-full flex justify-center items-center absolute bottom-0 left-0 top-0 right-0">
            <div className="loading-three-dot"></div>
          </div>
        </div>
      )
    } else if (!loading && data) {
      return (
        <div className="order-float-child p-4">
          <div className="border-b border-color1 pb-2">
            <div className="flex justify-between items-center ">
              <img
                className="w-6 rounded-xs cursor-pointer"
                onClick={closeFloat}
                src={CloseRectangleDark}
                alt="بستن"
              />
              <TextIcon
                content={id}
                border={true}
                borderWidth="1"
                brColor="#1641ff"
                title="شماره سفارش :"
                status="primary"
              />
            </div>
            <div className="flex justify-start items-center mt-2">
              <Avatar
                pic={userAvatar || Nopic}
                width="58px"
                height="58px"
                padding="2px"
                borderRadiusParent="16px"
                borderRadiusPic="16px"
                borderColor="#92a4bb"
              />
              <div className="flex flex-col mr-2">
                <div className="font-yekanbold text-sm text-dark">
                  {userFullName}
                  <span className="font-yekanlight text-xs text-color4 mr-2">(کاربر)</span>
                </div>
                <span className="font-yekanlight text-xs text-color2">{userPhoneNumber}</span>
              </div>
            </div>
            <div className=" flex items-center mt-2 bg-color1 p-1 rounded-lg">
              <img className="ml-2" src={PinLocationGray} alt="کاربر" />
              <span className="font-yekanlight text-xxs text-color4">{userAddress}</span>
            </div>
          </div>
          <div className="border-b border-color1 py-2">
            <div className=" flex items-center mb-2">
              <img className="ml-2" src={DeliveryCheckListGray} alt="سفارش" />
              <span className="font-yekanlight text-xs text-color4">اطلاعات سفارش</span>
            </div>
            <div className="h-32 pb-4 overflow-scroll">
              {userOrderWastes.length > 0 ? (
                userOrderWastes.map((item, index) => {
                  const { fee, weight, waste } = item
                  return (
                    <div
                      key={index}
                      className=" flex justify-between items-center border border-color1 bg-white p-1 mb-1 rounded-xlg w-full"
                    >
                      <div className="flex justify-start items-center">
                        <span className="font-yekanlight text-xs text-color4 w-4">{index + 1}</span>
                        <div className="flex flex-col">
                          <span className="font-yekanregular text-xs text-dark">{waste?.type}</span>
                          <span className="font-yekanregular text-xs text-color2">{fee} تومان</span>
                        </div>
                      </div>

                      <span className="font-yekanregular text-xs text-primary">{weight} کیلو</span>
                    </div>
                  )
                })
              ) : (
                <NoItem />
              )}
              <div className="flex justify-between items-center mt-1">
                <span className="font-yekanregular text-xs text-dark">ارزش کل سفارش</span>
                <span className="font-yekanbold text-xs text-primary">{totalPrice} تومان</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b border-color1 py-2">
            <div className=" flex  items-center mb-2">
              <img className="ml-2" src={DeliveryTruckGray} alt="راننده" />
              <span className="font-yekanlight text-xs text-color4">راننده اختصاص شده</span>
            </div>
            <div className="flex flex-col justify-around items-around">
              <div className="flex justify-around items-center mb-1">
                <Avatar
                  pic={agentAvatar || Nopic}
                  width="58px"
                  height="58px"
                  padding="2px"
                  borderRadiusParent="16px"
                  borderRadiusPic="16px"
                  borderColor="#92a4bb"
                />
                <div className="relative">
                  <img className="ml-2 h-5" src={plak} alt="پلاک" />
                  <span className="absolute text-sm text-primary top-0 left-0 text-left ml-6 w-full">
                    {vehiclePlate || 0}
                  </span>
                </div>
              </div>
              <div className="flex  justify-around items-center mb-1">
                <div className="font-yekanbold text-sm text-dark">{agentFullName}</div>
                <span className="font-yekanregular text-xs text-dark ">{vehicleName}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b border-color1 py-2 pb-8 relative">
            <div className="float-bottom-grabient-white"></div>

            <div className=" flex items-center mb-2">
              <img className="ml-2" src={DeliveryBoxGray} alt="سفارش" />
              <span className="font-yekanlight text-xs text-color4">وضعیت سفارش</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-yekanregular text-xs text-color2">تاریخ ثبت سفارش</span>
              <span className="font-yekanbold text-xs text-dark">
                {timeStampToJalali(createdTime)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-yekanregular text-xs text-color2">وضعیت</span>
              <AgentStatus icon={agentStatusConvertorIcon(agentStatus)} status={agentStatus} />
            </div>
            <div className="flex justify-between items-center ">
              <span className="font-yekanregular text-xs text-color2">تاریخ پردازش</span>
              <span className="font-yekanbold text-xs text-dark">
                {timeStampToJalali(processTime)}
              </span>
            </div>
          </div>
          <div className="driver-float-btn">جزییات سفارش</div>
        </div>
      )
    } else {
      return (
        <div className="order-float-child p-4">
          <NoItem />
        </div>
      )
    }
  }
  return <div className="order-float-box">{render()}</div>
}

export default OrderFloatBox
