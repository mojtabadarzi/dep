import React from 'react'
//components
import NoItem from '../components/NoItem'
//const
import { OWNERSHIP } from 'src/utils/constant'
import plak from '../assets/images/pics/plak.svg'

const state = {
  headers: [
    {
      brand: 'برند',
      color: 'رنگ',
      model: 'مدل',
      chassis: 'شماره شاسی',
      manufacturingYear: 'سال ساخت',
      maxAllowableLoad: 'حداکثر بار',
      ownership: 'مالکیت',
      plate_number: 'شماره پلاک',
      station: ' کیوسک',
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

function CarsTable(props) {
  const { data = [], loading } = props
  console.log(data)
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
    return data?.map((item, index) => {
      const {
        brand,
        chassis,
        color,
        manufacturing_year,
        max_allowable_load,
        model,
        ownership,
        plate_number,
        station,
      } = item
      const MiddeDIV = ({ children, style }) => (
        <div className="bg-white p-2 h-16 text-xs font-yekanregular text-color2" style={style}>
          {children}
        </div>
      )

      return (
        <tr key={index} className="cursor-pointer hover:opacity-75">
          <td style={{ height: 70 }}>
            <div className="bg-white flex items-center p-2 h-16" style={firstTD}>
              <span className="bg-white text-xs mr-2 text-color2">{brand || ' ... '}</span>
            </div>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{color || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{model || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{chassis || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>{manufacturing_year || ' ... '}</MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>
              <b className="font-yekanbold ml-1">{max_allowable_load || ' 0 '}</b> کیلوگرم
            </MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <div className="bg-white p-2 h-16 " style={middleTD}>
              {OWNERSHIP[ownership] || ' ... '}
            </div>
          </td>
          <td style={{ height: 70 }}>
            <div
              className="bg-white p-2 h-16 font-yekanbold text-xs text-color2 relative"
              style={middleTD}
            >
              <img className="h-6" src={plak} alt={plate_number} />
              <span className="absolute text-sm" style={{ right: 60 }}>
                {plate_number || 0}
              </span>
            </div>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={lastTD}>
              <b className="font-yekanbold ml-1">{station || ' 0 '}</b>
            </MiddeDIV>
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

export default CarsTable
