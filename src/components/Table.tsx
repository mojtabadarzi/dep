import React from 'react'

//const
import { timeStampToJalali } from '../utils/helpers'

const state = {
  headers: [
    {
      number: 'شماره',
      wasteType: 'نوع پسماند',
      customerWeight: 'وزن وارد شده توسط مشتری',
      realWeight: 'وزن واقعی سفارش',
      submitDate: 'تاریخ ثبت',
      proccessDate: ' تاریخ پردازش',
      orderPrice: 'مبلغ سفارش',
      paymentPrice: 'مبلغ پرداخت شده',
    },
  ],
  orders: [
    {
      id: 1,
      wasteType: 'نوع پسماند',
      customerWeight: '5 کیلو',
      realWeight: '4.75 کیلو',
      submitDate: 'تاریخ ثبت',
      proccessDate: ' تاریخ پردازش',
      orderPrice: '10,000 تومان',
      paymentPrice: '9,700 تومان',
    },
    {
      id: 2,
      wasteType: 'نوع پسماند',
      customerWeight: '5 کیلو',
      realWeight: '4.75 کیلو',
      submitDate: 'تاریخ ثبت',
      proccessDate: ' تاریخ پردازش',
      orderPrice: '10,000 تومان',
      paymentPrice: '9,700 تومان',
    },
  ],
}
const firstTH = { borderTopRightRadius: 12, borderBottomRightRadius: 12, marginBottom: 16 }
const middleTH = { marginBottom: 16 }
const lastTH = { borderTopLeftRadius: 12, borderBottomLeftRadius: 12, marginBottom: 16 }
const firstTD = {
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  marginBottom: 16,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderRightWidth: 1,
  borderColor: '#92a4bb2b',
}
const middleTD = {
  marginBottom: 16,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#92a4bb2b',
}
const lastTD = {
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  marginBottom: 16,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  color: '#1641ff',
}
const NoItem = () => <p className="text-center text-aaa py-4 text-sm">چیزی برای نمایش وجود ندارد</p>

function Table({ data, loading }) {
  const renderTableHeader = () => {
    const header = Object.values(state.headers[0])
    return header.map((item, index) => {
      if (index === 0) {
        return (
          <th key={index} className="text-xs font-yekanbold text-color2">
            <div className="py-4 px-2 bg-color1" style={firstTH}>
              {item}
            </div>
          </th>
        )
      } else if (index !== 0 && index < header.length - 1) {
        return (
          <th key={index} className="text-xs font-yekanbold text-color2">
            <div className="py-4 px-2 bg-color1" style={middleTH}>
              {item}
            </div>
          </th>
        )
      } else {
        return (
          <th key={index} className="text-xs font-yekanbold text-color2">
            <div className="py-4 px-2 bg-color1" style={lastTH}>
              {item}
            </div>
          </th>
        )
      }
    })
  }
  const renderTableData = () => {
    return data.map((order, index) => {
      const { type, id, userWeight, userFee, userTime, agentWeight, agentFee, agentTime } = order
      return (
        <tr key={id * 91}>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12" style={firstTD}>
              {index + 1}
            </div>
          </td>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12" style={middleTD}>
              {type || ' ... '}
            </div>
          </td>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12 text-primary" style={middleTD}>
              {userWeight || 0} کیلوگرم
            </div>
          </td>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12 text-primary" style={middleTD}>
              {agentWeight || 0} کیلوگرم
            </div>
          </td>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12" style={middleTD}>
              {timeStampToJalali(userTime || 0)}
            </div>
          </td>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12" style={middleTD}>
              {timeStampToJalali(agentTime || 0)}
            </div>
          </td>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12" style={middleTD}>
              {userFee || 0} تومان
            </div>
          </td>
          <td>
            <div className="py-4 px-2 text-xs font-yekanlight h-12 text-primary" style={lastTD}>
              {agentFee || 0} تومان
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

export default Table
