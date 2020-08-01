import React from 'react'

//components
import OrderStatus from '../components/OrderStatus'

//const
import { OrderStatusToIcon } from 'src/utils/helpers'
import NoItem from './NoItem'

function OrdersUserTable({ data = [] }) {
  const renderTableHeader = () => {
    const headerClass = 'p-2 font-yekanlight mb-4 text-xs text-color4'
    return (
      <tr>
        <th>
          <div className={`${headerClass} pr-4`}>شماره سفارش</div>
        </th>
        <th>
          <div className={`${headerClass}`}>پسماندهای سفارش</div>
        </th>
        <th>
          <div className={`${headerClass}`}>مبلغ سفارش</div>
        </th>
        <th>
          <div className={`${headerClass}`}>وضعیت</div>
        </th>
      </tr>
    )
  }

  const renderTableData = () => {
    const bodyClass =
      'text-color2 text-base font-yekanbold p-2 border-b border-color1 h-16 flex items-center mb-2'
    return data.map((item, index) => {
      const wastesSeprator = () => {
        let char = ''
        item['userorderwastes'].map((wastes, index) => {
          if (index !== item['userorderwastes'].length - 1) {
            char += ' ' + wastes['waste']['type'] + ' - '
          } else {
            char += ' ' + wastes['waste']['type']
          }
        })
        return char
      }
      return (
        <tr key={index}>
          <td>
            <div className={`${bodyClass} pr-4`}>{item['code'] || 0}</div>
          </td>
          <td>
            <div className={`${bodyClass}`}>{wastesSeprator()}</div>
          </td>
          <td>
            <div className={`${bodyClass}`}>{item['agent_total_price'] || 0} تومان</div>
          </td>
          <td>
            <div className={`${bodyClass}`}>
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
        <thead>{renderTableHeader()}</thead>
        <tbody>{data.length !== 0 ? renderTableData() : <tr></tr>}</tbody>
      </table>
      {data.length === 0 ? <NoItem /> : ''}
    </div>
  )
}

export default OrdersUserTable
