import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

//redux
import { useSelectorUserInfo } from '../selectors/selectors'

//components
import DriverInfoTable from 'src/components/DriverInfoTable'
import Notification from '../components/Notification'
import FilterSelectOption from '../components/FilterSelectOption'
import Button from 'src/components/Button'
import InnerContent from 'src/container/InnerContent'
import ExportPdf from 'src/components/ExportPdf'
import MessageBox from '../components/MessageBox'

//const
import { UserSearch, SearchWhite, PlusWhite, Nopic } from '../utils/Icons'
import { SORTING } from '../utils/constant'
import { baseURL, ALL_AGENT } from '../config'
import { handleError } from '../utils/helpers'

const selectorData = ['inc', 'dec']

function Drivers({ history }) {
  const token = useSelectorUserInfo().token
  const header = {
    headers: { Authorization: `jwt ${token}` },
  }
  const [delayTimer, setDelayTimer] = useState(null)

  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')

  const [state, setState] = useState({ showMenu: false, showValue: '' })
  const selectorNode = useRef(null)

  const [driverList, setDriverList] = useState([])
  const [driverListLoading, setDriverListLoading] = useState(true)
  const [nextPage, setNextPage] = useState(null)

  const scrollBoxRef = useRef(null)

  useEffect(() => {
    if (token) {
      const url = `${baseURL}${ALL_AGENT}`
      getDriverList(url)
    }
  }, [])

  useEffect(() => {
    if (scrollBoxRef && scrollBoxRef.current) {
      scrollBoxRef.current.onscroll = infiniteScroll
    }
  })
  useEffect(() => {
    return clearTimeout(delayTimer)
  }, [])

  const infiniteScroll = () => {
    const scrollBoxID = document.getElementById('scrollBoxID')
    const scrollChildID = document.getElementById('scrollChildID')

    if (
      scrollBoxID.getBoundingClientRect().bottom > scrollChildID.getBoundingClientRect().bottom &&
      nextPage !== null &&
      !driverListLoading
    ) {
      getDriverList(nextPage)
    }
  }

  const getDriverList = (url) => {
    setDriverListLoading(true)
    setMessageClass('message-hidden')
    axios
      .get(url, header)
      .then((response) => {
        const { results, next } = response?.data
        setNextPage(next || null)
        const data = []
        for (let i = 0; i < results.length; i++) {
          data[i] = {
            id: results[i]?.agent?.id || 0,
            editId: results[i]?.id,
            avatar: results[i]?.agent?.avatar || Nopic,
            fullname: results[i]?.agent?.fullname || ' ... ',
            phone: results[i]?.agent?.phone_number || 0,
            plate: results[i]?.plate_number || ' ... ',
            vehicle: (results[i]?.brand || ' ... ') + ' - ' + (results[i]?.model || ' ... '),
            workers: results[i]?.vehicleworkers || [],
            company: ' ... ',
            status: results[i]?.status || 100,
            location: ' ... ',
          }
        }
        console.log(results)
        setDriverList((prevState) => prevState.concat(data))
        setDriverListLoading(false)
      })
      .catch((error) => {
        console.log('error.response ___ ', error.response)
        setDriverListLoading(false)
        if (error.response && error.response.status) {
          const { status, msg = '' } = error.response
          setMessage(handleError(status, msg))
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
  const searchHandle = (e) => {
    setNextPage(null)
    setDriverList([])
    const value = e.target.value
    clearTimeout(delayTimer)
    setDelayTimer(
      setTimeout(function () {
        if (token) {
          const url = `${baseURL}${ALL_AGENT}?search=${value}`
          getDriverList(url)
        }
      }, 300)
    )
  }

  const addListener = (menu) => {
    if (!menu) {
      document.addEventListener('click', handleOutsideClick, false)
    } else {
      document.removeEventListener('click', handleOutsideClick, false)
    }
  }
  const openSelector = () => {
    addListener(state.showMenu)
    setState((state) => ({ ...state, showMenu: !state.showMenu }))
  }
  const handleSelect = (value) => {
    setState((state) => ({ ...state, showMenu: !state.showMenu, showValue: SORTING[value] }))
  }
  const handleOutsideClick = (e) => {
    if (selectorNode && selectorNode.current && !selectorNode.current.contains(e.target)) {
      setState((state) => ({ ...state, showMenu: false }))
    }
  }
  const closeMessageClass = () => {
    setMessageClass('message-hidden')
  }

  return (
    <InnerContent p="p-0" overFlow=" ">
      <div className="h-full overflow-y-scroll p-5" ref={scrollBoxRef} id="scrollBoxID">
        <div className="flex felx-row items-center">
          <div
            className="bg-color3 w-1/2 p-1 rounded-xl flex flex-row justify-between items-center"
            style={{ borderRadius: 16 }}
          >
            <img className="h-6 mr-2" src={UserSearch} alt="آیکن" />
            <input
              placeholder="جستجو در راننده ها"
              className="px-2 w-full align-right"
              onChange={searchHandle}
            />
            <Notification pic={SearchWhite} backgroundColor="#1641ff" />
          </div>
          <div className="mr-2 w-1/2 p-1 rounded-xl flex flex-row justify-between items-center">
            <div className="w-1/3 flex flex-row jsutify-center">
              <FilterSelectOption
                handleMenu={openSelector}
                showMenu={state.showMenu}
                selectRow={handleSelect}
                showValue={state.showValue}
                data={selectorData}
                node={selectorNode}
              />
            </div>
            <div className="flex justify-between">
              <Button
                icon={PlusWhite}
                title="راننده جدید"
                status="primary"
                color="text-white"
                backgroundColor="#1641ff"
                margin="ml-2"
                click={() => history.push('/drivers/add-driver')}
              />
              <ExportPdf />
            </div>
          </div>
        </div>
        <div className="mt-8 mb-32" id="scrollChildID">
          <DriverInfoTable
            data={driverList}
            loading={driverListLoading}
            goToEditPage={(editId) => history.push(`/drivers/edit/${editId}`)}
          />
        </div>
        <MessageBox
          messageClass={messageClass}
          message={message}
          closeMessageClass={closeMessageClass}
        />
      </div>
    </InnerContent>
  )
}
export default Drivers
