import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
//redux
import { useDispatch } from 'react-redux'
import { clearUserAction } from '../action/user'
import { useSelectorUserInfo } from '../selectors/selectors'
//components
import Button from './Button'
import Avatar from './Avatar'
import SideItem from './SideItem'
//const
import {
  LiveReportWhite,
  LiveReportBlue,
  ChartCircleBlue,
  ChartCircleWhite,
  ReportBlue,
  ReportWhite,
  DeliveryCheckListLightBlue,
  DeliveryCheckListBlue,
  CreditCardSmallBlue,
  CreditCardWhite,
  GroupUserBlue,
  GroupUserWhite,
  WarehouseBlue,
  WarehouseWhite,
  DeliveryTruckBlue,
  DeliveryTruckWhite,
  CouponBlue,
  CouponWhite,
  PenEditWhite,
  List,
  SidebarDashed,
  LogoutWhite,
  CloseWhite,
  Nopic,
} from '../utils/Icons'
import { ROLES_NUMBER_TO_PERSIAN } from '../utils/constant'
import star from 'src/assets/images/icons/rates.svg'
import activestar from 'src/assets/images/icons/activestar.svg'
import { getLocalStorage, setLocalStorage } from 'src/utils/helpers'

function Sidebar({ history }) {
  const [open, setOpen] = React.useState(false)
  const [profileModal, setProfileModal] = React.useState(false)
  const dispatch = useDispatch()
  const user_detail = useSelectorUserInfo()?.user_detail
  const role = useSelectorUserInfo()?.role

  useEffect(() => {
    if (getLocalStorage('usersOpen') === 'false') {
      setOpen(false)
    } else if (getLocalStorage('usersOpen') === 'true') {
      setOpen(true)
    }
  }, [])
  const openUsers = async () => {
    if (open) {
      setOpen(false)
      setLocalStorage('usersOpen', 'false')
    } else {
      setOpen(true)
      setLocalStorage('usersOpen', 'true')
    }
  }
  const closeUsers = () => {
    setOpen(false)
    setLocalStorage('usersOpen', 'false')
  }
  const editProfileModalHandler = () => {
    setProfileModal((prev) => !prev)
  }
  const exit = () => {
    dispatch(clearUserAction())
    history.replace('/login')
  }
  return (
    <div className="sidebar flex flex-col justify-between">
      <div>
        <div className="w-full h-12 pr-8 flex flex-row justify-start items-center">
          <img className="w-5 ml-4" src={List} alt="فهرست" />
          <span className="text-white text-lg font-yekanlight">فهرست</span>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-col items-center">
            <Avatar
              pic={user_detail?.avatar || Nopic}
              width="64px"
              height="64px"
              padding="2px"
              borderRadiusParent="16px"
              borderRadiusPic="16px"
              borderColor="#f7f9fc"
            />
            <div className="flex flex-row mt-2">
              <span className="text-white text-lg ml-4 font-black font-yekanbold">
                {user_detail?.fullname || ' ... '}
              </span>
              <img
                className="w-4 cursor-pointer"
                src={PenEditWhite}
                alt="نام "
                onClick={editProfileModalHandler}
              />
            </div>
            <span className="text-white text-xs mt-1 font-yekanlight">
              {ROLES_NUMBER_TO_PERSIAN[role]}
            </span>
          </div>
        </div>
        <div className="mt-2 pr-8">
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={LiveReportBlue}
            icon={LiveReportWhite}
            routName="/live-report"
            title="گزارش زنده"
            click={closeUsers}
          />
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={ChartCircleBlue}
            icon={ChartCircleWhite}
            routName="/charts"
            title="نمودارها"
            click={closeUsers}
          />
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={ReportBlue}
            icon={ReportWhite}
            routName="/reports"
            title="گزارش ها"
            click={closeUsers}
          />
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={DeliveryCheckListBlue}
            icon={DeliveryCheckListLightBlue}
            routName="/orders"
            title="سفارش ها"
            click={closeUsers}
          />
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={CreditCardSmallBlue}
            icon={CreditCardWhite}
            routName="/payments"
            title="پرداختی ها"
            click={closeUsers}
          />
          <SideItem
            activeIcon={GroupUserBlue}
            icon={GroupUserWhite}
            routName=""
            title="کاربران"
            click={openUsers}
            showArrow={true}
            arrowUp={open}
          />
          {open ? (
            <div className="relative pr-8">
              <img className="line-sidebar" src={SidebarDashed} alt="خط تیره" />
              <SideItem
                activeClassName="navLinkActive"
                showIcon={false}
                routName="/drivers"
                title="راننده ها"
              />
              <SideItem
                activeClassName="navLinkActive"
                showIcon={false}
                routName="/mobile-users"
                title="کاربران موبایل"
              />
            </div>
          ) : (
            ''
          )}
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={WarehouseBlue}
            icon={WarehouseWhite}
            routName="/kiosks"
            title="کیوسک ها"
            click={closeUsers}
          />
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={DeliveryTruckBlue}
            icon={DeliveryTruckWhite}
            routName="/cars"
            title="خودرو ها"
            click={closeUsers}
          />
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={CouponBlue}
            icon={CouponWhite}
            routName="/tariffs"
            title="تعرفه ها"
            click={closeUsers}
          />
          <SideItem
            activeClassName="navLinkActive"
            activeIcon={activestar}
            icon={star}
            routName="/Points"
            title="امتیازات"
            click={closeUsers}
          />
          <Button
            title="خروج"
            border="hover:bg-error"
            padding="py-1 px-2 pl-8"
            margin="m-0"
            color="text-white"
            icon={LogoutWhite}
            iconWidth="w-4"
            iconMargin="ml-4"
            click={exit}
          />
        </div>
      </div>
      <div className="trial-version">نسخه آزمایشی</div>
      {profileModal ? (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 bg-blackglass flex flex-col items-center justify-center"
          onClick={editProfileModalHandler}
        >
          <img
            className="w-10 rounded-xs cursor-pointer mb-8 mr-4 hover:opacity-75 "
            src={CloseWhite}
            alt="بستن"
          />
          <div className="h-64 w-1/2 bg-white rounded-lg flex items-center justify-center">
            بزودی قابلیت ویرایش پروفایل افزوده خواهد شد
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default withRouter(Sidebar)
