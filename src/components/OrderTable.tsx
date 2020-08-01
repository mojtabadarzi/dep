import React from 'react'
import { withRouter } from 'react-router-dom'
//components
import Avatar from './Avatar'
import OrderStatus from '../components/OrderStatus'
import NoItem from '../components/NoItem'
//const
import { Nopic } from 'src/utils/Icons'
import { OrderStatusToIcon, timeStampToJalali } from 'src/utils/helpers'

const state = {
  headers: [
    {
      name: 'نام و نام خانوادگی',
      phone: 'شماره تماس',
      orderNumber: 'شماره سفارش',
      driverName: 'نام راننده',
      orderPrice: 'مبلغ سفارش',
      orderDetails: 'جزییات سفارش',
      orderWeight: 'وزن سفارش',
      submitDate: 'تاریخ سفارش',
      status: 'وضعیت',
    },
  ],
}
const firstTH = { borderTopRightRadius: 12, borderBottomRightRadius: 12, marginBottom: 16 }
const middleTH = { marginBottom: 16 }
const lastTH = { borderTopLeftRadius: 12, borderBottomLeftRadius: 12, marginBottom: 16 }
const firstTD = {
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  display: 'flex',
  alignItems: 'center',
}
const middleTD = {
  display: 'flex',
  alignItems: 'center',
}
const lastTD = {
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  color: '#1641ff',
  display: 'flex',
  alignItems: 'center',
}

function OrderTable(props) {
  const { history, data = [], loading } = props
  const limitChar = (char) => {
    if (char.length > 24) {
      return char.substr(0, 30) + '...'
    }
    return char
  }

  const renderTableHeader = () => {
    const header = Object.values(state.headers[0])
    return header.map((item, index) => {
      if (index === 0) {
        return (
          <th key={index} className="text-xs font-yekanbold text-color2">
            <div className="py-4 px-2 font-yekanbold " style={firstTH}>
              {item}
            </div>
          </th>
        )
      } else if (index !== 0 && index < header.length - 1) {
        return (
          <th key={index} className="text-xs font-yekanbold text-color2">
            <div className="py-4 px-2 font-yekanbold " style={middleTH}>
              {item}
            </div>
          </th>
        )
      } else {
        return (
          <th key={index} className="text-xs font-yekanbold text-color2">
            <div className="py-4 px-2 font-yekanbold " style={lastTH}>
              {item}
            </div>
          </th>
        )
      }
    })
  }
  const renderTableData = () => {
    return data?.map((item) => {
      const MiddeDIV = ({ children, style }) => (
        <div className="bg-white p-2 h-16 text-xs font-yekanregular text-color2" style={style}>
          {children}
        </div>
      )
      const time = new Date(item.created_time).getTime()
      const wastes = () => {
        let char = ''
        item?.wastes?.map((waste, index) => {
          if (index !== waste.length - 1) {
            char += ' ' + waste + ' - '
          } else {
            char += ' ' + waste
          }
        })
        return char
      }
      return (
        <tr
          key={item?.id}
          className="cursor-pointer hover:opacity-75"
          onClick={() => history.push(`/orders/detail/${item['id']}`)}
        >
          <td style={{ height: 70 }}>
            <div className="bg-white flex items-center p-2 h-16" style={firstTD}>
              <Avatar
                pic={item?.user?.avatar || Nopic}
                width="48px"
                height="48px"
                padding="1px"
                borderRadiusParent="12px"
                borderRadiusPic="12px"
              />
              <span className="bg-white text-xs mr-2 text-color2">
                {item?.user?.fullname || ' ... '}
              </span>
            </div>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{item?.user?.phone_number || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{item?.id || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{item?.agent?.fullname || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>
              <b className="font-yekanbold ml-1">{item?.user_total_price || ' 0 '}</b> تومان
            </MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{limitChar(wastes()) || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>
              <b className="font-yekanbold ml-1">{item.total_weight / 1000 || ' 0 '}</b> کیلوگرم
            </MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <div className="bg-white p-2 h-16 font-yekanbold text-xs text-color2" style={middleTD}>
              {timeStampToJalali(time) || ' ... '}
            </div>
          </td>
          <td style={{ height: 70 }}>
            <div className="bg-white p-2 h-16 " style={lastTD}>
              <OrderStatus
                icon={OrderStatusToIcon(item.status)}
                status={item.status}
                borderWidth={item.status === 0 ? 1 : 0}
                border={true}
              />
            </div>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className="my-table">
      <table id="table">
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>
          {!loading && data.length === 0 ? (
            <tr>
              <th></th>
            </tr>
          ) : (
            renderTableData()
          )}
        </tbody>
      </table>
      {!loading && data.length === 0 ? <NoItem /> : ''}
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <div className="loading-three-dot"></div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default withRouter(OrderTable)
