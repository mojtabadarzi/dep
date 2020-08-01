import * as actionType from '../utils/actionTypes'

const initialState = {}

export const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.LOGIN:
      return {
        ...state,
        ...payload,
      }
    case actionType.CLEAR_USER:
      return {}
    default:
      return state
  }
}
