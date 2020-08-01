import React from 'react'
import Seprator from './Seprator'
import { DownloadGray, ArrowDownWhite } from '../utils/Icons'

const ExportPdf = () => {
  return (
    <div className="py-1 px-2 rounded-xlg flex bg-color2 justify-center items-center">
      <div className="flex justify-center items-center">
        <img className="w-8  ml-2" src={DownloadGray} alt="آیکن" />
        <span className="text-white text-xs">خروجی</span>
      </div>
      <Seprator margin="mx-2" height="h-6" bgColor="#f7f9fc" />
      <div className="flex justify-center items-center">
        <span className="text-white text-xs">PDF</span>
        <img className="w-2 mr-2 ml-4" src={ArrowDownWhite} alt="آیکن" />
      </div>
    </div>
  )
}

export default ExportPdf
