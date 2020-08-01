import React, { useState, useRef, useEffect } from 'react'
import { Map, TileLayer, withLeaflet } from 'react-leaflet'
import { ReactLeafletSearch } from 'react-leaflet-search'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import NumberFormat from 'react-number-format'

//redux
import { useSelectorUserInfo } from '../selectors/selectors'
import { useSelector } from 'react-redux'

// components
import WrapperSimple from '../container/WrapperSimple'
import PageTitle from '../components/PageTitle'
import ReportCondition from 'src/components/ReportCondition'
import EditDriverTable from 'src/components/EditDriverTable'
import DriverInfoWrapper from 'src/container/DriverInfoWrapper'
import WorkerInfoWrapper from 'src/container/WorkerInfoWrapper'
import SimpleCollapseWrapper from 'src/container/SimpleCollapseWrapper'
import Input from 'src/components/Input'
import SelectOption from 'src/components/SelectOption'
import Cropper from '../components/Cropper'
import Button from 'src/components/Button'
import InnerContent from 'src/container/InnerContent'
import AddedWorkerRow from 'src/components/AddedWorkerRow'
import RadioButton from 'src/components/RadioButton'
import SimpleImageUploader from 'src/components/SimpleImageUploader'
import AddedTimeRow from 'src/components/AddedTimeRow'
import SelectDays from 'src/components/SelectDays'
import SelectMonths from 'src/components/SelectMonths'
import MessageBox from 'src/components/MessageBox'

// const
import {
  CreditCardLargeBlue,
  BasketBlack,
  BigPenEditWhite,
  ArrowRightDark,
  PlusBlue,
  TrashRed,
  CameraDarkGrey,
  InformationBlue,
  InformationDark,
  BusinessChartRectanngleGray,
  BusinessChartRectanngleBlue,
  AlarmClockBlack,
  StarBlack,
} from 'src/utils/Icons'
import { baseURL, UPDATE_RETRIEVE_AGENT, AGENT_CREATION } from '../config'
import { regularPhoneNumber, clockFormat } from '../utils/helpers'
import {
  DAYS_OF_WEEK_TO_PERSIAN,
  NAME_OF_MONTH_TO_PERSIAN,
  DAYS_OF_WEEK_TO_NUMBER,
  NAME_OF_MONTH_TO_NUMBER,
  DAYS_OF_WEEK_NUMBER_TO_PERSIAN,
  NAME_OF_MONTH_NUMBER_TO_PERSIAN,
} from '../utils/constant'

const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch)

const monthData = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
]

const daysData = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
]

const ownershipData = [
  { id: 1, label: 'شرکت' },
  { id: 2, label: 'استیجاری' },
]

const data1 = [{ name: 'نان خشک ( ۵ کیلو ) ' }, { name: 'کارتن ( ۱ کیلو )  ' }]
const data2 = [
  { name: 'نان خشک ( ۵ کیلو ) ' },
  { name: 'کارتن ( ۱ کیلو )  ' },
  { name: 'پلاستیک ( ۱ کیلو )  ' },
  { name: 'بطری ( ۱ کیلو )  ' },
  { name: 'کاغذ ( ۱ کیلو )  ' },
  { name: 'کاغذ ( ۱ کیلو )  ' },
]
const data3 = [
  { id: 11, name: 'مجموع' },
  { id: 12, name: 'ماه جاری' },
]
const data4 = [
  { id: 11, name: 'اطلاعات', icon: InformationBlue, inactiveIcon: InformationDark },
  {
    id: 22,
    name: 'گزارشات',
    icon: BusinessChartRectanngleBlue,
    inactiveIcon: BusinessChartRectanngleGray,
  },
]

