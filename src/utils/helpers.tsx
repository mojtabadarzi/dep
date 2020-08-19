import React from 'react'
import momentJalaali from 'jalali-moment'

import {
  CloseGray,
  DoneCheckCircleGreen,
  UserVacation,
  ReceivesGray,
  AlarmClockGray,
  CloseRed,
  LoadingWaitingOrange,
  DoubleCheck,
  CheckBlue,
  DoneCheckGreen,
} from 'src/utils/Icons'
import { ORDER_LIST_STATUS } from '../utils/constant'

export const getLocalStorage = (key: string) => localStorage.getItem(key)

export const setLocalStorage = (key: string, value: string) => localStorage.setItem(key, value)

export const DriverStatusToIcon = (status) => {
  switch (status) {
    case 'active':
      return DoneCheckCircleGreen
    case 'deactive':
      return CloseGray
    case 'leave':
      return UserVacation
    default:
      return DoneCheckCircleGreen
  }
}

export const OrderStatusToIcon = (status) => {
  switch (status) {
    case 5:
      return CheckBlue
    case 0:
      return ReceivesGray
    case 4:
      return CloseRed
    case 3:
      return LoadingWaitingOrange
    case 1 || 2:
      return AlarmClockGray
    case 6:
      return DoubleCheck
    default:
      return AlarmClockGray
  }
}

