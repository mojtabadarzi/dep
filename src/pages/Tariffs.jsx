import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

//components
import InnerContent from 'src/container/InnerContent'
import ExportPdf from 'src/components/ExportPdf'
import TariffsTable from 'src/components/TariffsTable'
import FilterSelectOption from '../components/FilterSelectOption'
import Notification from '../components/Notification'
import MessageBox from '../components/MessageBox'

//redux
import { useSelectorUserInfo } from '../selectors/selectors'
// import { useDispatch } from 'react-redux'

//const
import { UserSearch, SearchWhite } from '../utils/Icons'
import { SORTING } from '../utils/constant'
import { baseURL, TARIFFS } from '../config'
import { handleError } from '../utils/helpers'

const selectorData = ['inc', 'dec']

function Tariffs() {
  // const [loading, setLoading] = useState(true)
  const token = useSelectorUserInfo().token
  const header = {
    headers: { Authorization: `jwt ${token}` },
  }
  // const dispatch = useDispatch()
  const [delayTimer, setDelayTimer] = useState(null)

  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')

  const [showMenu, setShowMenu] = useState(false)
  const [showValue, setShowValue] = useState('')
  const selectorNode = React.useRef(null)

  const [tariffs, setTariffs] = useState([])
  const [tariffsLoading, setTariffsLoading] = useState(true)
  // const [nextPage, setNextPage] = useState(null)

  const scrollBoxRef = useRef(null)

  useEffect(() => {
    if (token) {
      const url = `${baseURL}${TARIFFS}`
      getOrderList(url)
    }
  }, [])

  // useEffect(() => {
  //   if (scrollBoxRef && scrollBoxRef.current) {
  //     scrollBoxRef.current.onscroll = infiniteScroll
  //   }
  // })

  useEffect(() => {
    return clearTimeout(delayTimer)
  }, [])

  // const infiniteScroll = () => {
  //   const scrollBoxID = document.getElementById('scrollBoxID').getBoundingClientRect().bottom
  //   const scrollChildID = document.getElementById('scrollChildID').getBoundingClientRect().bottom

  //   if (scrollBoxID > scrollChildID && nextPage !== null && !tariffsLoading) {
  //     getOrderList(nextPage)
  //   }
  // }

  const getOrderList = (url) => {
    setTariffsLoading(true)
    setMessageClass('message-hidden')
    axios
      .get(url, header)
      .then((response) => {
        console.log(response)
        setTariffsLoading(false)
        const { data, next } = response
        // setNextPage(next || '')
        setTariffs((prevState) => prevState.concat(data))
      })
      .catch((error) => {
        console.log('error. ___ ', error.response)
        setTariffsLoading(false)
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

  // const searchHandle = (e) => {
  //   setNextPage(null)
  //   setTariffs([])
  //   const value = e.target.value
  //   clearTimeout(delayTimer)
  //   setDelayTimer(
  //     setTimeout(function () {
  //       if (token) {
  //         const url = `${baseURL}${TARIFFS}?search=${value}`
  //         getOrderList(url)
  //       }
  //     }, 300)
  //   )
  // }

  const addListener = (menu) => {
    if (!menu) {
      document.addEventListener('click', handleOutsideClick, false)
    } else {
      document.removeEventListener('click', handleOutsideClick, false)
    }
  }
  const openSelector = () => {
    addListener(showMenu)
    setShowMenu((prev) => !prev)
  }
  const handleSelect = (value) => {
    setShowValue(SORTING[value])
    setShowMenu((prev) => !prev)
  }

  const handleOutsideClick = (e) => {
    if (selectorNode && selectorNode.current && !selectorNode.current.contains(e.target)) {
      setShowMenu(false)
    }
  }
  const closeMessageClass = () => {
    setMessageClass('message-hidden')
  }

  return (
    <InnerContent p="p-0" overFlow=" ">
      <div className="h-full overflow-y-scroll p-5" ref={scrollBoxRef} id="scrollBoxID">
        <div className="pb-8">
          <div className="flex items-center">
            {/* <div
              className="bg-color3 w-1/2 p-1 rounded-xl flex flex-row justify-between items-center"
              style={{ borderRadius: 16 }}
            >
              <img className="h-6 mr-2" src={UserSearch} alt="آیکن" />
              <input
                placeholder="جستجو در تعرفه ها"
                className="px-2 w-full align-right"
                onChange={searchHandle}
              />
              <Notification pic={SearchWhite} backgroundColor="#1641ff" />
            </div> */}
            <div className="mr-2 w-full p-1 rounded-xl flex flex-row justify-between items-center">
              <div className="w-1/3 flex flex-row jsutify-center">
                <FilterSelectOption
                  handleMenu={openSelector}
                  showMenu={showMenu}
                  selectRow={handleSelect}
                  showValue={showValue}
                  data={selectorData}
                  node={selectorNode}
                />
              </div>
              <ExportPdf />
            </div>
          </div>
          <div className="mt-8 mb-32" id="scrollChildID">
            <TariffsTable data={tariffs} loading={tariffsLoading} />
          </div>
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
export default Tariffs
