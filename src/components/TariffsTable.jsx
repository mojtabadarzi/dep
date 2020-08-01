import React from 'react'
//components
import Avatar from './Avatar'
//const
import NoItem from './NoItem'
import { Nopic } from 'src/utils/Icons'

const TariffsTable = ({ data = [] }) => {
  const renderTableHeader = () => {
    const headerClass = 'p-2 font-yekanlight mb-4 text-xs text-color4'
    return (
      <tr>
        <th>
          <div className={`${headerClass} pr-4`}>توضیحات</div>
        </th>
        <th>
          <div className={`${headerClass}`}>انواع ضایعات</div>
        </th>
        <th>
          <div className={`${headerClass}`}>نوع</div>
        </th>
        <th>
          <div className={`${headerClass}`}>قیمت (کیلو)</div>
        </th>
      </tr>
    )
  }

  const renderTableData = () => {
    const bodyClass = 'text-color2 text-base font-yekanbold p-2 border-b border-color1 mb-2'
    return data.map((item, index) => {
      const { cover, description, type, samples, price_per_kilo } = item
      return (
        <tr key={index}>
          <td>
            <div
              className="bg-white flex items-center p-2 h-16"
              className={`${bodyClass} flex items-center`}
            >
              <Avatar
                pic={cover || Nopic}
                width="48px"
                height="48px"
                padding="1px"
                borderRadiusParent="12px"
                borderRadiusPic="12px"
                borderColor="transparent"
              />
              <span className="text-color2 text-base font-yekanbold mr-2 text-color2">
                {description || ' ... '}
              </span>
            </div>
          </td>
          <td>
            <div className={bodyClass}>{type}</div>
          </td>
          <td>
            <div className={`${bodyClass}`} style={{ maxWidth: 480 }}>
              {samples}
            </div>
          </td>
          <td>
            <div className={bodyClass}>{price_per_kilo || 0} تومان</div>
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

export default TariffsTable
