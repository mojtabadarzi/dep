import React from 'react'
//components
import PageTitle from '../components/PageTitle'
import NoItem from 'src/components/NoItem'
//const
import { ArrowDownDark } from 'src/utils/Icons'

function SimpleCollapseWrapper(props) {
  const [showChildren, setShowChildren] = React.useState(true)
  const { wrpperTitle, wrpperSubtitle = false, position = '', loading, data = true } = props

  return (
    <div className={`p-4 mb-4 bg-white rounded-lg ${position}`}>
      <div
        className={`flex flex-row justify-between ${
          showChildren ? 'border-b pb-2 mb-4 border-gray-100' : ''
        }`}
      >
        <div className="inline-flex items-center">
          <div className="flex flex-col justify-center">
            <PageTitle classname="text-base ml-2" title={wrpperTitle} />
            <PageTitle
              classname="text-xs mt-3 font-yekanlight text-color2"
              title={wrpperSubtitle}
            />
          </div>
        </div>

        <div
          className="p-2 cursor-pointer w-12 h-12 flex items-center justify-center border rounded-lg border-gray-400"
          style={{ borderRadius: 16 }}
          onClick={() => setShowChildren((prev) => !prev)}
        >
          <img className="w-2" src={ArrowDownDark} alt="آیکن" />
        </div>
      </div>
      <div className="relative min-h-5">
        {loading ? (
          <div className="big-loading-parent">
            <div className="loading-three-dot"></div>
          </div>
        ) : (
          ''
        )}
        {!loading && data ? <div>{showChildren ? props.children : ''} </div> : <NoItem />}
      </div>
    </div>
  )
}
export default SimpleCollapseWrapper
