import React from 'react'

//const
import NoItem from './NoItem'

const MobileUsers = ({ data = [] }) => {
  const renderTableHeader = () => {
    const headerClass = 'p-2 font-yekanlight mb-4 text-xs text-color4'
    return (
      <tr>
        <th>
          <div className={`${headerClass} pr-4`}>نام و نام خانوادگی</div>
        </th>
        <th>
          <div className={`${headerClass}`}>شماره همراه</div>
        </th>
        <th>
          <div className={`${headerClass}`}>ایمیل</div>
        </th>
      </tr>
    )
  }

  const renderTableData = () => {
    const bodyClass = 'text-color2 text-base font-yekanbold p-2 border-b border-color1 mb-2'
    return data.map((item, index) => {
      const { fullname, phone_number, email } = item
      return (
        <tr key={index}>
          <td>
            <div className={`${bodyClass} pr-4`}>{fullname || ' ... '}</div>
          </td>
          <td>
            <div className={`${bodyClass}`}>
              {'0' + (phone_number + '').substring(2) || ' ... '}
            </div>
          </td>
          <td>
            <div className={`${bodyClass}`}>{email || ' ... '}</div>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className="my-table">
      <table id="table">
        <thead>{renderTableHeader()}</thead>
        <tbody>{data.length !== 0 ? renderTableData() : <tr></tr>}</tbody>
      </table>
      {data.length === 0 ? <NoItem /> : ''}
    </div>
  )
}

export default MobileUsers
