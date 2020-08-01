import { useSelector, shallowEqual } from 'react-redux'

const useSelectorUserInfo = () => useSelector((state) => state.user, shallowEqual)

export { useSelectorUserInfo }
