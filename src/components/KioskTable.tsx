import React from 'react'
import { withRouter } from 'react-router-dom'
//components
import Avatar from './Avatar'
import KioskStatus from './KioskStatus'
import NoItem from '../components/NoItem'
//const
import { Nopic } from 'src/utils/Icons'
import { kioskStatusConvertorIcon } from 'src/utils/helpers'

const state = {
  headers: [
    {
      title: 'عنوان',
      district: 'ناحیه',
      fullAddress: 'آدرس کامل',
      schedules: 'ساعت کاری',
      isActive: 'وضعیت',
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

function KioskTable(props) {
  const { history, data = [], loading } = props

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
      const timeZone = (arr = []) => {
        return arr.map((item, index) => {
          return (
            <div key={index}>
              از<span className="mx-1 font-yekanbold"> {item['start_day']} </span>
              تا<span className="mx-1 font-yekanbold"> {item['end_day']} </span>
              ساعت{' '}
              <span className="mx-1 font-yekanbold">
                {' '}
                {(item['start_time'] + '').substr(0, 5)}{' '}
              </span>
              الی
              <span className="mx-1 font-yekanbold"> {(item['end_time'] + '').substr(0, 5)} </span>
            </div>
          )
        })
      }
      const {
        id,
        title,
        stationimages,
        district,
        full_address,
        schedules,
        is_active,
        latitude,
        longitude,
      } = item
      return (
        <tr
          key={id}
          className="cursor-pointer hover:opacity-75"
          onClick={() =>
            history.push({ pathname: `/kiosks/map/${id}`, state: { latitude, longitude } })
          }
        >
          <td style={{ height: 70 }}>
            <div className="bg-white flex items-center p-2 h-16" style={firstTD}>
              <Avatar
                pic={stationimages[0] || Nopic}
                width="48px"
                height="48px"
                padding="1px"
                borderRadiusParent="12px"
                borderRadiusPic="12px"
              />
              <span className="bg-white text-xs mr-2 text-color2">{title || ' ... '}</span>
            </div>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{district || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{full_address || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <div className="bg-white p-2 h-16 text-xs font-yekanregular text-color2 flex flex-col justify-center">
              {timeZone(schedules) || ' ... '}
            </div>
          </td>
          <td style={{ height: 70 }}>
            <div className="bg-white p-2 h-16 " style={lastTD}>
              <KioskStatus
                icon={kioskStatusConvertorIcon(is_active)}
                status={is_active}
                borderWidth={is_active === 0 ? 1 : 0}
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

export default withRouter(KioskTable)
