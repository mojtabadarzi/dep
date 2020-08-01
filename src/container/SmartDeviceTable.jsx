import React, { Fragment } from 'react'
import { timeStampToJalali } from '../utils/helpers'
import NoItem from 'src/components/NoItem'

function SmartDeviceTable(props) {
  const { data = [], loading } = props
  const header = [
    {
      deviceBrand: 'نام برند',
      deviceModel: 'مدل',
      deviceUuid: 'شناسه یکتا',
      createdTime: 'تاریخ ثبت در سامانه',
      notifyToken: 'شناسه ارسال پوش',
    },
  ]

  const renderTableHeader = () => {
    const headClass = 'p-2 font-yekanlight mb-4 text-xs text-color4'
    return header.map((item, index) => {
      return (
        <tr key={index}>
          <th>
            <div className={`${headClass} pr-4`}>{item['deviceBrand']}</div>
          </th>
          <th>
            <div className={`${headClass}`}>{item['deviceModel']}</div>
          </th>
          <th>
            <div className={`${headClass}`}>{item['deviceUuid']}</div>
          </th>
          <th>
            <div className={`${headClass}`}>{item['createdTime']}</div>
          </th>
          <th>
            <div className={`${headClass}`}>{item['notifyToken']}</div>
          </th>
        </tr>
      )
    })
  }

  const renderTableData = () => {
    const bodyClass =
      'text-color2 text-base font-yekanbold p-2 border-b border-color1 flex items-center h-16 mb-2'
    return data.map((driver, index) => {
      return (
        <Fragment key={index}>
          <tr>
            <td>
              <div className={`${bodyClass} pr-4`}>{driver['device_brand'] || '...'}</div>
            </td>
            <td>
              <div className={`${bodyClass}`}>{driver['device_model'] || '...'}</div>
            </td>
            <td>
              <div className={`${bodyClass}`}>{driver['device_uuid'] || '...'}</div>
            </td>
            <td>
              <div className={`${bodyClass}`}>
                {timeStampToJalali(driver['created_time']) || '...'}
              </div>
            </td>
            <td>
              <div className={`${bodyClass}`}>{driver['notify_token'].substr(0, 15) + '...'}</div>
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
        <tbody>{data.length > 0 ? renderTableData() : <tr></tr>}</tbody>
      </table>
      {data.length === 0 ? <NoItem /> : ''}
    </div>
  )
}

export default SmartDeviceTable
