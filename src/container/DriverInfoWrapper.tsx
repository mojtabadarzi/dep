import React from 'react'
//components
import PageTitle from '../components/PageTitle'
//const
import { ArrowDownDark } from 'src/utils/Icons'

function DriverInfoWrapper(props) {
  const [showChildren, setShowChildren] = React.useState(true)
  const {
    wrpperTitle,
    wrpperSubtitle = false,
    fullname = '',
    fathername = '',
    birtcertificatenumber = '',
    nationalcode = '',
    birthplace = '',
    licensenumber = '',
    loading,
  } = props

  return (
    <div className="p-4 mb-4 bg-white rounded-lg">
      <div
        className={`flex flex-row justify-between  ${
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
            <div className="flex w-3/5 justify-between border-r border-color1 pr-10">
              <div className="w-1/3 flex flex-col justify-center">
                <div className="flex">
                  <span className="text-xs m-2 text-color4 font-yekanlight">نام ونام خانوادگی</span>
                  <span className="text-xs m-2 text-color2 font-yekanbold ">{fullname}</span>
                </div>
                <div>
                  <span className="text-xs m-2 text-color4 font-yekanlight">نام پدر</span>
                  <span className="text-xs m-2 text-color2 font-yekanbold ">{fathername}</span>
                </div>
              </div>
              <div className="w-1/3 flex flex-col justify-center">
                <div className="flex">
                  <span className="text-xs m-2 text-color4 font-yekanlight">شماره شناسنامه</span>
                  <span className="text-xs m-2 text-color2 font-yekanbold ">
                    {birtcertificatenumber}
                  </span>
                </div>
                <div>
                  <span className="text-xs m-2 text-color4 font-yekanlight">کد ملی</span>
                  <span className="text-xs m-2 text-color2 font-yekanbold ">{nationalcode}</span>
                </div>
              </div>
              <div className="w-1/3 flex flex-col justify-center">
                <div className="flex">
                  <span className="text-xs m-2 text-color4 font-yekanlight">محل تولد</span>
                  <span className="text-xs m-2 text-color2 font-yekanbold ">{birthplace}</span>
                </div>
                <div>
                  <span className="text-xs m-2 text-color4 font-yekanlight">شماره گواهینامه</span>
                  <span className="text-xs m-2 text-color2 font-yekanbold">{licensenumber}</span>
                </div>
              </div>
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
          <div>{showChildren ? props.children : ''}</div>
        )}
      </div>
    </div>
  )
}
export default DriverInfoWrapper
