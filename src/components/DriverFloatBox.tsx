import React from 'react'

//components
import profile from 'src/assets/images/pics/profile.webp'
import Avatar from './Avatar'
import TextIcon from './TextIcon'
import TextIconHiddenText from './TextIconHiddenText'

//icons
import plak from 'src/assets/images/pics/plak.svg'
import {
  WarehouseGray,
  DeliveryTruckGray,
  CloseRectangleDark,
  DeliveryCheckListGray,
  NoteGray,
  OutlinkBlue,
  UserGray,
} from 'src/utils/Icons'

//helper
import { DriverStatusToIcon, OrderStatusToIcon } from 'src/utils/helpers'
import { ORDER_LIST_STATUS, ORDER_LIST_STATUS_CONVERT } from 'src/utils/constant'

const DriverFloatBox = (props) => {
  const { closeFloat } = props

  return (
    <div className="driver-float-box">
      <div className="driver-float-child ">
        <div className="p-4 pb-0">
          <div className="flex justify-between items-center pb-2">
            <img
              className="w-6 rounded-xs cursor-pointer"
              onClick={closeFloat}
              src={CloseRectangleDark}
              alt="بستن"
            />
            <TextIcon icon={DriverStatusToIcon('active')} title="فعال" status="success" />
          </div>
          <div className="border-b border-color1 py-2">
            <div className=" flex items-center mb-2">
              <img className="ml-2" src={WarehouseGray} alt="راننده" />
              <span className="font-yekanlight text-xs text-color4">مشخصات راننده</span>
            </div>
            <div className="flex justify-start items-center">
              <Avatar
                pic={profile}
                width="58px"
                height="58px"
                padding="2px"
                borderRadiusParent="16px"
                borderRadiusPic="16px"
                borderColor="#92a4bb"
              />
              <div className="flex flex-col mr-2">
                <div className="font-yekanbold text-sm text-dark">
                  رضا ایمان نژاد
                  <span className="font-yekanlight text-xs text-color4 mr-2">(راننده)</span>
                </div>
                <span className="font-yekanlight text-xs text-color2">0912-100-2121</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b border-color1 py-2">
            <div className=" flex items-center mb-2">
              <img className="ml-2" src={DeliveryTruckGray} alt="خودرو" />
              <span className="font-yekanlight text-xs text-color4">مشخصات خودرو</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-yekanregular text-xs text-dark">کامیون کمپرسی آمیکو </span>
              <img className="ml-2 h-5" src={plak} alt="پلاک" />
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-color1 py-2">
            <div className=" flex items-center">
              <img className="ml-2" src={UserGray} alt="خودرو" />
              <span className="font-yekanlight text-xs text-color4">همراهان در خودرو</span>
            </div>
            {/* <div className="flex ">{ArrayToSequenceImages([1, 2, 3, 4, 5])}</div> */}
          </div>
        </div>
        <div className="py-2 " style={{ height: '50%' }}>
          <div className=" flex items-center px-4">
            <img className="ml-2" src={DeliveryCheckListGray} alt="سفارش‌های امروز" />
            <span className="font-yekanlight text-xs text-color4">سفارش‌های امروز</span>
          </div>
          <div className="relative h-full">
            <div className="float-top-grabient-white"></div>
            <div className="float-bottom-grabient-white"></div>
            <div className=" h-full overflow-scroll p-4 pb-8">
              {[
                {
                  name: 'اردشیر رضایی',
                  orderValue: 'مجموعا 5 کیلو | 10,000 تومان',
                  order: 'نان خشک - پلاستیک',
                  status: 'processed',
                  link: 'link',
                },
                {
                  name: 'اردشیر رضایی',
                  orderValue: 'مجموعا 5 کیلو | 10,000 تومان',
                  order: 'نان خشک - پلاستیک',
                  status: 'processed',
                  link: 'link',
                },
                {
                  name: 'اردشیر رضایی',
                  orderValue: 'مجموعا 5 کیلو | 10,000 تومان',
                  order: 'نان خشک - پلاستیک',
                  status: 'processed',
                  link: 'link',
                },
                {
                  name: 'اردشیر رضایی',
                  orderValue: 'مجموعا 5 کیلو | 10,000 تومان',
                  order: 'نان خشک - پلاستیک',
                  status: 'processed',
                  link: 'link',
                },
                {
                  name: 'اردشیر رضایی',
                  orderValue: 'مجموعا 5 کیلو | 10,000 تومان',
                  order: 'نان خشک - پلاستیک',
                  status: 'processed',
                  link: 'link',
                },
                {
                  name: 'اردشیر رضایی',
                  orderValue: 'مجموعا 5 کیلو | 10,000 تومان',
                  order: 'نان خشک - پلاستیک',
                  status: 'processed',
                  link: 'link',
                },
                {
                  name: 'اردشیر رضایی',
                  orderValue: 'مجموعا 5 کیلو | 10,000 تومان',
                  order: 'نان خشک - پلاستیک',
                  status: 'processed',
                  link: 'link',
                },
              ].map((item, i) => {
                return (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <img className="ml-1 w-4" src={NoteGray} alt="سفارش‌های امروز" />
                    <div className=" flex justify-between items-center border border-color1 bg-white p-1 rounded-xlg w-full driver-float-order-box ">
                      <span className="font-yekanlight text-xs text-color4 w-4">1</span>
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                          <span className="font-yekanregular text-xs text-dark">اردشیر رضایی</span>
                          <span className="font-yekanregular text-xxs text-color2">
                            {item.orderValue}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-yekanregular text-xxs text-color2">
                            {item.order}
                          </span>
                          <div className="flex items-center relative">
                            <TextIconHiddenText
                              icon={OrderStatusToIcon('processed')}
                              status={ORDER_LIST_STATUS_CONVERT[item.status]}
                              title={ORDER_LIST_STATUS['processed']}
                              p="p-1"
                              titleFontSize="text-xxs"
                            />
                            <TextIcon
                              title="بیشتر"
                              icon={OutlinkBlue}
                              status="primary"
                              p="p-1 pl-2"
                              m="m-0"
                              titleFontSize="text-xxs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="driver-float-btn">اطلاعات راننده</div>
      </div>
    </div>
  )
}

export default DriverFloatBox
