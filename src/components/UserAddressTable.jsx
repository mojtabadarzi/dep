import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

//components
import Notification from './Notification'
import { PinLocationGray } from 'src/utils/Icons'
import { ADDRESS_TYPE } from '../utils/constant'
import NoItem from './NoItem'
function UserAddressTable(props) {
  const { data = [], history } = props
  const header = [
    {
      addressName: 'نام آدرس',
      completeAddress: 'آدرس کامل',
      locationUsageType: 'نوع کاربری محل',
      showLocation: 'نمایش موقعیت',
    },
  ]
  const renderTableHeader = () => {
    const headerClass = 'p-2 font-yekanlight mb-4 text-xs text-color4'
    return header.map((item, index) => {
      return (
        <tr key={index}>
          <th>
            <div className={`${headerClass} pr-4`}>{item['addressName']}</div>
          </th>
          <th>
            <div className={`${headerClass}`}>{item['completeAddress']}</div>
          </th>
          <th>
            <div className={`${headerClass}`}>{item['locationUsageType']}</div>
          </th>
          <th>
            <div className={`${headerClass}`}>{item['showLocation']}</div>
          </th>
        </tr>
      )
    })
  }

  const renderTableData = () => {
    const bodyClass =
      'text-color2 text-base font-yekanbold p-2 border-b border-color1 h-16 flex items-center mb-2'
    return data.map((item, index) => {
      return (
        <Fragment key={index}>
          <tr>
            <td>
              <div className={`${bodyClass} pr-4`}>{item['title'] || '...'}</div>
            </td>
            <td>
              <div className={`${bodyClass}`}>{item['full_address'] || '...'}</div>
            </td>
            <td>
              <div className={`${bodyClass}`}>{ADDRESS_TYPE[item['address_type']] || '...'}</div>
            </td>
            <td>
              <div className={`${bodyClass}`}>
                <Notification
                  backgroundColor="#bdc8d6"
                  pic={PinLocationGray}
                  click={() => history.push(`/${index}`)}
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
        <thead>{renderTableHeader()}</thead>
        <tbody>{data.length !== 0 ? renderTableData() : <tr></tr>}</tbody>
      </table>
      {data.length === 0 ? <NoItem /> : ''}
    </div>
  )
}

export default withRouter(UserAddressTable)
