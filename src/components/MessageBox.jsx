import React from 'react'

//const
import { InformationRed, CheckBlue, DoneCheckGreen, CloseGray } from '../utils/Icons'

function MessageBox({
  messageClass,
  message,
  closeMessageClass,
  textColor = 'text-errortext',
  bg = 'bg-errorback',
  status = 'error',
}) {
  const whatStatusIcon = (status) => {
    switch (status) {
      case 'error':
        return InformationRed
      case 'success':
        return DoneCheckGreen
      case 'default':
        return CheckBlue
      default:
        return InformationRed
    }
  }
  const whatStatusTextColor = (status) => {
    switch (status) {
      case 'error':
        return 'text-errortext'
      case 'success':
        return 'text-successtext'
      case 'default':
        return 'text-defaulttext'
      default:
        return 'text-defaulttext'
    }
  }
  const whatStatusBg = (status) => {
    switch (status) {
      case 'error':
        return 'text-errorback'
      case 'success':
        return 'bg-successback'
      case 'default':
        return 'bg-defaultback'
      default:
        return 'bg-defaultback'
    }
  }
  return (
    <div
      className={`${messageClass} ${whatStatusBg(
        status
      )} flex items-center p-4  fixed  rounded-xlg min-h-5`}
    >
      <div className="flex items-center">
        <img src={whatStatusIcon(status)} alt="بستن" className="w-6" />
        <p className={`text-sm mr-2 font-medium ${whatStatusTextColor(status)}`}>{message}</p>
        <img
          onClick={closeMessageClass}
          src={CloseGray}
          alt="بستن"
          className="absolute top-0 left-0 ml-2 mt-2 w-4 cursor-pointer hover:opacity-50"
        />
      </div>
    </div>
  )
}
export default MessageBox