export const ArrayToSequenceImages = (arr = []) => {
  return arr.map((item, index) => {
    const { id, avatar } = item
    if (arr.length < 5) {
      return (
        <img
          key={id}
          className="w-6 h-6 border border-white bg-color1 text-xs"
          src={avatar}
          alt="همراه"
          style={{ position: 'relative', marginRight: -6, borderRadius: 8 }}
        />
      )
    } else {
      if (index < 3) {
        return (
          <img
            key={item}
            className="w-6 h-6 border border-white bg-color1 text-xs"
            src={avatar}
            alt="همراه"
            style={{ position: 'relative', marginRight: -6, borderRadius: 8 }}
          />
        )
      } else if (index === 3) {
        return (
          <div
            key={item}
            className="w-6 h-6 flex items-center justify-center relative border border-white"
            style={{
              marginRight: index === 3 ? -6 : 0,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <img className="w-6 h-6 absolute bg-color1 text-xs" src={avatar} alt="همراه" />
            <span
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            ></span>
            <span className="relative text-xs text-white">+{arr.length - 3}</span>
          </div>
        )
      }
    }
  })
}

export const handleError = (status, msg) => {
  if (status === 400 && msg === 'Unable to log in with provided credentials.') {
    return 'نام کاربری یا رمز عبور اشتباه است!'
  } else if (status === 400 && msg === 'User account is disabled.') {
    return 'نام کاربری یا رمز عبور اشتباه است!'
  } else if (status === 400 && msg === 'Your are not allowed to login.') {
    return 'نام کاربری یا رمز عبور اشتباه است!'
  } else if (status === 404) {
    return 'درخواست مورد نظر پیدا نشد'
  } else if (status === 500) {
    return 'سرور پاسخگو نیست ! دوباره تلاش کنید'
  } else if (status === undefined) {
    return 'اتصال به اینترنت را بررسی کنید'
  } else {
    return 'خطایی رخ داده است .!'
  }
}

export const timeStampToJalali = (time) => {
  if (!time) return '...'
  return momentJalaali(time).format('jYYYY/jM/jD - HH:mm')
}

export const statusConvertor1 = (fn1, fn2, fn3, status) => {
  switch (status) {
    case 0:
      fn1('#f7f9fc')
      fn2('#fff')
      fn3('#E9EDF4')
      break
    case 1:
      fn1('#536b88')
      fn3('#f5222d')
      fn2('#E9EDF4')
      break
    case 2:
      fn1('#536b88')
      fn3('#f5222d')
      fn2('#E9EDF4')
      break
    case 3:
      fn1('#fa8c16')
      fn3('#fa8c16')
      fn2('#fff7e6')
      break
    case 6:
      fn1('#00dbb5')
      fn3('#00dbb5')
      fn2('#F2FDFB')
      break
    case 5:
      fn1('#2db7f5')
      fn3('#2db7f5')
      fn2('#2db7f522')
      break
    case 4:
      fn1('#f5222d')
      fn3('#f5222d')
      fn2('#fff1f0')
      break
    case 7:
      fn1('#536b88')
      fn3('transparent')
      fn2('#f7f9fc')
      break
    default:
      fn1('#536b88')
      fn2('#fff')
      fn3('#536b88')
      break
  }
}

export const statusOrderConvertor = (fn1, fn2, fn3, status) => {
  switch (status) {
    case 0:
      fn1('#536b88')
      fn2('#fff')
      fn3(ORDER_LIST_STATUS[status])
      break
    case 1:
      fn1('#ff527a')
      fn2('#fff1f0')
      fn3(ORDER_LIST_STATUS[status])
      break
    case 2:
      fn1('#ff527a')
      fn2('#fff1f0')
      fn3(ORDER_LIST_STATUS[status])
      break
    case 3:
      fn1('#fa8c16')
      fn2('#fff7e6')
      fn3(ORDER_LIST_STATUS[status])
      break
    case 4:
      fn1('#536b88')
      fn2('#f7f9fc')
      fn3(ORDER_LIST_STATUS[status])
      break
    case 5:
      fn1('#2db7f5')
      fn2('#2db7f522')
      fn3(ORDER_LIST_STATUS[status])
      break
    case 6:
      fn1('#00dbb5')
      fn2('#F2FDFB')
      fn3(ORDER_LIST_STATUS[status])
      break
    default:
      fn1('#536b88')
      fn2('#fff')
      fn3(ORDER_LIST_STATUS[status])
      break
  }
}

export const statusOrderConvertorIcon = (status) => {
  switch (status) {
    case 0:
      return ReceivesGray
    case 1:
      return CloseRed
    case 2:
      return CloseRed
    case 3:
      return LoadingWaitingOrange
    case 4:
      return AlarmClockGray
    case 5:
      return CheckBlue
    case 6:
      return DoubleCheck
    default:
      return AlarmClockGray
  }
}

export const agentStatusConvertor = (fn1, fn2, fn3, status) => {
  switch (status) {
    case 5:
      fn1('#ff4a5f80')
      fn2('#fff1f0')
      fn3('غیرفعال')
      break
    case 15:
      fn1('#64DCB6')
      fn2('#64dcb626')
      fn3('فعال')
      break
    case 20:
      fn1('#fa8c16')
      fn2('#fff7e6')
      fn3('مرخصی')
      break
    default:
      fn1('#536b88')
      fn2('#f7f9fc')
      fn3('نامشخص')
      break
  }
}

export const agentStatusConvertorIcon = (status) => {
  switch (status) {
    case 5:
      return CloseRed
    case 15:
      return CheckBlue
    case 20:
      return UserVacation
    default:
      return AlarmClockGray
  }
}

export const userStatusConvertor = (fn1, fn2, fn3, status) => {
  switch (status) {
    case 5:
      fn1('#ff4a5f80')
      fn2('#fff1f0')
      fn3('رد شده')
      break
    case 10:
      fn1('#1890ff')
      fn2('#e6f7ff')
      fn3('ساخته شده')
      break
    case 15:
      fn1('#64DCB6')
      fn2('#64dcb626')
      fn3('فعال')
      break
    case 20:
      fn1('#536b88')
      fn2('#f7f9fc')
      fn3('معلق')
      break
    default:
      fn1('#536b88')
      fn2('#f7f9fc')
      fn3('نامشخص')
      break
  }
}

export const userStatusConvertorIcon = (status) => {
  switch (status) {
    case 5:
      return CloseRed
    case 10:
      return CheckBlue
    case 15:
      return DoneCheckGreen
    case 20:
      return AlarmClockGray
    default:
      return AlarmClockGray
  }
}

export const kioskStatusConvertor = (fn1, fn2, fn3, status) => {
  switch (status) {
    case true:
      fn1('#64DCB6')
      fn2('#64dcb626')
      fn3('فعال')
      break
    case false:
      fn1('#ff4a5f80')
      fn2('#fff1f0')
      fn3('غیرفعال')
      break
    default:
      fn1('#536b88')
      fn2('#f7f9fc')
      fn3('نامشخص')
      break
  }
}
export const kioskStatusConvertorIcon = (status) => {
  switch (status) {
    case true:
      return DoneCheckGreen
    case false:
      return CloseRed
    default:
      return AlarmClockGray
  }
}

export const clockFormat = (time) => {
  return time.substr(0, 2) + ':' + time.substr(2, 2) + ':' + time.substr(4, 2)
}

export const regularPhoneNumber = (number) => {
  if (number) return 0 + number.toString().substring(2)
}
