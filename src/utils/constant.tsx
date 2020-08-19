const SORTING = {
  inc: 'صعودی',
  dec: 'نزولی',
}

const ORDER_LIST_STATUS = {
  0: 'ثبت اولیه',
  1: 'کنسل شده (راننده)',
  2: 'کنسل شده (کاربر)',
  3: 'درحال پردازش',
  4: 'متوقف شده',
  5: 'انجام شده',
  6: 'تحویل داده شده',
}

const ORDER_LIST_STATUS_CONVERT = {
  processed: 'success',
  canceled: 'error',
  processing: 'warning',
  waitForPrecess: 'default',
  initialSubmited: 'initial',
}
const DRIVERS_STATUS = {
  active: 'فعال',
  deactive: 'غیرفعال',
  leave: 'مرخصی',
}
const DRIVERS_STATUS_CONVERT = {
  active: 'success',
  leave: 'warning',
  deactive: 'default',
}

const ADDRESS_TYPE = {
  1: 'خانه',
  2: 'مدرسه',
  3: 'رستوران',
}

const NAME_OF_MONTH_TO_NUMBER = {
  FARVARDIN: 1,
  ORDIBEHESH: 2,
  KHORDAD: 3,
  TIR: 4,
  MORDAD: 5,
  SHAHRIVAR: 6,
  MEHR: 7,
  ABAN: 8,
  AZAR: 9,
  DEY: 10,
  BAHMAN: 11,
  ESFAND: 12,
}

const NAME_OF_MONTH_TO_PERSIAN = {
  FARVARDIN: 'فروردین',
  ORDIBEHESH: 'اردیبهشت',
  KHORDAD: 'خرداد',
  TIR: 'تیر',
  MORDAD: 'مرداد',
  SHAHRIVAR: 'شهریور',
  MEHR: 'مهر',
  ABAN: 'آبان',
  AZAR: 'آذر',
  DEY: 'دی',
  BAHMAN: 'بهمن',
  ESFAND: 'اسفند',
}
const NAME_OF_MONTH_NUMBER_TO_PERSIAN = {
  1: 'فروردین',
  2: 'اردیبهشت',
  3: 'خرداد',
  4: 'تیر',
  5: 'مرداد',
  6: 'شهریور',
  7: 'مهر',
  8: 'آبان',
  9: 'آذر',
  10: 'دی',
  11: 'بهمن',
  12: 'اسفند',
}

const DAYS_OF_WEEK_TO_PERSIAN = {
  SAT: 'شنبه',
  SUN: 'یکشنبه',
  MON: 'دوشنبه',
  TUS: 'سه شنبه',
  WED: 'چهارشنبه',
  THR: 'پنج شنبه',
  FRI: 'جمعه',
}
const DAYS_OF_WEEK_NUMBER_TO_PERSIAN = {
  1: 'شنبه',
  2: 'یکشنبه',
  3: 'دوشنبه',
  4: 'سه شنبه',
  5: 'چهارشنبه',
  6: 'پنج شنبه',
  7: 'جمعه',
}
const DAYS_OF_WEEK_TO_NUMBER = {
  SAT: 1,
  SUN: 2,
  MON: 3,
  TUS: 4,
  WED: 5,
  THR: 6,
  FRI: 7,
}

const ROLES = {
  USER: 1,
  AGENT: 4,
  STATION: 8,
  OPERATOR: 10,
  MONITOR: 14,
  ADMIN: 20,
}
const ROLES_NUMBER_TO_PERSIAN = {
  1: 'کاربر',
  4: 'راننده',
  8: 'ایستگاه',
  10: 'اپراتور',
  14: 'مانیتور',
  20: 'مدیر',
}
const OWNERSHIP = {
  0: 'انتخاب نشده',
  1: 'شرکت',
  2: 'استیجاری',
}
const CITY_POINTS = {
  تهران: {
    left: [35.518623, 51.069173],
    right: [35.851337, 51.647374],
    center: [35.6892, 51.389],
    radius: 30000,
  },
  رشت: {
    left: [36.627942, 48.421442],
    right: [38.430784, 50.640792],
    center: [37.2682, 49.5891],
    radius: 10000,
  },
}

export {
  SORTING,
  ORDER_LIST_STATUS,
  ORDER_LIST_STATUS_CONVERT,
  DRIVERS_STATUS,
  DRIVERS_STATUS_CONVERT,
  ADDRESS_TYPE,
  DAYS_OF_WEEK_TO_NUMBER,
  DAYS_OF_WEEK_TO_PERSIAN,
  DAYS_OF_WEEK_NUMBER_TO_PERSIAN,
  NAME_OF_MONTH_TO_PERSIAN,
  NAME_OF_MONTH_NUMBER_TO_PERSIAN,
  NAME_OF_MONTH_TO_NUMBER,
  ROLES,
  ROLES_NUMBER_TO_PERSIAN,
  OWNERSHIP,
  CITY_POINTS,
}
