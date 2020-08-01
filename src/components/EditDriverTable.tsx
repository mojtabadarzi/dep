import React, { Fragment } from 'react'

//components
import profile from '../assets/images/pics/profile.webp'
import TextIcon from '../components/TextIcon'
import Avatar from './Avatar'

//icons
import { DRIVERS_STATUS, DRIVERS_STATUS_CONVERT } from 'src/utils/constant'

//helper
import { DriverStatusToIcon } from 'src/utils/helpers'

const state = {
  headers: [
    {
      orderer: 'کاربر سفارش دهنده',
      orderNumber: 'شماره سفارش',
      orderResidue: 'پسمانده های سفارش',
      orderPrice: 'مبلغ سفارش',
      status: 'وضعیت',
    },
  ],
  orderers: [
    {
      orderer: 'اردشیر رضایی',
      orderNumber: '234678',
      orderResidue: 'نان خشک ( ۵ کیلو ) ',
      orderPrice: '10,000 تومان',
      status: 'active',
    },
    {
      orderer: 'اردشیر رضایی',
      orderNumber: '234678',
      orderResidue: 'نان خشک ( ۵ کیلو ) ',
      orderPrice: '10,000 تومان',
      status: 'deactive',
    },
    {
      orderer: 'اردشیر رضایی',
      orderNumber: '234678',
      orderResidue: 'نان خشک ( ۵ کیلو ) ',
      orderPrice: '10,000 تومان',
      status: 'leave',
    },
    {
      orderer: 'اردشیر رضایی',
      orderNumber: '234678',
      orderResidue: 'نان خشک ( ۵ کیلو ) ',
      orderPrice: '10,000 تومان',
      status: 'active',
    },
  ],
}
const firstTH = { borderTopRightRadius: 12, borderBottomRightRadius: 12, marginBottom: 16 }
const middleTH = { marginBottom: 16 }
const lastTH = { borderTopLeftRadius: 12, borderBottomLeftRadius: 12, marginBottom: 16 }
const TDStyle = {
  marginBottom: 16,
  borderBottomWidth: 1,
  borderColor: '#f7f9fc',
  display: 'flex',
  alignItems: 'center',
}

function EditDriverTable() {
  const renderTableHeader = () => {
    const header = Object.values(state.headers[0])
    return header.map((item, index) => {
      if (index === 0) {
        return (
          <th key={index} className="text-xs text-color2">
            <div className="py-4 px-2 bg-color1 font-yekanbold" style={firstTH}>
              {item}
            </div>
          </th>
        )
      } else if (index !== 0 && index < header.length - 1) {
        return (
          <th key={index} className="text-xs  text-color2">
            <div className="py-4 px-2 bg-color1 font-yekanbold" style={middleTH}>
              {item}
            </div>
          </th>
        )
      } else {
        return (
          <th key={index} className="text-xs  text-color2">
            <div className="py-4 px-2 bg-color1 font-yekanbold" style={lastTH}>
              {item}
            </div>
          </th>
        )
      }
    })
  }
  const renderTableData = () => {
    return state.orderers.map((driver, index) => {
      const { orderer, orderNumber, orderResidue, orderPrice, status } = driver

      return (
        <Fragment key={index}>
          <tr>
            <td>
              <div className="flex items-center p-2 h-16 bg-white" style={TDStyle}>
                <Avatar
                  pic={profile}
                  width="48px"
                  height="48px"
                  padding="1px"
                  borderRadiusParent="100px"
                  borderRadiusPic="100px"
                  borderColor="#f7f9fc"
                />
                <span className="text-xs font-yekanbold mr-2 bg-white">{orderer}</span>
              </div>
            </td>
            <td>
              <div className="p-2 h-16 text-xs font-yekanlight bg-white" style={TDStyle}>
                {orderNumber}
              </div>
            </td>
            <td>
              <div className="p-2 h-16 text-xs font-yekanlight  bg-white" style={TDStyle}>
                {orderResidue}
              </div>
            </td>
            <td>
              <div className="p-2 h-16 text-xs font-yekanbold bg-white" style={TDStyle}>
                {orderPrice}
              </div>
            </td>
            <td>
              <div className="p-2 h-16 bg-white" style={TDStyle}>
                <TextIcon
                  icon={DriverStatusToIcon(status)}
                  title={DRIVERS_STATUS[status]}
                  status={DRIVERS_STATUS_CONVERT[status]}
                />
              </div>
            </td>
          </tr>
        </Fragment>
      )
    })
  }
  return (
    <div className="my-table">
      <table id="table">
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  )
}

export default EditDriverTable
