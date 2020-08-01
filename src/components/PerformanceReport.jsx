import React from 'react'

//const
import NoItem from './NoItem'

const PerformanceReport = ({ data = [] }) => {
  const renderTableHeader = () => {
    const headerClass = 'p-2 font-yekanlight mb-4 text-xs text-color4'
    return (
      <tr>
        <th>
          <div className={`${headerClass} pr-4`}>نوع</div>
        </th>
        <th>
          <div className={`${headerClass}`}>بازه زمانی</div>
        </th>
        <th>
          <div className={`${headerClass}`}>درآمد</div>
        </th>
      </tr>
    )
  }

  const renderTableData = () => {
    const bodyClass = 'text-color2 text-base font-yekanbold p-2 border-b border-color1 mb-2'
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <div className={`${bodyClass} pr-4`}>
              {item['waste__type'] || 0} ({item['weight__sum'] || 0} کیلو )
            </div>
          </td>
          <td>
            <div className={`${bodyClass}`}>سه ماهه</div>
          </td>
          <td>
            <div className={`${bodyClass}`}>{item['fee__sum'] || 0} تومان</div>
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

export default PerformanceReport
