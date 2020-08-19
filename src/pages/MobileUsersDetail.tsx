import React, { useEffect, useState } from 'react'
import axios from 'axios'
//redux
import { useSelectorUserInfo } from '../selectors/selectors'
//components
import PageTitle from 'src/components/PageTitle'
import SimpleCollapseWrapper from 'src/container/SimpleCollapseWrapper'
import SmartDeviceTable from 'src/container/SmartDeviceTable'
import UserAddressTable from 'src/components/UserAddressTable'
import OrdersUserTable from 'src/components/OrdersUserTable'
import InnerContent from 'src/container/InnerContent'
import MessageBox from '../components/MessageBox'
import PerformanceReport from '../components/PerformanceReport'
import Space from '../components/Space'
//const
import { ChevronRight } from 'src/utils/Icons'
import { baseURL, USER_DETAIL } from '../config'
import { handleError } from '../utils/helpers'

function MobileUsers({ location }) {
  const token = useSelectorUserInfo().token
  const header = {
    headers: { Authorization: `jwt ${token}` },
  }
  const ID = location.pathname.substring(14)

  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')

  const [userDetail, setUserDetail] = useState({})
  const [userDetailLoading, setUserDetailLoading] = useState(true)

  useEffect(() => {
    getUserDetail()
  }, [])

  const getUserDetail = () => {
    console.log(userDetailLoading)
    setUserDetailLoading(true)
    setMessageClass('message-hidden')
    axios
      .get(`${baseURL}${USER_DETAIL}${ID}`, header)
      .then((response) => {
        const { data } = response
        console.log('RES : ', response)

        const detail = {
          fullname: data?.fullname || ' ... ',
          email: data?.email || ' ... ',
          phonenumber: data?.phone_number || 0,
          username: data?.username || ' ... ',
          devices: data?.devices || [],
          addresses: data?.addresses || [],
          userorders: data?.userorders || [],
          seasonorder: data?.season_order || [],
        }
        setUserDetail(detail)
        setUserDetailLoading(false)
      })
      .catch((error) => {
        console.log('error.response ___ ', error.response)
        setUserDetailLoading(false)
        if (error.response && error.response.status) {
          const { status, msg = '' } = error.response
          setMessage(handleError(status, msg))
          setMessageClass('message-show')
        } else if (error.response === undefined) {
          setMessage(handleError(undefined, ''))
          setMessageClass('message-show')
        } else {
          setMessage(handleError('', ''))
          setMessageClass('message-show')
        }
      })
  }

  const closeMessageClass = () => {
    setMessageClass('message-hidden')
  }

  return (
    <InnerContent>
      <PageTitle
        classname="text-2xl mb-8 flex flex-row items-center justify-between"
        title="جزییات کاربران موبایل"
        icon={ChevronRight}
      />
      <SimpleCollapseWrapper
        wrpperTitle="مشخصات کاربر"
        wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
        position="relative"
      >
        {userDetailLoading ? (
          <div className="big-loading-parent">
            <div className="loading-three-dot"></div>
          </div>
        ) : (
          <div className="flex justify-start">
            <div className="flex flex-col items-start ml-16">
              <span className="text-sm m-2 text-color4 font-yekanlight">نام کاربری</span>
              <span className="text-sm m-2 text-color2 font-yekanbold ">
                {userDetail['username'] || '...'}
              </span>
            </div>
            <div className="flex flex-col items-start ml-16">
              <span className="text-sm m-2 text-color4 font-yekanlight">نام و نام خانوادگی</span>
              <span className="text-sm m-2 text-color2 font-yekanbold ">
                {userDetail['fullname'] || '...'}
              </span>
            </div>
            <div className="flex flex-col items-start ml-16">
              <span className="text-sm m-2 text-color4 font-yekanlight">شماره موبایل</span>
              <span className="text-sm m-2 text-color2 font-yekanbold ">
                {userDetail['phonenumber'] || '...'}
              </span>
            </div>
            <div className="flex flex-col items-start ml-16">
              <span className="text-sm m-2 text-color4 font-yekanlight">آدرس ایمیل</span>
              <span className="text-sm m-2 text-color2 font-yekanbold ">
                {userDetail['email'] || '...'}
              </span>
            </div>
          </div>
        )}
      </SimpleCollapseWrapper>
      <SimpleCollapseWrapper
        wrpperTitle="دستگاه‌های هوشمند"
        wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
        position="relative"
      >
        {userDetailLoading ? (
          <div className="big-loading-parent">
            <div className="loading-three-dot"></div>
          </div>
        ) : (
          <SmartDeviceTable data={userDetail['devices']} />
        )}
      </SimpleCollapseWrapper>
      <SimpleCollapseWrapper
        wrpperTitle="آدرس های کاربر"
        wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
        position="relative"
      >
        {userDetailLoading ? (
          <div className="big-loading-parent">
            <div className="loading-three-dot"></div>
          </div>
        ) : (
          <UserAddressTable data={userDetail['addresses']} />
        )}
      </SimpleCollapseWrapper>
      <SimpleCollapseWrapper
        wrpperTitle="سفارش های کاربر"
        wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
        position="relative"
      >
        {userDetailLoading ? (
          <div className="big-loading-parent">
            <div className="loading-three-dot"></div>
          </div>
        ) : (
          <OrdersUserTable data={userDetail['userorders']} />
        )}
      </SimpleCollapseWrapper>
      <SimpleCollapseWrapper
        wrpperTitle="گزارش عملکرد"
        wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
        position="relative"
      >
        {userDetailLoading ? (
          <div className="big-loading-parent">
            <div className="loading-three-dot"></div>
          </div>
        ) : (
          <PerformanceReport data={userDetail['seasonorder']} />
        )}
      </SimpleCollapseWrapper>
      <Space WH="h-16" />
      <MessageBox
        messageClass={messageClass}
        message={message}
        closeMessageClass={closeMessageClass}
      />
    </InnerContent>
  )
}
export default MobileUsers
