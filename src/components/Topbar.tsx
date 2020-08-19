import React from 'react'
import { withRouter } from 'react-router-dom'
//redux
import { useSelectorUserInfo } from '../selectors/selectors'
//components
import Notification from './Notification'
import Avatar from './Avatar'
//const
import dobare from '../assets/images/icons/dobare.svg'
import { BellGray, Nopic } from '../utils/Icons'

function Topbar(props) {
  const user_detail = useSelectorUserInfo()?.user_detail

  const { history } = props
  return (
    <div className="topbar h-20 w-full bg-white pr-8 pl-8 flex flex-row justify-between items-center ">
      <div className="flex flex-row items-center">
        <img className="w-10 ml-2  " src={dobare} alt="دوباره" />
        <div className="flex flex-col">
          <span className="text-lg">دوبــــاره</span>
          <span className="text-xs text-gray-500">پنل اپراتور سرویس</span>
        </div>
      </div>
      <div className="flex flex-row items-center h-full">
        <div className="ml-4 border-l h-full flex items-center">
          <Notification
            pic={BellGray}
            notif={true}
            marginLeft="1rem"
            backgroundColor="#E9EDF4"
            click={() => history.push(`/notification`)}
          />
        </div>
        <Avatar
          pic={user_detail?.avatar || Nopic}
          online={true}
          width="52px"
          height="52px"
          padding="1px"
          borderRadiusParent="16px"
          borderRadiusPic="16px"
          borderColor="#92a4bb"
        />
      </div>
    </div>
  )
}
export default withRouter(Topbar)
