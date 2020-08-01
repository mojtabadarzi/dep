// export const mockMode = Boolean(process.env.REACT_APP_MOCK_MODE) || false
export const mockMode = undefined
// export const mockMode = true
export const baseURL = 'https://api.dobaare.com/'
export const LOGIN = 'auth/panel/login/'
export const ORDER_LIST = 'order/panel/list/'
export const ALL_AGENT = 'auth/panel/all-agent/'
export const ORDER_DETAIL = 'order/panel/order-detail/'
export const ORDER_POINTS = 'order/panel/order-points/'
export const STATION_POINTS = 'station/panel/station-points/'
export const STATION_DETAIL = 'station/panel/station-detail/'
export const USER_DETAIL = 'auth/panel/user-detail/'
export const AGENT_CREATION = 'auth/panel/agent-creation/'
export const UPDATE_RETRIEVE_AGENT = 'auth/panel/update-retrieve-agent/'
export const KIOSKS_LIST = 'station/panel/list/'
export const MOBILE_USERS = 'auth/panel/user-list/'
export const TARIFFS = 'waste/panel/list/'
export const PAYED_ORDER = 'order/panel/payed-order-list/'
export const VEHICLE_LIST = 'vehicle/panel/list/'

// https://api.dobaare.com/order/panel/order-points/?latitude=37.270063&longitude=49.584167&radius=50
export const timeout: number = Number(process.env.REACT_APP_TIME_OUT) | 30000