function EditDriver(props) {
  const [loading, setLoading] = useState(false)
  const [getDataLoading, setGetDataLoading] = useState(false)
  const token = useSelectorUserInfo().token
  const header = {
    headers: {
      Authorization: `jwt ${token}`,
    },
  }
  const ID = props.location.pathname.substring(14)

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])

  const [agentAvatar, setAgentAvatar] = useState('')
  const [agentAvatarVal, setAgentAvatarVal] = useState('')
  const [agentAvatarLocal, setAgentAvatarLocal] = useState('')
  const [agentAvatarUpload, setAgentAvatarUpload] = useState('')

  const [agent, setAgent] = useState({})
  const [agentError, setAgentError] = useState({})
  const agentFirstName = useRef(null)
  const agentLastName = useRef(null)
  const agentBirthPlace = useRef(null)
  const agentBirthCerificateNumber = useRef(null)
  const agentFatherName = useRef(null)
  const agentBirthYear = useRef(null)
  const agentNationalCode = useRef(null)
  const agentPhoneNumber = useRef(null)
  const agentLicenseNumber = useRef(null)

  const [workerAvatar, setWorkerAvatar] = useState([])
  const [workerAvatarVal, setWorkerAvatarVal] = useState('')
  const [workerAvatarUpload, setWorkerAvatarUpload] = useState([])
  const [workerAvatarUploaded, setWorkerAvatarUploaded] = useState([])

  const [worker, setWorker] = useState({})
  const [workerError, setWorkerError] = useState({})
  const [workerAddedData, setWorkerAddedData] = useState([{}])
  const [workerAddedDataShow, setWorkerAddedDataShow] = useState([{}])
  const [workerValidate, setWorkerValidate] = useState(false)

  const [vehicle, setVehicle] = useState({})
  const [vehicleError, setVehicleError] = useState({})
  const vehicleBrand = useRef(null)
  const vehicleModel = useRef(null)
  const vehiclePlateNumber = useRef(null)
  const vehicleType = useRef(null)
  const vehicleColor = useRef(null)
  const vehicleOwnership = useRef(null)
  const vehicleThirdPartyInsurance = useRef(null)
  const vehicleManufacturingYear = useRef(null)
  const vehicleMaxAllowableLoad = useRef(null)
  const vehicleChassis = useRef(null)

  const [personalVehicleOwner, setPersonalVehicleOwner] = useState([])
  const [personalVehicleOwnerError, setPersonalVehicleOwnerError] = useState([])
  const personalVehicleOwnerFirstName = useRef(null)
  const personalVehicleOwnerLastName = useRef(null)
  const personalVehicleOwnerFatherName = useRef(null)
  const personalVehicleOwnerBirthPlace = useRef(null)
  const personalVehicleOwnerBirthYear = useRef(null)
  const personalVehicleOwnerBirthCerificateNumber = useRef(null)
  const personalVehicleOwnerNationalCode = useRef(null)
  const personalVehicleOwnerPhoneNumber = useRef(null)

  const [dataTime, setDataTime] = useState([])
  const [dataTimeShow, setDataTimeShow] = useState([])
  const [times, setTimes] = useState({})
  const [timesError, setTimesError] = useState({})

  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const [activeTabIndexMini, setActiveTabIndexMini] = React.useState(0)

  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')
  const [messageStatus, setMessageStatus] = useState('error')

  useEffect(() => {
    getDriver()
  }, [])

  const getDriver = () => {
    setGetDataLoading(true)

    axios
      .get(`${baseURL}${UPDATE_RETRIEVE_AGENT}${ID}/`, header)
      .then((res) => {
        // agent
        setAgent({
          phone_number: regularPhoneNumber(res?.data?.user?.phone_number || '') || '',
          last_name: res?.data?.user?.last_name || '',
          first_name: res?.data?.user?.first_name || '',
          father_name: res?.data?.father_name || '',
          birth_place: res?.data?.birth_place || '',
          birth_year: res?.data?.birth_year || '',
          birth_cerificate_number: res?.data?.birth_cerificate_number || '',
          national_code: res?.data?.national_code || '',
          driver_license_number: res?.data?.driver_license_number || '',
        })
        setAgentAvatar(res?.data?.user?.avatar || '')
        //worker
        const changedWorkerData = res?.data?.vehicleworker
        for (let i = 0; i < changedWorkerData.length; i++) {
          changedWorkerData[i]['phone_number'] = regularPhoneNumber(
            changedWorkerData[i]['phone_number']
          )
        }
        setWorkerAddedDataShow(changedWorkerData)
        // vehicle
        setVehicle(res?.data?.vehicle)
        //personal vehicle owner
        setPersonalVehicleOwner({
          birth_cerificate_number: res?.data?.personal_vehicle_owner[0].birth_cerificate_number,
          birth_place: res?.data?.personal_vehicle_owner[0].birth_place,
          birth_year: res?.data?.personal_vehicle_owner[0].birth_year,
          father_name: res?.data?.personal_vehicle_owner[0].father_name,
          first_name: res?.data?.personal_vehicle_owner[0].first_name,
          last_name: res?.data?.personal_vehicle_owner[0].last_name,
          national_code: res?.data?.personal_vehicle_owner[0].national_code.toString(),
          phone_number: regularPhoneNumber(res?.data?.personal_vehicle_owner[0].phone_number),
        })
        //time
        setDataTimeShow(res?.data?.schedule_worker)
        setGetDataLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setMessage('خطایی رخ داده است')
        setMessageStatus('error')
        setMessageClass('message-show')
        setGetDataLoading(false)
      })
  }
  const submitData = () => {
    setMessageClass('message-hidden')
    setLoading(true)

    const copyWorkerAddedDataShow = JSON.parse(JSON.stringify(workerAddedDataShow))
    if (copyWorkerAddedDataShow.length > 0) {
      for (let i = 0; i < copyWorkerAddedDataShow.length; i++) {
        copyWorkerAddedDataShow[i]['phone_number'] =
          '98' + copyWorkerAddedDataShow[i]['phone_number'].substring(1)
        delete copyWorkerAddedDataShow[i]['avatar']
      }
    }

    const copyPersonalVehicleOwner = { ...personalVehicleOwner }
    copyPersonalVehicleOwner['phone_number'] =
      '98' + copyPersonalVehicleOwner['phone_number'].substring(1)

    const data = {
      phone_number: '98' + agent?.phone_number.substring(1),
      first_name: agent?.first_name,
      last_name: agent?.last_name,
      birth_place: agent?.birth_place,
      birth_year: agent?.birth_year,
      father_name: agent?.father_name,
      national_code: agent?.national_code,
      driver_license_number: agent?.driver_license_number,
      birth_cerificate_number: agent?.birth_cerificate_number,
      vehicle_worker: copyWorkerAddedDataShow.length !== 0 ? copyWorkerAddedDataShow : [],
      schedule_work: dataTimeShow.length !== 0 ? dataTimeShow : [],
      vehicle,
      personal_vehicle_owner: copyPersonalVehicleOwner,
    }

    axios
      .put(`${baseURL}${UPDATE_RETRIEVE_AGENT}${ID}/`, data, header)
      .then(function (response) {
        const vehicleId = response?.data?.vehicle?.id
        const formDataImages = new FormData()

        const dontAddWorkerImageToFormData = () => {
          const arr = workerAddedDataShow.map((item) => item.avatar)
          if (arr.every((item) => item !== '' && item !== null && item !== undefined)) {
            if (arr.every((item) => item.includes('https://'))) return true
          }
          return false
        }
        const retrunFinalWorkerImage = () => {
          for (let i = 0; i < workerAddedDataShow.length; i++) {
            if (workerAddedDataShow[i]?.avatar === '' || workerAddedDataShow[i]?.avatar === null) {
              formDataImages.append(workerAddedDataShow[i]['id'], '')
            } else if (
              (workerAddedDataShow[i]?.avatar !== '' || workerAddedDataShow[i]?.avatar !== null) &&
              workerAddedDataShow[i]?.avatar.includes('data:')
            ) {
              formDataImages.append(
                workerAddedDataShow[i]['id'],
                workerAddedDataShow[i]['avatar_file']
              )
            }
          }
        }

        if (agentAvatar.includes('https://')) {
          console.log(1)
          if (!dontAddWorkerImageToFormData()) {
            retrunFinalWorkerImage()
            axios
              .patch(`${baseURL}${UPDATE_RETRIEVE_AGENT}${vehicleId}/`, formDataImages, header)
              .then(function (response) {
                console.log('responsSE pic : ', response)
                setMessage('تغییرات با موفقیت ثبت شد')
                setMessageClass('message-show')
                setMessageStatus('success')
                setLoading(false)
              })
              .catch((err) => {
                setMessage('خطایی رخ داده است')
                setMessageClass('message-show')
                console.log('err : ', err)
                setLoading(false)
              })
          } else {
            setMessage('تغییرات با موفقیت ثبت شد')
            setMessageClass('message-show')
            setMessageStatus('success')
            setLoading(false)
          }
        } else if (agentAvatar === '') {
          retrunFinalWorkerImage()
          axios
            .patch(`${baseURL}${UPDATE_RETRIEVE_AGENT}${vehicleId}/`, formDataImages, header)
            .then(function (response) {
              console.log('responsSE pic : ', response)
              setMessage('تغییرات با موفقیت ثبت شد')
              setMessageClass('message-show')
              setMessageStatus('success')
              setLoading(false)
            })
            .catch((err) => {
              setMessage('خطایی رخ داده است')
              setMessageClass('message-show')
              console.log('err : ', err)
              setLoading(false)
            })
        } else if (agentAvatar.includes('data:')) {
          formDataImages.append('agent_avatar', agentAvatarUpload)
          retrunFinalWorkerImage()
          axios
            .patch(`${baseURL}${UPDATE_RETRIEVE_AGENT}${vehicleId}/`, formDataImages, header)
            .then(function (response) {
              console.log('responsSE pic : ', response)
              setMessage('تغییرات با موفقیت ثبت شد')
              setMessageClass('message-show')
              setMessageStatus('success')
              setLoading(false)
            })
            .catch((err) => {
              setMessage('خطایی رخ داده است')
              setMessageClass('message-show')
              console.log('err : ', err)
              setLoading(false)
            })
        } else {
          setMessage('خطایی رخ داده است')
          setMessageClass('message-show')
          setMessageStatus('error')
          setLoading(false)
        }
      })
      .catch((err) => {
        setMessage('خطایی رخ داده است')
        setMessageClass('message-show')
        setMessageStatus('error')
        console.log('second err : ', err)
        setLoading(false)
      })
  }

  const changeTab = (index, fn) => {
    fn(index)
  }

  // agent
  const handleChangeAgent = (event) => {
    const value = event.target.value
    const name = event.target.name
    if (
      name === 'national_code' ||
      name === 'phone_number' ||
      name === 'driver_license_number' ||
      name === 'birth_cerificate_number' ||
      name === 'birth_year'
    ) {
      setAgent((prev) => {
        return { ...prev, [name]: value.replace(/[^0-9]/g, '').trim() }
      })
    } else {
      setAgent((prev) => {
        return { ...prev, [name]: value }
      })
    }
    setAgentError((prev) => {
      return { ...prev, [name]: '' }
    })
  }
  const agentImageChangeHandler = (e, uploadFn, imgFn) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    // upload
    setAgentAvatarUpload(file)
    reader.onloadend = function (e) {
      // add for show
      setAgentAvatar(reader.result)
    }
  }

  // worker
  const handleChangeWorker = (event, index) => {
    const value = event.target.value
    const name = event.target.name
    if (
      name === 'national_code' ||
      name === 'phone_number' ||
      name === 'driver_license_number' ||
      name === 'birth_cerificate_number' ||
      name === 'birth_year'
    ) {
      setWorkerAddedDataShow((prev) => {
        console.log('prev : ', prev)
        const copy = JSON.parse(JSON.stringify(prev))
        copy[index][name] = value.replace(/[^0-9]/g, '').trim()
        return copy
      })
    } else {
      setWorkerAddedDataShow((prev) => {
        const copy = JSON.parse(JSON.stringify(prev))
        copy[index][name] = value
        return copy
      })
    }
    setWorkerError({})
    addRemoveWorkerHandleChange(event)
  }
  const addRemoveWorkerHandleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setWorkerAddedData({ ...workerAddedData, [name]: value })
  }

  //worker avatar
  const workerImageChangeHandler = (e, index) => {
    console.log('i ::: ', index)
    const file = e.target.files[0]
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)

    console.log('PREV : ', workerAddedDataShow)
    const copy = [...workerAddedDataShow]
    copy[index]['avatar_file'] = file

    reader.onloadend = function (e) {
      copy[index]['avatar'] = reader.result
      // add for show
      setWorkerAddedDataShow(copy)
      setTimeout(() => {
        console.log('copy : ', copy)
      }, 0)
    }
  }

  //delete worker avatar
  const deleteWorkeravatar = (index) => {
    setWorkerAddedDataShow((prev) => {
      const copy = [...workerAddedDataShow]
      copy[index]['avatar'] = ''
      copy[index]['avatar_file'] = ''
      return copy
    })
  }

  //vehicle
  const handleChangeVehicle = (event) => {
    const value = event.target.value
    const name = event.target.name
    if (name === 'manufacturing_year') {
      setVehicle((prev) => {
        return { ...prev, [name]: value.replace(/[^0-9]/g, '').trim() }
      })
    } else {
      setVehicle((prev) => {
        return { ...prev, [name]: value }
      })
    }
    setVehicleError((prev) => {
      return { ...prev, [name]: '' }
    })
  }

  // personal vehicle owner
  const handleChangePersonalVehicleOwner = (event) => {
    const value = event.target.value
    const name = event.target.name
    setPersonalVehicleOwner((prev) => {
      return { ...prev, [name]: value }
    })
    setPersonalVehicleOwnerError((prev) => {
      return { ...prev, [name]: '' }
    })
  }

  //time
  const addRemoveTimeHandleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setDataTime({ ...dataTime, [name]: value })
  }

  //submit form
  const submitForm = () => {
    if (!agent.first_name) {
      // agent
      agentFirstName && agentFirstName.current.focus()
      setAgentError({ first_name: 'نام را وارد کنید' })
    } else if (!agent.last_name) {
      agentLastName && agentLastName.current.focus()
      setAgentError({ last_name: 'نام خانوادگی را وارد کنید' })
    } else if (!agent.father_name) {
      agentFatherName && agentFatherName.current.focus()
      setAgentError({ father_name: 'نام پدر را وارد کنید' })
    } else if (!agent.birth_place) {
      agentBirthPlace && agentBirthPlace.current.focus()
      setAgentError({ birth_place: 'محل تولد را وارد کنید' })
    } else if (!agent.birth_cerificate_number) {
      agentBirthCerificateNumber && agentBirthCerificateNumber.current.focus()
      setAgentError({ birth_cerificate_number: 'شماره شناسنامه را وارد کنید' })
    } else if (!agent.birth_year) {
      agentBirthYear && agentBirthYear.current.focus()
      setAgentError({ birth_year: 'سال تولد باید 4 رقم باشد' })
    } else if (!agent.national_code || agent.national_code.length !== 10) {
      agentNationalCode && agentNationalCode.current.focus()
      setAgentError({ national_code: 'کد ملی باید 10 رقم باشد' })
    } else if (!agent.phone_number || agent.phone_number.length !== 11) {
      agentPhoneNumber && agentPhoneNumber.current.focus()
      setAgentError({ phone_number: 'شماره موبایل باید 11 رقم باشد' })
    } else if (!agent.driver_license_number) {
      agentLicenseNumber && agentLicenseNumber.current.focus()
      setAgentError({ driver_license_number: 'شماره گواهینامه را وارد کنید' })
    } else if (workerAddedDataShow.length > 0) {
      //worker
      for (let j = 0; j < workerAddedDataShow.length; j++) {
        const first_name = document.getElementById(`first_name_${j}`)
        const last_name = document.getElementById(`last_name_${j}`)
        const father_name = document.getElementById(`father_name_${j}`)
        const birth_place = document.getElementById(`birth_place_${j}`)
        const birth_cerificate_number = document.getElementById(`birth_cerificate_number_${j}`)
        const birth_year = document.getElementById(`birth_year_${j}`)
        const national_code = document.getElementById(`national_code_${j}`)
        const phone_number = document.getElementById(`phone_number_${j}`)

        if (!workerAddedDataShow[j].first_name) {
          first_name.focus()
          const arr = []
          arr[j] = { first_name: 'نام را وارد کنید' }
          setWorkerError(arr)
          return false
        } else if (!workerAddedDataShow[j].last_name) {
          last_name.focus()
          const arr = []
          arr[j] = { last_name: 'نام خانوادگی را وارد کنید' }
          setWorkerError(arr)
          return false
        } else if (!workerAddedDataShow[j].father_name) {
          father_name.focus()
          const arr = []
          arr[j] = { father_name: 'نام پدر را وارد کنید' }
          setWorkerError(arr)
          return false
        } else if (!workerAddedDataShow[j].birth_place) {
          birth_place.focus()
          const arr = []
          arr[j] = { birth_place: 'محل تولد را وارد کنید' }
          setWorkerError(arr)
          return false
        } else if (!workerAddedDataShow[j].birth_cerificate_number) {
          birth_cerificate_number.focus()
          const arr = []
          arr[j] = { birth_cerificate_number: 'شماره شناسنامه را وارد کنید' }
          setWorkerError(arr)
          return false
        } else if (!workerAddedDataShow[j].birth_year) {
          birth_year.focus()
          const arr = []
          arr[j] = { birth_year: 'سال تولد را وارد کنید' }
          setWorkerError(arr)
          return false
        } else if (
          !workerAddedDataShow[j].national_code ||
          workerAddedDataShow[j].national_code.length !== 10
        ) {
          national_code.focus()
          const arr = []
          arr[j] = { national_code: 'کد ملی باید 10 رقم باشد' }
          setWorkerError(arr)
          return false
        } else if (
          !workerAddedDataShow[j].phone_number ||
          workerAddedDataShow[j].phone_number.length !== 11
        ) {
          phone_number.focus()
          const arr = []
          arr[j] = { phone_number: 'شماره موبایل باید 11 رقم باشد' }
          setWorkerError(arr)
          return false
        }
      }
      if (workerValidate && !vehicle.brand) {
        // vehicle
        vehicleBrand && vehicleBrand.current.focus()
        setVehicleError({ brand: 'برند خودرو را وارد کنید' })
      } else if (!vehicle.type) {
        vehicleType && vehicleType.current.focus()
        setVehicleError({ type: 'سیستم خودرو را وارد کنید' })
      } else if (!vehicle.plate_number) {
        vehiclePlateNumber && vehiclePlateNumber.current.focus()
        setVehicleError({ plate_number: 'شماره انتطامی را وارد کنید' })
      } else if (!vehicle.model) {
        vehicleModel && vehicleModel.current.focus()
        setVehicleError({ model: 'تیپ خودرو را وارد کنید' })
      } else if (!vehicle.color) {
        vehicleColor && vehicleColor.current.focus()
        setVehicleError({ color: 'رنگ خودرو را وارد کنید' })
      } else if (!vehicle.ownership) {
        vehicleOwnership && vehicleOwnership.current.focus()
        setVehicleError({ ownership: 'مالکیت خودرو را وارد کنید' })
      } else if (!vehicle.third_party_insurance) {
        vehicleThirdPartyInsurance && vehicleThirdPartyInsurance.current.focus()
        setVehicleError({ third_party_insurance: 'شماره بیمه را وارد کنید' })
      } else if (!vehicle.manufacturing_year) {
        vehicleManufacturingYear && vehicleManufacturingYear.current.focus()
        setVehicleError({ manufacturing_year: 'مدل خودرو را وارد کنید' })
      } else if (!vehicle.max_allowable_load) {
        vehicleMaxAllowableLoad && vehicleMaxAllowableLoad.current.focus()
        setVehicleError({ max_allowable_load: 'حداکثر بار مجاز را وارد کنید' })
      } else if (!vehicle.chassis) {
        vehicleChassis && vehicleChassis.current.focus()
        setVehicleError({ chassis: 'شماره شاسی را وارد کنید' })
      } else if (!personalVehicleOwner.first_name) {
        // personal vehicle owner
        personalVehicleOwnerFirstName && personalVehicleOwnerFirstName.current.focus()
        setPersonalVehicleOwnerError({ first_name: 'نام را وارد کنید' })
      } else if (!personalVehicleOwner.last_name) {
        personalVehicleOwnerLastName && personalVehicleOwnerLastName.current.focus()
        setPersonalVehicleOwnerError({ last_name: 'نام خانوادگی را وارد کنید' })
      } else if (!personalVehicleOwner.father_name) {
        personalVehicleOwnerFatherName && personalVehicleOwnerFatherName.current.focus()
        setPersonalVehicleOwnerError({ father_name: 'نام پدر را وارد کنید' })
      } else if (!personalVehicleOwner.birth_cerificate_number) {
        personalVehicleOwnerBirthCerificateNumber &&
          personalVehicleOwnerBirthCerificateNumber.current.focus()
        setPersonalVehicleOwnerError({ birth_cerificate_number: 'شماره شناسنامه را وارد کنید' })
      } else if (!personalVehicleOwner.birth_place) {
        personalVehicleOwnerBirthPlace && personalVehicleOwnerBirthPlace.current.focus()
        setPersonalVehicleOwnerError({ birth_place: 'محل تولد را وارد کنید' })
      } else if (!personalVehicleOwner.birth_year) {
        personalVehicleOwnerBirthYear && personalVehicleOwnerBirthYear.current.focus()
        setPersonalVehicleOwnerError({ birth_year: 'سال تولد را وارد کنید' })
      } else if (
        !personalVehicleOwner.national_code ||
        personalVehicleOwner.national_code.length !== 10
      ) {
        personalVehicleOwnerNationalCode && personalVehicleOwnerNationalCode.current.focus()
        setPersonalVehicleOwnerError({ national_code: 'کد ملی باید 10 رقم باشد' })
      } else if (
        !personalVehicleOwner.phone_number ||
        personalVehicleOwner.phone_number.length !== 11
      ) {
        personalVehicleOwnerPhoneNumber && personalVehicleOwnerPhoneNumber.current.focus()
        setPersonalVehicleOwnerError({ phone_number: 'شماره موبایل باید 11 رقم باشد' })
      } else if (dataTimeShow.length > 0) {
        //times
        for (let k = 0; k < dataTimeShow.length; k++) {
          const start_time = document.getElementById(`start_time_${k}`)
          const end_time = document.getElementById(`end_time_${k}`)

          const fromHour = dataTimeShow[k]?.start_time?.substr(0, 2)
          const fromMinute = dataTimeShow[k]?.start_time?.substr(3, 2)
          const fromSecond = dataTimeShow[k]?.start_time?.substr(6, 2)
          const totalFrom = (fromHour + fromMinute + fromSecond).toString()

          const toHour = dataTimeShow[k]?.end_time?.substr(0, 2)
          const toMinute = dataTimeShow[k]?.end_time?.substr(3, 2)
          const toSecond = dataTimeShow[k]?.end_time?.substr(6, 2)
          const totalTo = (toHour + toMinute + toSecond).toString()
          if (
            !dataTimeShow[k]?.start_time ||
            totalFrom?.length !== 6 ||
            fromHour > 23 ||
            fromMinute > 60 ||
            fromSecond > 60
          ) {
            start_time.focus()
            const arr = []
            arr[k] = { start_time: 'ساعت شروع را به درستی وارد کنید' }
            setTimesError(arr)
            return false
          } else if (
            !dataTimeShow[0]?.end_time ||
            totalTo?.length !== 6 ||
            toHour > 23 ||
            toMinute > 60 ||
            toSecond > 60
          ) {
            end_time.focus()
            const arr = []
            arr[k] = { end_time: 'ساعت پایان را به درستی وارد کنید' }
            setTimesError(arr)
            return false
          }
        }
        setAgentError({})
        setWorkerError({})
        setVehicleError({})
        setPersonalVehicleOwnerError({})
        setTimesError({})
        submitData()
      }
    }
  }

  const errorClass =
    'rounded-xlg border border-error  bg-color5 px-2 py-3 text-color-4 text-sm font-yekanlight focus:bg-white'
  const clearClass =
    'rounded-xlg border border-color5 bg-color5 px-2 py-3 text-color-4 text-sm font-yekanlight focus:bg-white'

  return (
    <InnerContent>
      <div className="pb-8 relative">
        <PageTitle
          title="ویرایش راننده "
          icon={ArrowRightDark}
          classname="text-2xl mb-8 flex justify-between"
          buttonTitle="ویرایش"
          btnType="button"
          btnOneClick={submitForm}
          tabData={data4}
          changeTab={(index) => changeTab(index, setActiveTabIndex)}
          activeTabIndex={activeTabIndex}
          btnIcon={BigPenEditWhite}
          loading={loading}
          disabled={loading}
        />

        {activeTabIndex === 0 && (
          <>
            {/* agent */}
            <DriverInfoWrapper
              wrpperTitle="مشخصات راننده"
              wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
              fullname={(agent?.first_name || '') + ' ' + (agent?.last_name || '')}
              fathername={agent?.father_name || ''}
              birtcertificatenumber={agent?.birth_cerificate_number || ''}
              nationalcode={agent?.national_code || ''}
              birthplace={agent?.birth_place || ''}
              licensenumber={agent?.driver_license_number || ''}
              loading={getDataLoading}
            >
              <div className="w-full flex flex-row items-center">
                <SimpleImageUploader
                  src={agentAvatar}
                  change={agentImageChangeHandler}
                  deleteImage={() => {
                    setAgentAvatarUpload('')
                    setAgentAvatar('')
                    // setAgentAvatarVal('')
                  }}
                  // val={agentAvatarVal}
                />
                <div className="w-3/4 flex flex-wrap pr-2">
                  <Input
                    parentClass="w-1/3"
                    title="نام "
                    placeholder="نام  را وارد کنید"
                    name="first_name"
                    className={agentError?.first_name ? errorClass : clearClass}
                    type="text"
                    defaultValue=""
                    value={agent?.first_name}
                    onChange={handleChangeAgent}
                    error={agentError?.first_name}
                    node={agentFirstName}
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    title=" نام خانوادگی"
                    placeholder=" نام خانوادگی را وارد کنید"
                    className={agentError?.last_name ? errorClass : clearClass}
                    name="last_name"
                    type="text"
                    value={agent?.last_name}
                    defaultValue=""
                    onChange={handleChangeAgent}
                    error={agentError?.last_name}
                    node={agentLastName}
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    title="نام پدر"
                    placeholder="نام پدر را وارد کنید"
                    className={agentError?.father_name ? errorClass : clearClass}
                    name="father_name"
                    type="text"
                    defaultValue=""
                    value={agent?.father_name}
                    onChange={handleChangeAgent}
                    error={agentError?.father_name}
                    node={agentFatherName}
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    title="محل تولد"
                    placeholder="محل تولد را وارد کنید"
                    className={agentError?.birth_place ? errorClass : clearClass}
                    name="birth_place"
                    type="text"
                    defaultValue=""
                    value={agent?.birth_place}
                    onChange={handleChangeAgent}
                    error={agentError?.birth_place}
                    node={agentBirthPlace}
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    title="شماره شناسنامه"
                    placeholder="شماره شناسنامه را وارد کنید"
                    className={agentError?.birth_cerificate_number ? errorClass : clearClass}
                    name="birth_cerificate_number"
                    type="text"
                    defaultValue={''}
                    value={agent?.birth_cerificate_number}
                    error={agentError?.birth_cerificate_number}
                    onChange={handleChangeAgent}
                    maxLength={10}
                    node={agentBirthCerificateNumber}
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    title="سال تولد"
                    placeholder="سال تولد را وارد کنید"
                    className={agentError?.birth_year ? errorClass : clearClass}
                    name="birth_year"
                    type="text"
                    defaultValue=""
                    value={agent?.birth_year}
                    onChange={handleChangeAgent}
                    error={agentError?.birth_year}
                    maxLength={4}
                    node={agentBirthYear}
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    title="کد ملی"
                    placeholder="کد ملی را وارد کنید"
                    className={agentError?.national_code ? errorClass : clearClass}
                    name="national_code"
                    type="text"
                    defaultValue=""
                    value={agent?.national_code}
                    onChange={handleChangeAgent}
                    error={agentError?.national_code}
                    maxLength={10}
                    node={agentNationalCode}
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    title="شماره موبایل "
                    placeholder="09112345678"
                    className={agentError?.phone_number ? errorClass : clearClass}
                    name="phone_number"
                    type="text"
                    defaultValue=""
                    value={agent?.phone_number}
                    onChange={handleChangeAgent}
                    error={agentError?.phone_number}
                    maxLength={11}
                    node={agentPhoneNumber}
                    disabled
                    required
                  />
                  <Input
                    parentClass="w-1/3"
                    required
                    title="شماره گواهینامه"
                    placeholder="شماره گواهینامه را وارد کنید"
                    className={agentError?.driver_license_number ? errorClass : clearClass}
                    name="driver_license_number"
                    type="text"
                    defaultValue=""
                    value={agent?.driver_license_number}
                    onChange={handleChangeAgent}
                    error={agentError?.driver_license_number}
                    node={agentLicenseNumber}
                  />
                </div>
              </div>
            </DriverInfoWrapper>
            {/* worker */}
            <WorkerInfoWrapper
              wrpperTitle="مشخصات کارگران"
              wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
              data={workerAddedDataShow}
              loading={getDataLoading}
            >
              {/* add worker */}
              {workerAddedDataShow.map((item, index) => {
                const {
                  phone_number,
                  last_name,
                  father_name,
                  first_name,
                  birth_place,
                  birth_year,
                  birth_cerificate_number,
                  national_code,
                  driver_license_number,
                  avatar,
                } = item
                return (
                  <div key={index} className="w-full flex flex-row items-center">
                    <SimpleImageUploader
                      src={avatar}
                      change={(e) => workerImageChangeHandler(e, index)}
                      deleteImage={() => {
                        deleteWorkeravatar(index)
                        // setWorkerAvatarVal('')
                      }}
                      // val={workerAvatarVal}
                    />
                    <div className="w-3/4 flex flex-wrap pr-2">
                      <Input
                        id={`first_name_${index}`}
                        parentClass="w-1/3"
                        title="نام "
                        name="first_name"
                        placeholder="نام  را وارد کنید"
                        type="text"
                        defaultValue=""
                        className={
                          workerError && workerError[index] && workerError[index]['first_name']
                            ? errorClass
                            : clearClass
                        }
                        value={first_name}
                        onChange={(e) => handleChangeWorker(e, index)}
                        error={
                          (workerError && workerError[index] && workerError[index]['first_name']) ||
                          ''
                        }
                        required
                      />
                      <Input
                        id={`last_name_${index}`}
                        parentClass="w-1/3"
                        title="نام خانوادگی"
                        name="last_name"
                        placeholder="نام خانوادگی را وارد کنید"
                        className={
                          workerError && workerError[index] && workerError[index]['last_name']
                            ? errorClass
                            : clearClass
                        }
                        defaultValue=""
                        value={last_name}
                        type="text"
                        onChange={(e) => handleChangeWorker(e, index)}
                        error={workerError && workerError[index] && workerError[index]['last_name']}
                        required
                      />
                      <Input
                        id={`father_name_${index}`}
                        parentClass="w-1/3"
                        title="نام پدر"
                        name="father_name"
                        placeholder="نام پدر را وارد کنید"
                        className={
                          workerError && workerError[index] && workerError[index]['father_name']
                            ? errorClass
                            : clearClass
                        }
                        defaultValue=""
                        value={father_name}
                        error={
                          workerError && workerError[index] && workerError[index]['father_name']
                        }
                        type="text"
                        onChange={(e) => handleChangeWorker(e, index)}
                        required
                      />
                      <Input
                        id={`birth_place_${index}`}
                        parentClass="w-1/3"
                        title="محل تولد"
                        name="birth_place"
                        placeholder="محل تولد را وارد کنید"
                        className={
                          workerError && workerError[index] && workerError[index]['birth_place']
                            ? errorClass
                            : clearClass
                        }
                        defaultValue=""
                        value={birth_place}
                        error={
                          workerError && workerError[index] && workerError[index]['birth_place']
                        }
                        type="text"
                        onChange={(e) => handleChangeWorker(e, index)}
                        required
                      />
                      <Input
                        id={`birth_cerificate_number_${index}`}
                        parentClass="w-1/3"
                        title="شماره شناسنامه"
                        name="birth_cerificate_number"
                        placeholder="شماره شناسنامه را وارد کنید"
                        className={
                          workerError &&
                          workerError[index] &&
                          workerError[index]['birth_cerificate_number']
                            ? errorClass
                            : clearClass
                        }
                        defaultValue=""
                        value={birth_cerificate_number}
                        error={
                          workerError &&
                          workerError[index] &&
                          workerError[index]['birth_cerificate_number']
                        }
                        type="text"
                        onChange={(e) => handleChangeWorker(e, index)}
                        required
                      />
                      <Input
                        id={`birth_year_${index}`}
                        parentClass="w-1/3"
                        title="سال تولد"
                        name="birth_year"
                        placeholder="سال تولد را وارد کنید"
                        className={
                          workerError && workerError[index] && workerError[index]['birth_year']
                            ? errorClass
                            : clearClass
                        }
                        defaultValue=""
                        value={birth_year}
                        type="text"
                        error={
                          workerError && workerError[index] && workerError[index]['birth_year']
                        }
                        onChange={(e) => handleChangeWorker(e, index)}
                        maxLength={4}
                        required
                      />
                      <Input
                        id={`national_code_${index}`}
                        parentClass="w-1/3"
                        name="national_code"
                        title="کد ملی"
                        placeholder="کد ملی را وارد کنید"
                        className={
                          workerError && workerError[index] && workerError[index]['national_code']
                            ? errorClass
                            : clearClass
                        }
                        defaultValue=""
                        value={national_code}
                        type="text"
                        onChange={(e) => handleChangeWorker(e, index)}
                        error={
                          workerError && workerError[index] && workerError[index]['birth_year']
                        }
                        maxLength={10}
                        required
                      />
                      <Input
                        id={`phone_number_${index}`}
                        parentClass="w-1/3"
                        title="شماره موبایل "
                        name="phone_number"
                        placeholder="09112345678"
                        className={
                          workerError && workerError[index] && workerError[index]['phone_number']
                            ? errorClass
                            : clearClass
                        }
                        defaultValue=""
                        value={phone_number}
                        type="text"
                        onChange={(e) => handleChangeWorker(e, index)}
                        error={
                          workerError && workerError[index] && workerError[index]['phone_number']
                        }
                        maxLength={11}
                        required
                      />
                    </div>
                  </div>
                )
              })}
            </WorkerInfoWrapper>
            {/* vehicle  */}
            <SimpleCollapseWrapper
              wrpperTitle="مشخصات خودرو"
              wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
              loading={getDataLoading}
            >
              <div className="w-full flex flex-row items-center">
                <div className="w-full flex flex-wrap pr-2">
                  <Input
                    id="yek"
                    parentClass="w-1/4"
                    title="برند خودرو"
                    placeholder="برند خودرو را وارد کنید"
                    name="brand"
                    type="text"
                    className={vehicleError?.brand ? errorClass : clearClass}
                    defaultValue=""
                    value={vehicle?.brand}
                    onChange={handleChangeVehicle}
                    node={vehicleBrand}
                    error={vehicleError?.brand || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="سیستم خودرو"
                    placeholder="سیستم خودرو را وارد کنید"
                    name="type"
                    type="text"
                    className={vehicleError?.type ? errorClass : clearClass}
                    defaultValue=""
                    value={vehicle?.type}
                    onChange={handleChangeVehicle}
                    node={vehicleType}
                    error={vehicleError?.type || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="شماره انتظامی"
                    placeholder="شماره انتظامی را وارد کنید"
                    className={vehicleError?.plate_number ? errorClass : clearClass}
                    name="plate_number"
                    type="text"
                    defaultValue=""
                    value={vehicle.plate_number}
                    onChange={handleChangeVehicle}
                    node={vehiclePlateNumber}
                    error={vehicleError?.plate_number || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="تیپ خودرو"
                    placeholder="تیپ خودرو را وارد کنید"
                    type="text"
                    name="model"
                    className={vehicleError?.model ? errorClass : clearClass}
                    defaultValue=""
                    value={vehicle.model}
                    onChange={handleChangeVehicle}
                    node={vehicleModel}
                    error={vehicleError?.model || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="رنگ خودرو"
                    placeholder="رنگ خودرو را وارد کنید"
                    type="text"
                    name="color"
                    className={vehicleError?.color ? errorClass : clearClass}
                    defaultValue=""
                    value={vehicle.color}
                    onChange={handleChangeVehicle}
                    node={vehicleColor}
                    error={vehicleError?.color || ''}
                    required
                  />
                  <RadioButton
                    width="w-1/4"
                    title="مالکیت"
                    checkedValue={vehicle.ownership}
                    change={(e) => handleChangeVehicle({ target: { value: e, name: 'ownership' } })}
                    node={vehicleOwnership}
                    data={ownershipData}
                    error={vehicleError?.ownership || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="شماره بیمه "
                    placeholder="شماره بیمه  را وارد کنید"
                    type="text"
                    name="third_party_insurance"
                    className={vehicleError?.third_party_insurance ? errorClass : clearClass}
                    onChange={handleChangeVehicle}
                    defaultValue=""
                    value={vehicle.third_party_insurance}
                    error={vehicleError?.third_party_insurance || ''}
                    node={vehicleThirdPartyInsurance}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="مدل خودرو (سال )"
                    placeholder="مدل خودرو را وارد کنید"
                    type="text"
                    name="manufacturing_year"
                    className={vehicleError?.manufacturing_year ? errorClass : clearClass}
                    onChange={handleChangeVehicle}
                    defaultValue=""
                    value={vehicle.manufacturing_year}
                    error={vehicleError?.manufacturing_year || ''}
                    node={vehicleManufacturingYear}
                    maxLength={4}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="حداکثر بار مجاز ( کیلوگرم )"
                    placeholder="حداکثر بار مجاز را وارد کنید"
                    type="text"
                    name="max_allowable_load"
                    className={vehicleError?.max_allowable_load ? errorClass : clearClass}
                    onChange={handleChangeVehicle}
                    node={vehicleMaxAllowableLoad}
                    defaultValue=""
                    value={vehicle.max_allowable_load}
                    error={vehicleError?.max_allowable_load || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="شماره شاسی"
                    placeholder="شماره شاسی را وارد کنید"
                    type="text"
                    name="chassis"
                    className={vehicleError?.chassis ? errorClass : clearClass}
                    onChange={handleChangeVehicle}
                    node={vehicleChassis}
                    defaultValue=""
                    value={vehicle.chassis}
                    error={vehicleError?.chassis || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="code_number"
                    placeholder="code_number را وارد کنید"
                    type="text"
                    name="code_number"
                    className={vehicleError?.code_number ? errorClass : clearClass}
                    onChange={handleChangeVehicle}
                    defaultValue=""
                    value={vehicle.code_number}
                    error={vehicleError?.code_number || ''}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="card_number"
                    placeholder="card_number را وارد کنید"
                    type="text"
                    name="card_number"
                    className={vehicleError?.card_number ? errorClass : clearClass}
                    onChange={handleChangeVehicle}
                    defaultValue=""
                    value={vehicle.card_number}
                    error={vehicleError?.card_number || ''}
                    required
                  />
                </div>
              </div>
            </SimpleCollapseWrapper>
            {/* personal vehicle owner  */}
            <SimpleCollapseWrapper
              wrpperTitle="مشخصات مالک خودرو"
              wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
              loading={getDataLoading}
            >
              <div className="w-full flex flex-row items-center">
                <div className="w-full flex flex-wrap pr-2">
                  <Input
                    parentClass="w-1/4"
                    title="نام"
                    placeholder="نام را وارد کنید"
                    name="first_name"
                    type="text"
                    className={personalVehicleOwnerError?.first_name ? errorClass : clearClass}
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.first_name}
                    error={personalVehicleOwnerError?.first_name}
                    node={personalVehicleOwnerFirstName}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="نام خانوادگی"
                    placeholder="نام خانوادگی را وارد کنید"
                    name="last_name"
                    type="text"
                    className={personalVehicleOwnerError?.last_name ? errorClass : clearClass}
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.last_name}
                    error={personalVehicleOwnerError?.last_name}
                    node={personalVehicleOwnerLastName}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="نام پدر"
                    placeholder="نام پدر را وارد کنید"
                    name="father_name"
                    type="text"
                    className={personalVehicleOwnerError?.father_name ? errorClass : clearClass}
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.father_name}
                    error={personalVehicleOwnerError?.father_name}
                    node={personalVehicleOwnerFatherName}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="شماره شناسنامه"
                    placeholder="شماره شناسنامه را وارد کنید"
                    name="birth_cerificate_number"
                    type="text"
                    className={
                      personalVehicleOwnerError?.birth_cerificate_number ? errorClass : clearClass
                    }
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.birth_cerificate_number}
                    error={personalVehicleOwnerError?.birth_cerificate_number}
                    node={personalVehicleOwnerBirthCerificateNumber}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="محل تولد"
                    placeholder="محل تولد را وارد کنید"
                    name="birth_place"
                    type="text"
                    className={personalVehicleOwnerError?.birth_place ? errorClass : clearClass}
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.birth_place}
                    error={personalVehicleOwnerError?.birth_place}
                    node={personalVehicleOwnerBirthPlace}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="سال تولد"
                    placeholder="سال تولد را وارد کنید"
                    name="birth_year"
                    type="text"
                    className={personalVehicleOwnerError?.birth_year ? errorClass : clearClass}
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.birth_year}
                    error={personalVehicleOwnerError?.birth_year}
                    node={personalVehicleOwnerBirthYear}
                    maxLength={4}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="کد ملی "
                    placeholder="کد ملی  را وارد کنید"
                    name="national_code"
                    type="text"
                    className={personalVehicleOwnerError?.national_code ? errorClass : clearClass}
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.national_code}
                    error={personalVehicleOwnerError?.national_code}
                    node={personalVehicleOwnerNationalCode}
                    maxLength={10}
                    required
                  />
                  <Input
                    parentClass="w-1/4"
                    title="شماره موبایل "
                    placeholder="09112345678"
                    name="phone_number"
                    type="text"
                    className={personalVehicleOwnerError?.phone_number ? errorClass : clearClass}
                    onChange={handleChangePersonalVehicleOwner}
                    defaultValue=""
                    value={personalVehicleOwner?.phone_number}
                    error={personalVehicleOwnerError?.phone_number}
                    node={personalVehicleOwnerPhoneNumber}
                    maxLength={11}
                    required
                  />
                </div>
              </div>
            </SimpleCollapseWrapper>
            {/* time */}
            <SimpleCollapseWrapper
              wrpperTitle="تقویم و برنامه کاری"
              wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
              loading={getDataLoading}
              data={dataTimeShow?.length > 0}
            >
              {dataTimeShow.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex w-full">
                      <div className="w-1/6 p-2 ltr flex flex-col select-clock">
                        <div className="text-color2 text-xs font-yekanbold relative mb-2">
                          از ساعت
                          <span className="absolute bg-error w-1 h-1 rounded-full "></span>
                        </div>
                        <div
                          className={`flex flex-row justify-between  w-full rounded-xlg bg-color5 px-2 py-3 border ${
                            timesError && timesError[index] && timesError[index]['start_time']
                              ? 'border-error'
                              : 'border-transparent'
                          }`}
                        >
                          {/* <input  /> */}
                          <NumberFormat
                            id={`start_time_${index}`}
                            onValueChange={(event) => {
                              const value = event.formattedValue
                              const copy = JSON.parse(JSON.stringify(dataTimeShow))
                              copy[index]['start_time'] = clockFormat(
                                value.replace(/[^0-9]/g, '').trim()
                              )
                              setDataTimeShow(copy)
                            }}
                            value={item?.start_time}
                            style={{
                              height: '1.3rem',
                              paddingTop: 8,
                              width: '100%',
                              color: '#536b88',
                              direction: 'ltr',
                            }}
                            format="##:##:##"
                            placeholder="08:00:00"
                          />
                        </div>
                        <span className="text-xxs font-yekanlight text-error mt-1 h-3">
                          {timesError && timesError[index] && timesError[index]['start_time']}
                        </span>
                      </div>
                      <div className="w-1/6 p-2 ltr flex flex-col select-clock">
                        <div className="text-color2 text-xs font-yekanbold relative mb-2">
                          تا ساعت
                          <span className="absolute bg-error w-1 h-1 rounded-full "></span>
                        </div>
                        <div
                          className={`flex flex-row justify-between  w-full rounded-xlg bg-color5 px-2 py-3 border ${
                            timesError && timesError[index] && timesError[index]['end_time']
                              ? 'border-error'
                              : 'border-transparent'
                          }`}
                        >
                          <NumberFormat
                            id={`end_time_${index}`}
                            onValueChange={(event) => {
                              const value = event.formattedValue
                              const copy = JSON.parse(JSON.stringify(dataTimeShow))
                              copy[index]['end_time'] = clockFormat(
                                value.replace(/[^0-9]/g, '').trim()
                              )
                              setDataTimeShow(copy)
                            }}
                            value={item?.end_time}
                            style={{
                              height: '1.3rem',
                              paddingTop: 8,
                              width: '100%',
                              color: '#536b88',
                              direction: 'ltr',
                            }}
                            format="##:##:##"
                            placeholder="08:00:00"
                          />
                        </div>
                        <span className="text-xxs font-yekanlight text-error mt-1 h-3">
                          {timesError && timesError[index] && timesError[index]['end_time']}
                        </span>
                      </div>
                      <SelectDays
                        title="از روز"
                        width="w-1/6"
                        data={daysData}
                        change={(e) => {
                          const value = e.target.value
                          const copy = JSON.parse(JSON.stringify(dataTimeShow))
                          copy[index]['from_day'] = value
                          setDataTimeShow(copy)
                        }}
                        defaultValue={item?.from_day}
                        required
                      />
                      <SelectDays
                        title="تا روز"
                        width="w-1/6"
                        data={daysData}
                        change={(e) => {
                          const value = e.target.value
                          const copy = JSON.parse(JSON.stringify(dataTimeShow))
                          copy[index]['to_day'] = value
                          setDataTimeShow(copy)
                        }}
                        defaultValue={item?.to_day}
                        required
                      />
                      <SelectMonths
                        title="از ماه"
                        width="w-1/6"
                        data={monthData}
                        change={(e) => {
                          const value = e.target.value
                          const copy = JSON.parse(JSON.stringify(dataTimeShow))
                          copy[index]['from_month'] = value
                          setDataTimeShow(copy)
                        }}
                        defaultValue={item?.from_month}
                        required
                      />
                      <SelectMonths
                        title="تا ماه"
                        width="w-1/6"
                        data={monthData}
                        change={(e) => {
                          const value = e.target.value
                          const copy = JSON.parse(JSON.stringify(dataTimeShow))
                          copy[index]['to_month'] = value
                          setDataTimeShow(copy)
                          console.log('copy : ', copy)
                        }}
                        defaultValue={item?.to_month}
                        required
                      />
                    </div>
                  </div>
                )
              })}
            </SimpleCollapseWrapper>
            {/* map */}
            <SimpleCollapseWrapper
              wrpperTitle="حوزه کاری راننده"
              wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
              loading={getDataLoading}
              data={false}
            >
              <div className="rounded-xxlg overflow-hidden" style={{ height: 600 }}>
                <Map center={[35.6892, 51.389]} zoom={14} zoomControl={false}>
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ReactLeafletSearchComponent
                    position="topright"
                    provider="OpenStreetMap"
                    providerOptions={{ region: 'gb' }}
                    inputPlaceholder="نام محله مورد نظر خود را جستجو کنید"
                  />
                </Map>
              </div>
            </SimpleCollapseWrapper>
          </>
        )}
        {activeTabIndex === 1 && (
          <>
            <WrapperSimple
              wrpperTitle="موجودی فعلی خودرو"
              wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
            >
              <div className="flex">
                {data1.map(({ name }, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 rounded-xlg bg-white text-sm font-yekanbold border border-primary text-primary ml-2"
                    >
                      {name}
                    </div>
                  )
                })}
              </div>
            </WrapperSimple>
            <WrapperSimple
              wrpperTitle="گزارش وضعیت"
              wrpperSubtitle="گزارش وضعیت راننده تا کنون"
              tab={true}
              tabData={data3}
              changeTab={(index) => changeTab(index, setActiveTabIndexMini)}
              activeTabIndex={activeTabIndexMini}
            >
              <div className="flex justify-between mt-4 mx-2">
                <ReportCondition
                  icon={CreditCardLargeBlue}
                  title="مجموع مبلغ پرداخت شده"
                  contentColor="#1641ff"
                  titleColor="#92a4bb"
                  content="300,000 تومان"
                />
                <ReportCondition
                  icon={AlarmClockBlack}
                  title="روز کاری فعال"
                  contentColor="#1a172d"
                  titleColor="#92a4bb"
                  content="12 روز"
                />
                <ReportCondition
                  icon={BasketBlack}
                  title="پسماند جمع آوری کرده"
                  contentColor="#1a172d"
                  titleColor="#92a4bb"
                  content="12 کیلوگرم"
                />
                <ReportCondition
                  icon={StarBlack}
                  title="امتیاز راننده"
                  contentColor="#1a172d"
                  titleColor="#92a4bb"
                  content="5/5"
                />
              </div>
              <div className="flex p-2 items-center mt-2 mx-2 rounded-xlg border border-color4 justify-between">
                {data2.map(({ name }, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-center ${
                        index + 1 === data2.length ? '' : 'border-l border-color2'
                      }  w-full`}
                    >
                      <div className="py-2 px-4 text-sm font-yekanregular text-align-center text-color2 ml-2">
                        {name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </WrapperSimple>
            <WrapperSimple
              wrpperTitle="اطلاعات راننده"
              wrpperSubtitle="لیست کامل از حجم سفارش هایی که به این راننده اختصاص یافته"
            >
              <EditDriverTable />
            </WrapperSimple>
          </>
        )}
      </div>
      <MessageBox
        messageClass={messageClass}
        message={message}
        closeMessageClass={() => setMessageClass('message-hidden')}
        status={messageStatus}
      />
    </InnerContent>
  )
}
export default EditDriver
