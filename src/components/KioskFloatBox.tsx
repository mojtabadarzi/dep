import React from 'react'
import profile from 'src/assets/images/pics/profile.webp'
import Avatar from './Avatar'
import { WarehouseGray, CloseWhite, RecycleGray } from 'src/utils/Icons'
import NoItem from '../components/NoItem'
//const
import { DAYS_OF_WEEK_NUMBER_TO_PERSIAN } from './../utils/constant'

const KioskFloatBox = (props) => {
  const { closeFloat, data = [], loading } = props

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
        <div className="kiosk-float-box">
          <div className="kiosk-float-child ">
            <img
              className="w-6 rounded-xs cursor-pointer mt-4 mr-4 absolute "
              onClick={closeFloat}
              src={CloseWhite}
              alt="بستن"
            />
            <div>
              <img src={data?.image || ''} alt="غرفه" />
            </div>
            <div className="p-4">
              <span className="font-yekanregular text-base text-color2 mt-4">
                {data?.title || ' ... '}
              </span>
              <div className="flex flex-col border-b border-color1 py-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-yekanlight text-xs text-color4">منطقه کاری</span>
                  <span className="font-yekanbold text-xs text-color2">
                    {data?.district || ' ... '}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-yekanlight text-xs text-color4">ساعت کاری</span>
                  <span className="font-yekanbold text-xs text-color2">
                    {DAYS_OF_WEEK_NUMBER_TO_PERSIAN[data?.schedules?.start_day]} تا
                    {DAYS_OF_WEEK_NUMBER_TO_PERSIAN[data?.schedules?.end_day]} از
                    {data?.schedules?.start_time.substr(0, 2)} الی
                    {data?.schedules?.end_time.substr(0, 2)}{' '}
                  </span>
                </div>
              </div>
              <div className="border-b border-color1 py-2">
                <div className=" flex items-center mb-2">
                  <img className="ml-2" src={WarehouseGray} alt="غرفه" />
                  <span className="font-yekanlight text-xs text-color4">مسئول کیوسک</span>
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
                    <span className="font-yekanbold text-sm text-color2">رضا ایمان نژاد</span>
                    <span className="font-yekanlight text-xs text-color2">0912-100-2121</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-2">
                <div className=" flex items-center mb-2">
                  <img className="ml-2" src={RecycleGray} alt="غرفه" />
                  <span className="font-yekanlight text-xs text-color4">آمار</span>
                </div>
                <div style={{ height: 220 }} className="pb-8 overflow-scroll">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-yekanlight text-xs text-color4">
                      مقدار کامل تحویل داده شده
                    </span>
                    <span className="font-yekanbold text-xs text-primary">430 کیلو </span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-yekanlight text-xs text-color4">
                      مقدار کامل تحویل داده شده
                    </span>
                    <span className="font-yekanbold text-xs text-primary">120 کیلو</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default KioskFloatBox
