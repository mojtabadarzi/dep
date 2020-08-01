import React from 'react'
import PageTitle from '../components/PageTitle'
import { ArrowDownDark } from 'src/utils/Icons'
import NoItem from 'src/components/NoItem'

function WorkerInfoWrapper(props) {
  const [showChildren, setShowChildren] = React.useState(true)
  const { wrpperTitle, wrpperSubtitle = false, data = [], loading } = props

  return (
    <div className="p-4 mb-4 bg-white rounded-lg">
      <div
        className={`flex flex-row items-center justify-between ${
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

        {!showChildren ? (
          <>
            <div className="flex flex-col w-3/5 border-r border-color1 pr-10">
              {data.map((worker, i) => {
                return (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex p-3 pt-4  w-4 h-4 rounded-md items-center justify-center text-xs bg-color1 text-color4 border border-color4">
                      {i + 1}
                    </div>
                    <div className="flex">
                      <span className="text-xs m-2 text-color4 font-yekanlight">
                        نام ونام خانوادگی
                      </span>
                      <span className="text-xs m-2 text-color2 font-yekanbold ">
                        محمدرضا فرحزاد
                      </span>
                    </div>
                    <div>
                      <span className="text-xs m-2 text-color4 font-yekanlight">نام پدر</span>
                      <span className="text-xs m-2 text-color2 font-yekanbold ">
                        {worker?.father_name || '...'}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-xs m-2 text-color4 font-yekanlight">
                        {worker?.birth_cerificate_number || '...'}
                      </span>
                      <span className="text-xs m-2 text-color2 font-yekanbold ">
                        شماره شناسنامه
                      </span>
                    </div>
                    <div>
                      <span className="text-xs m-2 text-color4 font-yekanlight">کد ملی</span>
                      <span className="text-xs m-2 text-color2 font-yekanbold ">
                        {worker?.national_code || '...'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          ''
        )}
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
        {!loading && data.length > 0 ? <div>{showChildren ? props.children : ''}</div> : <NoItem />}
      </div>
    </div>
  )
}
export default WorkerInfoWrapper
