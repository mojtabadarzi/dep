import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Map, TileLayer, withLeaflet } from 'react-leaflet'
import Leaflet from 'leaflet'
import { ReactLeafletSearch } from 'react-leaflet-search'
import axios from 'axios'

//redux
import { useSelectorUserInfo } from '../selectors/selectors'
// import { useDispatch } from 'react-redux'

//components
import InnerContent from 'src/container/InnerContent'
import KioskFloatBox from 'src/components/KioskFloatBox'
import MarkerMap from 'src/components/MarkerMap'
import Tabs from 'src/components/Tabs'
import MessageBox from '../components/MessageBox'

//icons
import {
  WarehouseGray,
  WarehouseBlue,
  DeliveryTruckGray,
  DeliveryTruckBlue,
  DeliveryCheckListGray,
  DeliveryCheckListBlue,
  Nopic,
} from 'src/utils/Icons'
import DriverFloatBox from 'src/components/DriverFloatBox'
import OrderFloatBox from 'src/components/OrderFloatBox'

//const
import { baseURL, ORDER_POINTS, ORDER_DETAIL, STATION_POINTS, STATION_DETAIL } from '../config'
import { handleError } from '../utils/helpers'
import { CITY_POINTS } from '../utils/constant'

const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch)

const data1 = [
  { id: 11, name: 'راننده', icon: DeliveryTruckBlue, inactiveIcon: DeliveryTruckGray },
  { id: 22, name: 'سفارش', icon: DeliveryCheckListBlue, inactiveIcon: DeliveryCheckListGray },
  { id: 33, name: 'کیوسک', icon: WarehouseBlue, inactiveIcon: WarehouseGray },
]

