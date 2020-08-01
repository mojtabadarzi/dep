import React from 'react'
import PageTitle from '../components/PageTitle'
import { ArrowDownLightBlue } from 'src/utils/Icons'

function Wrapper(props) {
  const [showChildren, setShowChildren] = React.useState(true)
  const { wrpperTitle, wrpperSubtitle = false } = props

  return (
    <div className="p-4 mb-4 bg-white rounded-lg">
      <div className="flex flex-row justify-between border-b pb-2 mb-4 border-gray-100">
        <div className="inline-flex items-center">
          <div className="flex flex-col justify-center">
            <PageTitle classname="text-base ml-2" title={wrpperTitle} />
            <PageTitle
              classname="text-xs mt-1 mb-2 font-yekanlight text-color4"
              title={wrpperSubtitle}
            />
          </div>
        </div>
        <div
          className="p-2 cursor-pointer flex items-center justify-center border rounded-lg border-gray-400"
          style={{ borderRadius: 16 }}
          onClick={() => setShowChildren((prev) => !prev)}
        >
          <img className="w-8" src={ArrowDownLightBlue} alt="آیکن" />
        </div>
      </div>
      <div>{showChildren ? props.children : ''}</div>
    </div>
  )
}
export default Wrapper
