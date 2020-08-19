import React, { useEffect, useState } from 'react'
import axios from 'axios'

//redux
import { useSelectorUserInfo } from '../selectors/selectors'

//const
import Phone from '../assets/images/icons/phone.png'
import {
  CreditCardLargeBlue,
  BasketBlack,
  PinLocationGray,
  ChevronRight,
  Nopic,
} from 'src/utils/Icons'
import { baseURL, ORDER_DETAIL } from '../config'
import { handleError } from '../utils/helpers'

//components
import WrapperSimple from '../container/WrapperSimple'
import Avatar from 'src/components/Avatar'
import Seprator from '../components/Seprator'
import PageTitle from '../components/PageTitle'
import TextIcon from '../components/TextIcon'
import Table from 'src/components/Table'
import BigTextIcon from 'src/components/BigTextIcon'
import DriverInfoTable from 'src/components/DriverInfoTable'
import InnerContent from 'src/container/InnerContent'
import MessageBox from '../components/MessageBox'

function OrderDetail(props) {
  const [orderDetailListLoading, setOrderDetailListLoading] = useState(true)
  const token = useSelectorUserInfo().token
  const header = {
    headers: { Authorization: `jwt ${token}` },
  }
  const ID = props.location.pathname.substring(15)

  const [orderDetailList, setOrderDetailList] = useState([])
  const [driverInfo, setDriverInfo] = useState([{}])
  const [wastesInfo, setWastesInfo] = useState([{}])
  const [orderNumber, setOrderNumber] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalWeight, setTotalWeight] = useState(0)
  const [wasteStatus, setWasteStatus] = useState(0)

  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')

  useEffect(() => {
    getOrderDetailList()
  }, [])

  const getOrderDetailList = () => {
    setOrderDetailListLoading(true)
    setMessageClass('message-hidden')
    axios
      .get(`${baseURL}${ORDER_DETAIL}${ID}/`, header)
      .then((response) => {
        console.log('.response ___ orderdetail ', response)
        const { data } = response
        setOrderDetailList(response.data)
        setOrderDetailListLoading(false)
        const driverInfo = [
          {
            avatar: data?.agent_vehicle?.agent?.avatar || Nopic,
            fullname: data?.agent_vehicle?.agent?.fullname || ' ... ',
            phone: data?.agent_vehicle?.agent?.phone_number || 0,
            plate: data?.agent_vehicle?.vehicle?.plate_number || 0,
            vehicle:
              (data?.agent_vehicle?.vehicle?.brand || ' ... ') +
              ' - ' +
              (data?.agent_vehicle?.vehicle?.color || ' ... ') +
              ' - ' +
              (data?.agent_vehicle?.vehicle?.model || ' ... '),
            workers: data?.vehicle_worker || [],
            company: 'پارسیان ',
            status: data?.agent_vehicle?.agent?.status || 100,
            location: ' ... ',
          },
        ]
        setDriverInfo(driverInfo)

        const userInfo = [{}]
        const agentInfo = [{}]
        const wasteInfo = [{}]
        if (data.userorderwastes.length > 0) {
          for (let i = 0; i < data.userorderwastes.length; i++) {
            userInfo[i] = {
              id: data?.userorderwastes[i]?.waste?.id || 0,
              type: data?.userorderwastes[i]?.waste?.type || ' ... ',
              userWeight: data?.userorderwastes[i]?.weight || 0,
              userFee: data?.userorderwastes[i]?.fee || 0,
              userTime: data?.userorderwastes[i]?.created_time || 0,
            }
          }
        }
        if (data.agentorderwastes.length > 0) {
          for (let i = 0; i < data.agentorderwastes.length; i++) {
            agentInfo[i] = {
              agentWeight: data?.agentorderwastes[i]?.weight || 0,
              agentFee: data?.agentorderwastes[i]?.fee || 0,
              agentTime: data?.agentorderwastes[i]?.created_time || 0,
            }
          }
        }
        if (userInfo.length > 0) {
          for (let i = 0; i < userInfo.length; i++) {
            wasteInfo[i] = Object.assign(userInfo[i] || {}, agentInfo[i] || {})
          }
        }
        setWastesInfo(wasteInfo || [{}])
        setOrderNumber(data?.code || 0)
        setTotalPrice(data?.total_price || 0)
        setTotalWeight(data?.total_weight || 0)
        setWasteStatus(data?.status || 100)
      })
      .catch((error) => {
        console.log('error.response ___ ', error.response)
        setOrderDetailListLoading(false)

        if (error.response && error.response.status) {
          const { status } = error.response
          setMessage(handleError(status, ''))
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
      <div className="pb-8">
        <PageTitle
          classname="text-2xl mb-8 flex items-center"
          title="جزئیات سفارش"
          icon={ChevronRight}
        />

        <WrapperSimple wrpperTitle="اطلاعات مشتری" position="relative">
          {orderDetailListLoading ? (
            <div className="big-loading-parent">
              <div className="loading-three-dot"></div>
            </div>
          ) : (
            <div className="flex items-center">
              <Avatar
                pic={
                  orderDetailList && orderDetailList['user'] && orderDetailList['user']['avatar']
                    ? orderDetailList['user']['avatar']
                    : Nopic
                }
                width="56px"
                height="56px"
                padding="2px"
                borderRadiusParent="18px"
                borderRadiusPic="18px"
                borderColor="#92a4bb"
              />
              <PageTitle
                classname="text-base mr-2"
                title={
                  orderDetailList && orderDetailList['user'] && orderDetailList['user']['fullname']
                    ? orderDetailList['user']['fullname']
                    : 'بدون نام'
                }
              />
              <PageTitle classname="text-xs mr-1 text-gray-400" title="(کاربر)" />
              <Seprator />
              <TextIcon
                icon={Phone}
                title={
                  orderDetailList &&
                  orderDetailList['user'] &&
                  orderDetailList['user']['phone_number']
                    ? orderDetailList['user']['phone_number']
                    : 'بدون شماره'
                }
                status={7}
                p="pr-2 pl-16 py-1"
              />
              <Seprator />
              <TextIcon
                icon={PinLocationGray}
                title={
                  orderDetailList &&
                  orderDetailList['address'] &&
                  orderDetailList['address']['full_address']
                    ? orderDetailList['address']['full_address']
                    : 'بدون آدرس'
                }
                status={7}
                p="pr-2 pl-16 py-1"
              />
            </div>
          )}
        </WrapperSimple>

        <WrapperSimple
          wrpperTitle="اطلاعات سفارش"
          leftTitle="وضعیت سفارش :"
          orderTitle="شماره سفارش :"
          orderNumber={orderNumber}
          orderStatus="primary"
          icon={wasteStatus}
          iconStatus={wasteStatus}
          position="relative"
        >
          {orderDetailListLoading ? (
            <div className="big-loading-parent">
              <div className="loading-three-dot"></div>
            </div>
          ) : (
            <>
              <Table data={wastesInfo || [{}]} loading={orderDetailListLoading} />
              <div className="flex justify-end mt-4">
                <BigTextIcon
                  icon={BasketBlack}
                  title="پسماند جمع آوری شده"
                  content={`${totalWeight || 0} کیلوگرم`}
                  status="default"
                  marginLeft="16px"
                />
                <BigTextIcon
                  icon={CreditCardLargeBlue}
                  title="مجموع مبلغ پرداخت شده"
                  content={`${totalPrice || 0} تومان`}
                  status="primary"
                />
              </div>
            </>
          )}
        </WrapperSimple>
        <WrapperSimple wrpperTitle="اطلاعات راننده" position="relative">
          {orderDetailListLoading ? (
            <div className="big-loading-parent">
              <div className="loading-three-dot"></div>
            </div>
          ) : (
            <DriverInfoTable data={driverInfo} loading={orderDetailListLoading} />
          )}
        </WrapperSimple>
      </div>
      <MessageBox
        messageClass={messageClass}
        message={message}
        closeMessageClass={closeMessageClass}
      />
    </InnerContent>
  )
}
export default OrderDetail