function LiveReport({ history, location }) {
  const token = useSelectorUserInfo().token
  const currentCity = useSelectorUserInfo()?.city || 'تهران'

  const header = {
    headers: { Authorization: `jwt ${token}` },
  }
  const [loading, setLoading] = useState(false)

  const [activeFloatKiosk, setActiveFloatKiosk] = React.useState(null)
  const [activeFloatDriver, setActiveFloatDriver] = React.useState(null)
  const [activeFloatOrder, setActiveFloatOrder] = React.useState(null)

  const [activeMarkerTabIndex, setActiveMarkerTabIndex] = React.useState(null)
  const [activeTabIndex, setActiveTabIndex] = React.useState(1)

  const [ordersPoints, setOrdersPoints] = useState([])
  const [ordersFloat, setOrdersFloat] = useState({})
  const [ordersFloatLoading, setOrdersFloatLoading] = useState([])

  const [kioskPoints, setKioskPoints] = useState([])
  const [kioskFloat, setKioskFloat] = useState({})
  const [kioskFloatLoading, setKioskFloatLoading] = useState([])

  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')

  useEffect(() => {
    if (location.pathname === '/live-report' && activeTabIndex === 0) {
      setActiveTabIndex(0)
      history.push('/live-report/driver')
    } else if (location.pathname === '/live-report/driver') {
      setActiveTabIndex(0)
    } else if (location.pathname === '/live-report/kiosk') {
      getKioskPoints(
        CITY_POINTS[currentCity].center[0] || 35.6892,
        CITY_POINTS[currentCity].center[1] || 51.389,
        CITY_POINTS[currentCity].radius || 30000
      )
      setActiveTabIndex(2)
    } else if (location.pathname === '/live-report/order') {
      getOrdersPoints(
        CITY_POINTS[currentCity].center[0] || 35.6892,
        CITY_POINTS[currentCity].center[1] || 51.389,
        CITY_POINTS[currentCity].radius || 30000
      )
      setActiveTabIndex(1)
    } else {
      history.push('/live-report/order')
      getOrdersPoints(
        CITY_POINTS[currentCity].center[0] || 35.6892,
        CITY_POINTS[currentCity].center[1] || 51.389,
        CITY_POINTS[currentCity].radius || 30000
      )
      setActiveTabIndex(1)
    }
  }, [activeTabIndex, location.pathname, history])

  //orders
  const getOrdersPoints = (latitude, longitude, radius) => {
    setLoading(true)
    setMessageClass('message-hidden')
    axios
      .get(
        `${baseURL}${ORDER_POINTS}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
        header
      )
      .then((response) => {
        console.log('RES : ', response)
        const { data } = response
        setOrdersPoints(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('error. ___ ', error.response)
        setLoading(false)
        if (error.response && error.response.status) {
          const { status } = error.response
          setMessage(handleError(status, ''))
          setMessageClass('message-show')
        } else if (error.response === undefined) {
          setMessage(handleError(undefined, ''))
          setMessageClass('message-show')
        } else {
          setMessage(handleError('', ''))
          setMessageClass('message-show')
        }
      })
  }
  const getOrdersPointsMap = (e) => {
    const latLng = e.target.getCenter()
    getOrdersPoints(
      CITY_POINTS[currentCity].center[0] || 35.6892,
      CITY_POINTS[currentCity].center[1] || 51.389,
      CITY_POINTS[currentCity].radius || 30000
    )
    setLoading(false)
  }
  const turnMapLoadingOn = () => {
    setLoading(true)
  }
  const getOrderFloatBoxData = (ID) => {
    setOrdersFloat({})
    setOrdersFloatLoading(true)
    setMessageClass('message-hidden')

    axios.get(`${baseURL}${ORDER_DETAIL}${ID}`, header).then((response) => {
      console.log('order Detail : ', response)
      const { data } = response
      const floatData = {
        id: ID,
        userFullName: data?.user?.fullname || ' ... ',
        userPhoneNumber: data?.user?.phone_number || 0,
        userAvatar: data?.user?.avatar || Nopic,
        userAddress: data?.address?.full_address || ' .... ',
        userOrderWastes: data?.userorderwastes || [],
        totalPrice: data?.total_price || 0,
        agentFullName: data?.agent_vehicle?.agent?.fullname || ' ... ',
        agentAvatar: data?.agent_vehicle?.agent?.avatar || Nopic,
        code: data?.code || 0,
        vehicleName:
          (data?.agent_vehicle?.vehicle?.brand || ' . . . ') +
          ' | ' +
          (data?.agent_vehicle?.vehicle?.color || ' . . . ') +
          ' | ' +
          (data?.agent_vehicle?.vehicle?.model || ' . . . '),
        vehiclePlate: data?.agent_vehicle?.vehicle?.plate_number || ' 0 ',
        createdTime: data?.created_time || 0,
        processTime: data?.created_time || 0,
        status: data?.status || 100,
      }
      console.log('XX :: ', floatData)
      setOrdersFloat(floatData)
      setOrdersFloatLoading(false)
    })
  }

  //kiosk
  const getKioskPoints = (latitude, longitude, radius) => {
    setLoading(true)
    setMessageClass('message-hidden')
    axios
      .get(
        `${baseURL}${STATION_POINTS}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
        header
      )
      .then((response) => {
        console.log('RES : ', response)
        const { data } = response
        setKioskPoints(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('error. ___ ', error.response)
        setLoading(false)
        if (error.response && error.response.status) {
          const { status } = error.response
          setMessage(handleError(status, ''))
          setMessageClass('message-show')
        } else if (error.response === undefined) {
          setMessage(handleError(undefined, ''))
          setMessageClass('message-show')
        } else {
          setMessage(handleError('', ''))
          setMessageClass('message-show')
        }
      })
  }
  const getKioskPointsMap = (e) => {
    const latLng = e.target.getCenter()
    getKioskPoints(
      CITY_POINTS[currentCity].center[0] || 35.6892,
      CITY_POINTS[currentCity].center[1] || 51.389,
      CITY_POINTS[currentCity].radius || 30000
    )
    setLoading(false)
  }
  const getKioskFloatBoxData = (ID) => {
    setKioskFloat({})
    setKioskFloatLoading(true)
    setMessageClass('message-hidden')

    axios
      .get(`${baseURL}${STATION_DETAIL}${ID}`, header)
      .then((response) => {
        const { data } = response
        const floatData = {
          district: data?.district || ' ... ',
          schedules: data?.schedules[0] || ' ... ',
          title: data?.title || ' ... ',
          image: data?.stationimages[0]?.image || Nopic,
        }
        setKioskFloat(floatData)
        setKioskFloatLoading(false)
      })
      .catch((error) => {
        setKioskFloatLoading(false)
        if (error.response && error.response.status) {
          const { status } = error.response
          setMessage(handleError(status, ''))
          setMessageClass('message-show')
        } else if (error.response === undefined) {
          setMessage(handleError(undefined, ''))
          setMessageClass('message-show')
        } else {
          setMessage(handleError('', ''))
          setMessageClass('message-show')
        }
        console.log('error. ___ ', error.response)
      })
  }
  const changeTab = (index) => {
    setActiveFloatOrder(null)
    setActiveFloatDriver(null)
    setActiveFloatKiosk(null)
    setActiveTabIndex(index)
    setActiveMarkerTabIndex(null)

    if (index === 0) {
      history.push('/live-report/driver')
    } else if (index === 1) {
      history.push('/live-report/order')
    } else {
      history.push('/live-report/kiosk')
    }
  }

  const changeMarkerTab = (index, setFunction, getFloatBoxData) => {
    getFloatBoxData(index)
    setActiveMarkerTabIndex(index)
    setFunction(index)
  }

  const closeFloatBox = () => {
    setActiveFloatOrder(null)
    setActiveFloatDriver(null)
    setActiveFloatKiosk(null)
    setActiveMarkerTabIndex(null)
  }

  const closeMessageClass = () => {
    setMessageClass('message-hidden')
  }

  return (
    <InnerContent p="p-0" w="w-full" h="h-full" position="relative">
      <div className="absolute flex justify-center w-full mt-4" style={{ zIndex: 501 }}>
        <div className="p-2 bg-white rounded-xlg">
          <Tabs data={data1} changeTab={changeTab} activeTabIndex={activeTabIndex} />
        </div>
      </div>

      {/* driver */}
      {activeTabIndex === 0 ? (
        <div className="w-full h-full">
          <Map center={[35.6892, 51.389]} zoom={14} zoomControl={false}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <ReactLeafletSearchComponent
              position="topleft"
              provider="OpenStreetMap"
              providerOptions={{ region: 'gb' }}
              inputPlaceholder="نام محله مورد نظر خود را جستجو کنید"
            />
            <MarkerMap
              position={positions}
              icon={DeliveryTruckGray}
              changeTab={(index) => changeMarkerTab(index, setActiveFloatDriver)}
              activeMarkerTabIndex={activeMarkerTabIndex}
            /> */}
          </Map>
          {activeFloatDriver !== null ? <DriverFloatBox closeFloat={closeFloatBox} /> : ''}
        </div>
      ) : (
        ''
      )}

      {/* order */}
      {activeTabIndex === 1 ? (
        <div className="w-full h-full relative">
          {loading ? (
            <div
              className="left-0 top-0 right-0 bottom-0 flex items-center justify-center absolute bg-whiteglass"
              style={{ zIndex: 401 }}
            >
              <div className="loading-three-dot"></div>
            </div>
          ) : (
            ''
          )}
          <Map
            center={CITY_POINTS[currentCity].center || [35.6892, 51.389]}
            zoom={10}
            minZoom={10}
            zoomControl={false}
            onzoomstart={turnMapLoadingOn}
            onzoomend={getOrdersPointsMap}
            ondrag={turnMapLoadingOn}
            ondragend={getOrdersPointsMap}
            onclick={(e) => console.log('click : ', e.latlng)}
            maxBoundsViscosity={1.0}
            maxBounds={Leaflet.latLngBounds(
              Leaflet.latLng(
                CITY_POINTS[currentCity].left[0] || 35.518623,
                CITY_POINTS[currentCity].left[1] || 51.069173
              ),
              Leaflet.latLng(
                CITY_POINTS[currentCity].right[0] || 35.851337,
                CITY_POINTS[currentCity].right[1] || 51.647374
              )
            )}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ReactLeafletSearchComponent
              position="topleft"
              provider="OpenStreetMap"
              providerOptions={{ region: 'gb' }}
              inputPlaceholder="نام محله مورد نظر خود را جستجو کنید"
            />
            <MarkerMap
              position={ordersPoints}
              icon={DeliveryCheckListGray}
              changeTab={(index) =>
                changeMarkerTab(index, setActiveFloatOrder, getOrderFloatBoxData)
              }
              activeMarkerTabIndex={activeMarkerTabIndex}
            />
          </Map>
          {activeFloatOrder !== null ? (
            <OrderFloatBox
              data={ordersFloat}
              loading={ordersFloatLoading}
              closeFloat={closeFloatBox}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}

      {/* kiosk */}
      {activeTabIndex === 2 ? (
        <div className="w-full h-full">
          {loading ? (
            <div
              className="left-0 top-0 right-0 bottom-0 flex items-center justify-center absolute bg-whiteglass"
              style={{ zIndex: 401 }}
            >
              <div className="loading-three-dot"></div>
            </div>
          ) : (
            ''
          )}
          <Map
            center={CITY_POINTS[currentCity].center || [35.6892, 51.389]}
            zoom={10}
            minZoom={10}
            zoomControl={false}
            onzoomstart={turnMapLoadingOn}
            onzoomend={getKioskPointsMap}
            ondrag={turnMapLoadingOn}
            ondragend={getKioskPointsMap}
            onclick={(e) => console.log('click : ', e.latlng)}
            maxBoundsViscosity={1.0}
            maxBounds={Leaflet.latLngBounds(
              Leaflet.latLng(
                CITY_POINTS[currentCity].left[0] || 35.518623,
                CITY_POINTS[currentCity].left[1] || 51.069173
              ),
              Leaflet.latLng(
                CITY_POINTS[currentCity].right[0] || 35.851337,
                CITY_POINTS[currentCity].right[1] || 51.647374
              )
            )}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ReactLeafletSearchComponent
              position="topleft"
              provider="OpenStreetMap"
              providerOptions={{ region: 'gb' }}
              inputPlaceholder="نام محله مورد نظر خود را جستجو کنید"
            />
            <MarkerMap
              icon={WarehouseGray}
              activeMarkerTabIndex={activeMarkerTabIndex}
              position={kioskPoints}
              changeTab={(index) =>
                changeMarkerTab(index, setActiveFloatKiosk, getKioskFloatBoxData)
              }
            />
          </Map>
          {activeFloatKiosk !== null ? (
            <KioskFloatBox
              closeFloat={closeFloatBox}
              data={kioskFloat}
              loading={kioskFloatLoading}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      <MessageBox
        messageClass={messageClass}
        message={message}
        closeMessageClass={closeMessageClass}
      />
    </InnerContent>
  )
}
export default LiveReport
