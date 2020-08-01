import React from 'react'
import { withRouter } from 'react-router-dom'
//components
import UserStatus from '../components/UserStatus'
import Avatar from './Avatar'
import NoItem from '../components/NoItem'
//const
import plak from '../assets/images/pics/plak.svg'
import Notification from './Notification'
import { PinLocationGray, Nopic } from 'src/utils/Icons'
import { userStatusConvertorIcon, ArrayToSequenceImages } from 'src/utils/helpers'

const state = {
  headers: [
    {
      name: 'نام و نام خانوادگی',
      phone: 'شماره تماس',
      plate: 'پلاک خودرو',
      carInfo: 'مدل و مشخصات خودرو',
      companionsPresent: 'همراهان حاضر در خودرو',
      companyName: 'نام شرکت پیمانکار',
      status: 'وضعیت',
      showLocation: 'نمایش موقعیت',
    },
  ],
}
const firstTH = {
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const middleTH = {
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const lastTH = {
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const firstTD = {
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  marginBottom: 8,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderRightWidth: 1,
  borderColor: '#f7f9fc',
  display: 'flex',
  alignItems: 'center',
}
const middleTD = {
  marginBottom: 8,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#f7f9fc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const lastTD = {
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  marginBottom: 8,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderColor: '#f7f9fc',
  color: '#1641ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

function DriverInfoTable(props) {
  const { history, data = [], loading, goToEditPage = () => {} } = props
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
    return data.map((driver) => {
      const {
        id,
        editId,
        avatar,
        fullname,
        phone,
        plate,
        vehicle,
        company,
        workers = [],
        status,
        location,
      } = driver

      return (
        <tr
          key={id}
          className="cursor-pointer hover:opacity-75"
          onClick={() => goToEditPage(editId)}
        >
          <td>
            <div className="pr-2 h-16 bg-white" style={firstTD}>
              <Avatar
                pic={avatar || Nopic}
                width="48px"
                height="48px"
                padding="1px"
                borderRadiusParent="12px"
                borderRadiusPic="12px"
                borderColor="#f7f9fc"
              />
              <span className="text-xs font-yekanbold mr-2 bg-white">{fullname || ' ... '}</span>
            </div>
          </td>
          <td>
            <div className="h-16 text-xs font-yekanlight bg-white" style={middleTD}>
              {phone || 0}
            </div>
          </td>
          <td>
            <div
              className="relative h-16 text-xs font-yekanlight text-primary bg-white"
              style={middleTD}
            >
              <img className="h-6" src={plak} alt={plate} />
              <span className="absolute text-sm" style={{ right: 70 }}>
                {plate || 0}
              </span>
            </div>
          </td>
          <td>
            <div className="h-16 text-xs font-yekanlight text-primary bg-white" style={middleTD}>
              {vehicle || ' ... '}
            </div>
          </td>
          <td>
            <div className="h-16 flex bg-white" style={middleTD}>
              {ArrayToSequenceImages(workers) || 'بدون عکس'}
            </div>
          </td>
          <td>
            <div className="h-16 text-xs font-yekanlight bg-white" style={middleTD}>
              {company || ' ... '}
            </div>
          </td>
          <td>
            <div className="h-16 bg-white" style={middleTD}>
              <UserStatus icon={userStatusConvertorIcon(status)} status={status} />
            </div>
          </td>
          <td>
            <div className="h-16 bg-white" style={lastTD}>
              <Notification pic={PinLocationGray} click={() => history.push(`/${location}`)} />
            </div>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className="my-table relative">
      <table id="table">
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>
          {!loading && data === 0 ? (
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
        <div className="w-full flex justify-center items-center absolute bottom-0 bg-whiteglass">
          <div className="loading-three-dot"></div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default withRouter(DriverInfoTable)
