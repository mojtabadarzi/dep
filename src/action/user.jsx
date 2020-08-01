import * as actionType from '../utils/actionTypes'

export const LoginAction = (payload) => {
  return {
    type: actionType.LOGIN,
    payload,
  }
}

export const clearUserAction = () => {
  return {
    type: actionType.CLEAR_USER,
  }
}
