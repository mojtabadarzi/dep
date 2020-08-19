import React from 'react'
import { withRouter } from 'react-router-dom'
//const
import NoItem from './NoItem'

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

const MobileUsers = (props) => {
  const { history, data = [], loading } = props

  const renderTableHeader = () => {
    return (
      <tr>
        <th>
          <div className="py-4 px-2 font-yekanbold " style={firstTH}>
            نام و نام خانوادگی
          </div>
        </th>
        <th className="text-xs font-yekanbold text-color2">
          <div className="py-4 px-2 font-yekanbold " style={middleTH}>
            شماره همراه
          </div>
        </th>
        <th className="text-xs font-yekanbold text-color2">
          <div className="py-4 px-2 font-yekanbold " style={lastTH}>
            ایمیل
          </div>
        </th>
      </tr>
    )
  }

  const renderTableData = () => {
    const bodyClass = 'text-color2 text-base font-yekanbold p-2 border-b border-color1 mb-2'
    return data.map((item, index) => {
      const MiddeDIV = ({ children, style }) => (
        <div className="bg-white p-2 h-16 text-xs font-yekanregular text-color2" style={style}>
          {children}
        </div>
      )
      const { fullname, phone_number, email, id } = item
      return (
        <tr
          key={index}
          onClick={() => history.push(`/mobile-users/${id}`)}
          className="cursor-pointer hover:opacity-75"
        >
          <td style={{ height: 70 }}>
            <div className="bg-white flex items-center p-2 h-16" style={firstTD}>
              {fullname || ' ... '}
            </div>
          </td>
          <td style={{ height: 70 }}>
            <MiddeDIV style={middleTD}>
              {'0' + (phone_number + '').substring(2) || ' ... '}
            </MiddeDIV>
          </td>
          <td style={{ height: 70 }}>
            <div className="bg-white p-2 h-16 " style={lastTD}>
              {email || ' ... '}
            </div>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className="my-table">
      <table id="table">
        <thead>{renderTableHeader()}</thead>
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

export default withRouter(MobileUsers)
