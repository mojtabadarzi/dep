import React, { useRef, useState } from 'react'
import { Map, TileLayer, withLeaflet } from 'react-leaflet'
import { ReactLeafletSearch } from 'react-leaflet-search'
import axios from 'axios'
import NumberFormat from 'react-number-format'

//redux
import { useSelectorUserInfo } from '../selectors/selectors'
// components
import PageTitle from '../components/PageTitle'
import SimpleCollapseWrapper from 'src/container/SimpleCollapseWrapper'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import InnerContent from 'src/container/InnerContent'
import SimpleImageUploader from 'src/components/SimpleImageUploader'
import AddedWorkerRow from 'src/components/AddedWorkerRow'
import AddedTimeRow from 'src/components/AddedTimeRow'
import RadioButton from 'src/components/RadioButton'
import SelectDays from 'src/components/SelectDays'
import SelectMonths from 'src/components/SelectMonths'

// icons
import { CameraDarkGrey, PlusWhite, TrashRed, ArrowRightDark, PlusBlue } from 'src/utils/Icons'
//const
import { baseURL, AGENT_CREATION, UPDATE_RETRIEVE_AGENT } from '../config'
import { DAYS_OF_WEEK_NUMBER_TO_PERSIAN, NAME_OF_MONTH_NUMBER_TO_PERSIAN } from '../utils/constant'
import { clockFormat } from '../utils/helpers'
import MessageBox from 'src/components/MessageBox'

const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch)

const monthData = [
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

const daysData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]

const ownershipData = [
  { id: 1, label: 'شرکت' },
  { id: 2, label: 'استیجاری' },
]

function AddDriver() {
  const [loading, setLoading] = useState(false)
  const token = useSelectorUserInfo().token
  const header = {
    headers: {
      Authorization: `jwt ${token}`,
    },
  }

  const [agentAvatar, setAgentAvatar] = useState('')
  const [agentAvatarVal, setAgentAvatarVal] = useState('')
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

  const [workerAvatar, setWorkerAvatar] = useState('')
  const [workerAvatarVal, setWorkerAvatarVal] = useState('')
  const [workerAvatarUpload, setWorkerAvatarUpload] = useState('')
  const [workerAvatarUploaded, setWorkerAvatarUploaded] = useState('')

  const [worker, setWorker] = useState({})
  const [workerError, setWorkerError] = useState({})
  const [workerAddedData, setWorkerAddedData] = useState([])
  const [workerAddedDataShow, setWorkerAddedDataShow] = useState([])
  const workerFirstName = useRef(null)
  const workerLastName = useRef(null)
  const workerBirthPlace = useRef(null)
  const workerBirthCerificateNumber = useRef(null)
  const workerFatherName = useRef(null)
  const workerBirthYear = useRef(null)
  const workerNationalCode = useRef(null)
  const workerPhoneNumber = useRef(null)

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

  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')
  const [messageStatus, setMessageStatus] = useState('error')

  const submitData = () => {
    setLoading(true)
    setMessageClass('message-hidden')

    const copyDataTimeShow = JSON.parse(JSON.stringify(dataTimeShow))
    if (copyDataTimeShow.length !== 0) {
      for (let i = 0; i < copyDataTimeShow.length; i++) {
        copyDataTimeShow[i]['start_time'] = clockFormat(copyDataTimeShow[i]['start_time'])
        copyDataTimeShow[i]['end_time'] = clockFormat(copyDataTimeShow[i]['end_time'])
      }
    }

    const copyWorkerAddedDataShow = [...workerAddedDataShow]
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
      father_name: agent?.father_name,
      national_code: agent?.national_code,
      driver_license_number: agent?.driver_license_number,
      vehicle_worker: copyWorkerAddedDataShow.length !== 0 ? copyWorkerAddedDataShow : [],
      schedule_work: copyDataTimeShow.length !== 0 ? copyDataTimeShow : [],
      vehicle: {
        station: null,
        brand: vehicle?.brand,
        model: vehicle?.model,
        plate_number: vehicle?.plate_number,
        type: vehicle?.type,
        color: vehicle?.color,
        ownership: vehicle?.ownership,
        third_party_insurance: vehicle?.third_party_insurance,
        manufacturing_year: vehicle?.manufacturing_year,
        max_allowable_load: vehicle?.max_allowable_load,
        code_number: 111111,
        chassis: vehicle?.chassis,
        card_number: 222222,
      },
      personal_vehicle_owner: copyPersonalVehicleOwner,
    }

    const datax = {
      phone_number: '989372486279',
      first_name: 'sdafas',
      birth_place: 'teh',
      last_name: 'asdfafa',
      father_name: 'fasdfsa',
      national_code: '18976',
      driver_license_number: '165334',
      vehicle: {
        station: null,
        brand: 'sdafsdf',
        model: 'dsf',
        plate_number: '1232د',
        type: 'fadsfa',
        color: 'sdafa',
        ownership: 1,
        third_party_insurance: '235858',
        manufacturing_year: '1398',
        max_allowable_load: '50',
        code_number: '0',
        chassis: '988797',
        card_number: '0',
      },
      // vehicle_worker: [
      //   {
      //     first_name: 'aadf',
      //     last_name: 'asdfafa',
      //     father_name: 'fasdfsa',
      //     national_code: '18976',
      //     birth_place: 'fafdaf',
      //     birth_cerificate_number: '9877',
      //     birth_year: '1380',
      //     phone_number: '989372212589',
      //   },
      // ],
      vehicle_worker: copyWorkerAddedDataShow.length !== 0 ? copyWorkerAddedDataShow : [],

      personal_vehicle_owner: {
        first_name: 'aadf',
        last_name: 'asdfafa',
        father_name: 'fasdfsa',
        birth_place: 'fafdaf',
        birth_year: '1380',
        birth_cerificate_number: '9877',
        national_code: '18976',
        phone_number: '989372212589',
      },
      // schedule_work: copyDataTimeShow.length !== 0 ? copyDataTimeShow : [],
      schedule_work: [
        {
          start_time: '14:30:59',
          end_time: '20:30:59',
          from_day: '1',
          to_day: '5',
          from_month: '1',
          to_month: '3',
        },
        {
          start_time: '14:30:59',
          end_time: '20:30:59',
          from_day: '1',
          to_day: '5',
          from_month: '7',
          to_month: '9',
        },
      ],
    }

    axios
      .post(`${baseURL}${AGENT_CREATION}`, data, header)
      .then(function (response) {
        if (workerAvatarUploaded.length === 0 && agentAvatarUpload) setLoading(false)
        const vehicleId = response?.data?.vehicle?.id
        const vehicleWorkerList = response?.data?.vehicleworker
        const vehicleWorkerIds = vehicleWorkerList.map((item) => item.id)
        console.log('IDS : ', vehicleWorkerIds)
        const formDataImages = new FormData()
        formDataImages.append('agent_avatar', agentAvatarUpload || null)
        for (let i = 0; i < workerAvatarUploaded.length; i++) {
          formDataImages.append(vehicleWorkerIds[i], workerAvatarUploaded[i]['avatar'] || null)
        }
        if (vehicleId) {
          axios
            .patch(`${baseURL}${UPDATE_RETRIEVE_AGENT}${vehicleId}/`, formDataImages, header)
            .then(function (response) {
              console.log('responsSE pic : ', response)
              setMessage('با موفقیت ثبت شد')
              setMessageStatus('success')
              setMessageClass('message-show')
              setLoading(false)
            })
            .catch((err) => {
              console.log('err : ', err)
              setMessage('خطایی رخ داده است')
              setMessageStatus('error')
              setMessageClass('message-show')
              setLoading(false)
            })
        }
      })
      .catch((err) => {
        console.log('err : ', err)
        setMessage('خطایی رخ داده است')
        setMessageStatus('error')
        setMessageClass('message-show')
        setLoading(false)
      })
  }

  const addRemoveWorkerHandleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setWorkerAddedData({ ...workerAddedData, [name]: value })
  }

  const addRemoveTimeHandleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setDataTime({ ...dataTime, [name]: value })
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
  // worker
  const handleChangeWorker = (event) => {
    const value = event.target.value
    const name = event.target.name
    if (
      name === 'national_code' ||
      name === 'phone_number' ||
      name === 'driver_license_number' ||
      name === 'birth_cerificate_number' ||
      name === 'birth_year'
    ) {
      setWorker((prev) => {
        return { ...prev, [name]: value.replace(/[^0-9]/g, '').trim() }
      })
    } else {
      setWorker((prev) => {
        return { ...prev, [name]: value }
      })
    }
    setWorkerError((prev) => {
      return { ...prev, [name]: '' }
    })
    addRemoveWorkerHandleChange(event)
  }
  //vehicle
  const handleChangeVehicle = (event) => {
    const value = event.target.value
    const name = event.target.name
    if (name === 'manufacturing_year' && name === 'max_allowable_load') {
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

  const submitForm = () => {
    if (!agent.first_name) {
      agentFirstName && agentFirstName.current.focus()
      setAgentError((prev) => {
        return { first_name: 'نام را وارد کنید' }
      })
    } else if (!agent.last_name) {
      agentLastName && agentLastName.current.focus()
      setAgentError((prev) => {
        return { last_name: 'نام خانوادگی را وارد کنید' }
      })
    } else if (!agent.father_name) {
      agentFatherName && agentFatherName.current.focus()
      setAgentError((prev) => {
        return { father_name: 'نام پدر را وارد کنید' }
      })
    } else if (!agent.birth_place) {
      agentBirthPlace && agentBirthPlace.current.focus()
      setAgentError((prev) => {
        return { birth_place: 'محل تولد را وارد کنید' }
      })
    } else if (!agent.birth_cerificate_number) {
      agentBirthCerificateNumber && agentBirthCerificateNumber.current.focus()
      setAgentError((prev) => {
        return { birth_cerificate_number: 'شماره شناسنامه را وارد کنید' }
      })
    } else if (!agent.birth_year) {
      agentBirthYear && agentBirthYear.current.focus()
      setAgentError((prev) => {
        return { birth_year: 'سال تولد باید 4 رقم باشد' }
      })
    } else if (!agent.national_code || agent.national_code.length !== 10) {
      agentNationalCode && agentNationalCode.current.focus()
      setAgentError((prev) => {
        return { national_code: 'کد ملی باید 10 رقم باشد' }
      })
    } else if (!agent.phone_number || agent.phone_number.length !== 11) {
      agentPhoneNumber && agentPhoneNumber.current.focus()
      setAgentError((prev) => {
        return { phone_number: 'شماره موبایل باید 11 رقم باشد' }
      })
    } else if (!agent.driver_license_number) {
      agentLicenseNumber && agentLicenseNumber.current.focus()
      setAgentError((prev) => {
        return { driver_license_number: 'شماره گواهینامه را وارد کنید' }
      })
    } else if (!vehicle.brand) {
      // vehicle
      vehicleBrand && vehicleBrand.current.focus()
      setVehicleError((prev) => {
        return { brand: 'برند خودرو را وارد کنید' }
      })
    } else if (!vehicle.type) {
      vehicleType && vehicleType.current.focus()
      setVehicleError((prev) => {
        return { type: 'سیستم خودرو را وارد کنید' }
      })
    } else if (!vehicle.plate_number) {
      vehiclePlateNumber && vehiclePlateNumber.current.focus()
      setVehicleError((prev) => {
        return { plate_number: 'شماره انتطامی را وارد کنید' }
      })
    } else if (vehicle.plate_number.length > 12) {
      vehiclePlateNumber && vehiclePlateNumber.current.focus()
      setVehicleError((prev) => {
        return { plate_number: 'شماره انتظامی باید کمتر از 12 کاراکتر یاشه' }
      })
    } else if (!vehicle.model) {
      vehicleModel && vehicleModel.current.focus()
      setVehicleError((prev) => {
        return { model: 'تیپ خودرو را وارد کنید' }
      })
    } else if (!vehicle.color) {
      vehicleColor && vehicleColor.current.focus()
      setVehicleError((prev) => {
        return { color: 'رنگ خودرو را وارد کنید' }
      })
    } else if (!vehicle.ownership) {
      vehicleOwnership && vehicleOwnership.current.focus()
      setVehicleError((prev) => {
        return { ownership: 'مالکیت خودرو را وارد کنید' }
      })
    } else if (!vehicle.third_party_insurance) {
      vehicleThirdPartyInsurance && vehicleThirdPartyInsurance.current.focus()
      setVehicleError((prev) => {
        return { third_party_insurance: 'شماره بیمه را وارد کنید' }
      })
    } else if (!vehicle.manufacturing_year) {
      vehicleManufacturingYear && vehicleManufacturingYear.current.focus()
      setVehicleError((prev) => {
        return { manufacturing_year: 'مدل خودرو را وارد کنید' }
      })
    } else if (!vehicle.max_allowable_load) {
      vehicleMaxAllowableLoad && vehicleMaxAllowableLoad.current.focus()
      setVehicleError((prev) => {
        return { max_allowable_load: 'حداکثر بار مجاز را وارد کنید' }
      })
    } else if (vehicle.max_allowable_load > 32766) {
      vehicleMaxAllowableLoad && vehicleMaxAllowableLoad.current.focus()
      setVehicleError((prev) => {
        return { max_allowable_load: 'حداکثر بار مجاز باید کمتر از 32767 باشد' }
      })
    } else if (!vehicle.chassis) {
      vehicleChassis && vehicleChassis.current.focus()
      setVehicleError((prev) => {
        return { chassis: 'شماره شاسی را وارد کنید' }
      })
    } else if (!personalVehicleOwner.first_name) {
      personalVehicleOwnerFirstName && personalVehicleOwnerFirstName.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { first_name: 'نام را وارد کنید' }
      })
    } else if (!personalVehicleOwner.last_name) {
      personalVehicleOwnerLastName && personalVehicleOwnerLastName.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { last_name: 'نام خانوادگی را وارد کنید' }
      })
    } else if (!personalVehicleOwner.father_name) {
      personalVehicleOwnerFatherName && personalVehicleOwnerFatherName.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { father_name: 'نام پدر را وارد کنید' }
      })
    } else if (!personalVehicleOwner.birth_cerificate_number) {
      personalVehicleOwnerBirthCerificateNumber &&
        personalVehicleOwnerBirthCerificateNumber.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { birth_cerificate_number: 'شماره شناسنامه را وارد کنید' }
      })
    } else if (!personalVehicleOwner.birth_place) {
      personalVehicleOwnerBirthPlace && personalVehicleOwnerBirthPlace.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { birth_place: 'محل تولد را وارد کنید' }
      })
    } else if (!personalVehicleOwner.birth_year) {
      personalVehicleOwnerBirthYear && personalVehicleOwnerBirthYear.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { birth_year: 'سال تولد را وارد کنید' }
      })
    } else if (
      !personalVehicleOwner.national_code ||
      personalVehicleOwner.national_code.length !== 10
    ) {
      personalVehicleOwnerNationalCode && personalVehicleOwnerNationalCode.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { national_code: 'کد ملی باید 10 رقم باشد' }
      })
    } else if (
      !personalVehicleOwner.phone_number ||
      personalVehicleOwner.phone_number.length !== 11
    ) {
      personalVehicleOwnerPhoneNumber && personalVehicleOwnerPhoneNumber.current.focus()
      setPersonalVehicleOwnerError((prev) => {
        return { phone_number: 'شماره موبایل باید 11 رقم باشد' }
      })
    } else {
      submitData()
    }
  }

  const errorClass =
    'rounded-xlg border border-error  bg-color5 px-2 py-3 text-color-4 text-sm font-yekanlight focus:bg-white'
  const clearClass =
    'rounded-xlg border border-color5 bg-color5 px-2 py-3 text-color-4 text-sm font-yekanlight focus:bg-white'

  const imageChangeHandler = (e, uploadFn, imgFn) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    // upload
    uploadFn(file)
    reader.onloadend = function (e) {
      // add for show
      imgFn([reader.result])
    }
  }
  const workerImageChangeHandler = (e, uploadFn, imgFn) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    // upload
    uploadFn((prev) => {
      return { ...prev, avatar: file }
    })
    reader.onloadend = function (e) {
      // add for show
      imgFn([reader.result])
      addRemoveWorkerHandleChange({
        target: {
          value: reader.result,
          name: 'avatar',
        },
      })
    }
  }
  return (
    <InnerContent>
      <div className="pb-8 relative">
        <>
          <PageTitle
            classname="text-2xl mb-8 flex justify-between"
            title=" افزودن راننده جدید"
            icon={ArrowRightDark}
            buttonTitle="تایید اطلاعات راننده"
            btnType="button"
            btnOneClick={submitForm}
            btnIcon={PlusWhite}
            loading={loading}
            disabled={loading}
          />
          <SimpleCollapseWrapper
            wrpperTitle="مشخصات راننده"
            wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
          >
            <div className="w-full flex flex-row items-center">
              <SimpleImageUploader
                src={agentAvatar}
                change={(e) => imageChangeHandler(e, setAgentAvatarUpload, setAgentAvatar)}
                deleteImage={() => {
                  setAgentAvatarUpload('')
                  setAgentAvatar('')
                }}
                val={agentAvatarVal}
                setVal={() => setAgentAvatarVal('')}
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
          </SimpleCollapseWrapper>
          {/* worker */}
          <SimpleCollapseWrapper
            wrpperTitle="مشخصات کارگران"
            wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
          >
            {workerAddedDataShow.map((item, index) => {
              return (
                <div key={index} className="w-full flex flex-col  border-b border-color1 pb-2 mb-4">
                  <div className="flex">
                    <div className="flex flex-col">
                      <span className="text-color2 text-xs font-yekanbold relative mb-2">
                        عکس پروفایل
                      </span>

                      {item.avatar ? (
                        <div
                          className="bg-color1 rounded-lg flex flex-col justify-center items-center cursor-pointer relative"
                          style={{ width: 270, height: 270 }}
                        >
                          <div
                            className="w-full h-full rounded-lg"
                            style={{
                              backgroundImage: `url(${item.avatar})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          ></div>
                        </div>
                      ) : (
                        <div
                          className="bg-color1 rounded-lg flex flex-col justify-center items-center cursor-pointer relative"
                          style={{ width: 270, height: 270 }}
                        >
                          <img className="w-8 " src={CameraDarkGrey} alt="دوربین" />
                          <span className="text-sm text-color2 mt-2">انتخاب عکس</span>
                        </div>
                      )}
                    </div>
                    <div className="w-3/4 flex flex-wrap pr-2">
                      <AddedWorkerRow
                        classname="w-1/3"
                        title="نام   "
                        content={item['first_name']}
                        required
                      />
                      <AddedWorkerRow
                        classname="w-1/3"
                        title=" نام خانوادگی"
                        content={item['last_name']}
                        required
                      />
                      <AddedWorkerRow
                        classname="w-1/3"
                        title="نام پدر"
                        content={item['father_name']}
                      />
                      <AddedWorkerRow
                        classname="w-1/3"
                        title="محل تولد"
                        content={item['birth_place']}
                      />
                      <AddedWorkerRow
                        classname="w-1/3"
                        title="شماره شناسنامه"
                        content={item['birth_cerificate_number']}
                      />
                      <AddedWorkerRow
                        classname="w-1/3"
                        title="سال تولد"
                        content={item['birth_year']}
                      />
                      <AddedWorkerRow
                        classname="w-1/3"
                        title="کد ملی"
                        content={item['national_code']}
                        required
                      />
                      <AddedWorkerRow
                        classname="w-1/3"
                        title="شماره موبایل"
                        content={item['phone_number']}
                      />
                      <div className="w-1/3 flex justify-end items-center p-2">
                        <Button
                          icon={TrashRed}
                          title="حذف کارگر"
                          backgroundColor="#fff"
                          border="border"
                          borderColor="border-error"
                          color="text-error"
                          width="50%"
                          click={() => {
                            setWorkerAddedDataShow((old) => old.filter((_, i) => i !== index))
                            setWorkerAvatarUploaded((oldPic) =>
                              oldPic.filter((_, i) => i !== index)
                            )
                          }}
                          btnType="button"
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="w-full flex justify-end items-center py-4 pl-3">
                    <div className="w-3/4 flex justify-end items-center "></div>
                  </div> */}
                </div>
              )
            })}
            {/* add worker */}
            <div className="w-full flex flex-row items-center">
              <SimpleImageUploader
                src={workerAvatar}
                change={(e) => workerImageChangeHandler(e, setWorkerAvatarUpload, setWorkerAvatar)}
                deleteImage={() => {
                  setWorkerAvatarUpload('')
                  setWorkerAvatar('')
                }}
                val={workerAvatarVal}
                setVal={() => setWorkerAvatarVal('')}
              />
              <div className="w-3/4 flex flex-wrap pr-2">
                <Input
                  parentClass="w-1/3"
                  title="نام "
                  name="first_name"
                  placeholder="نام  را وارد کنید"
                  type="text"
                  defaultValue=""
                  className={workerError?.first_name ? errorClass : clearClass}
                  value={worker?.first_name}
                  onChange={(e) => handleChangeWorker(e)}
                  error={workerError?.first_name || ''}
                  node={workerFirstName}
                  required
                />
                <Input
                  parentClass="w-1/3"
                  title="نام خانوادگی"
                  name="last_name"
                  placeholder="نام خانوادگی را وارد کنید"
                  className={workerError?.last_name ? errorClass : clearClass}
                  defaultValue=""
                  value={worker?.last_name}
                  type="text"
                  onChange={handleChangeWorker}
                  error={workerError?.last_name}
                  node={workerLastName}
                  required
                />
                <Input
                  parentClass="w-1/3"
                  title="نام پدر"
                  name="father_name"
                  placeholder="نام پدر را وارد کنید"
                  className={workerError?.father_name ? errorClass : clearClass}
                  defaultValue=""
                  value={worker?.father_name}
                  error={workerError?.father_name}
                  type="text"
                  onChange={handleChangeWorker}
                  node={workerFatherName}
                  required
                />
                <Input
                  parentClass="w-1/3"
                  title="محل تولد"
                  name="birth_place"
                  placeholder="محل تولد را وارد کنید"
                  className={workerError?.birth_place ? errorClass : clearClass}
                  defaultValue=""
                  value={worker?.birth_place}
                  error={workerError?.birth_place}
                  type="text"
                  onChange={handleChangeWorker}
                  node={workerBirthPlace}
                  required
                />
                <Input
                  parentClass="w-1/3"
                  title="شماره شناسنامه"
                  name="birth_cerificate_number"
                  placeholder="شماره شناسنامه را وارد کنید"
                  className={workerError?.birth_cerificate_number ? errorClass : clearClass}
                  defaultValue=""
                  value={worker?.birth_cerificate_number}
                  error={workerError?.birth_cerificate_number}
                  type="text"
                  onChange={handleChangeWorker}
                  node={workerBirthCerificateNumber}
                  required
                />
                <Input
                  parentClass="w-1/3"
                  title="سال تولد"
                  name="birth_year"
                  placeholder="سال تولد را وارد کنید"
                  className={workerError?.birth_year ? errorClass : clearClass}
                  defaultValue=""
                  value={worker?.birth_year}
                  error={workerError?.birth_year}
                  type="text"
                  onChange={handleChangeWorker}
                  maxLength={4}
                  node={workerBirthYear}
                  required
                />
                <Input
                  parentClass="w-1/3"
                  name="national_code"
                  title="کد ملی"
                  placeholder="کد ملی را وارد کنید"
                  className={workerError?.national_code ? errorClass : clearClass}
                  defaultValue=""
                  value={worker?.national_code}
                  type="text"
                  onChange={handleChangeWorker}
                  error={workerError?.national_code}
                  maxLength={10}
                  node={workerNationalCode}
                  required
                />
                <Input
                  parentClass="w-1/3"
                  title="شماره موبایل "
                  name="phone_number"
                  placeholder="09112345678"
                  className={workerError?.phone_number ? errorClass : clearClass}
                  defaultValue=""
                  value={worker?.phone_number}
                  type="text"
                  onChange={handleChangeWorker}
                  error={workerError?.phone_number}
                  maxLength={11}
                  node={workerPhoneNumber}
                  required
                />
                <div className="w-1/3 flex justify-end items-center p-2">
                  <Button
                    icon={PlusBlue}
                    title="افزودن کارگر"
                    backgroundColor="#fff"
                    border="border"
                    borderColor="border-primary"
                    color="text-primary"
                    width="50%"
                    btnType="submit"
                    click={() => {
                      if (!worker.first_name) {
                        workerFirstName && workerFirstName.current.focus()
                        setWorkerError({ first_name: 'نام را وارد کنید' })
                      } else if (!worker.last_name) {
                        workerLastName && workerLastName.current.focus()
                        setWorkerError({ last_name: 'نام خانوادگی را وارد کنید' })
                      } else if (!worker.father_name) {
                        workerFatherName && workerFatherName.current.focus()
                        setWorkerError({ father_name: 'نام پدر را وارد کنید' })
                      } else if (!worker.birth_place) {
                        workerBirthPlace && workerBirthPlace.current.focus()
                        setWorkerError({ birth_place: 'محل تولد را وارد کنید' })
                      } else if (!worker.birth_cerificate_number) {
                        workerBirthCerificateNumber && workerBirthCerificateNumber.current.focus()
                        setWorkerError({ birth_cerificate_number: 'شماره شناسنامه را وارد کنید' })
                      } else if (!worker.birth_year) {
                        workerBirthYear && workerBirthYear.current.focus()
                        setWorkerError({ birth_year: 'سال تولد را وارد کنید' })
                      } else if (!worker.national_code || worker.national_code.length !== 10) {
                        workerNationalCode && workerNationalCode.current.focus()
                        setWorkerError({ national_code: 'کد ملی باید 10 رقم باشد' })
                      } else if (!worker.phone_number || worker.phone_number.length !== 11) {
                        workerPhoneNumber && workerPhoneNumber.current.focus()
                        setWorkerError({ phone_number: 'شماره موبایل باید 11 رقم باشد' })
                      } else {
                        setWorkerAddedDataShow((prev) => prev.concat(workerAddedData))
                        setWorkerAvatarUploaded([...workerAvatarUploaded, workerAvatarUpload])
                        setWorkerAvatarUpload('')
                        setWorkerAvatarVal('')
                        setWorkerAvatar('')
                        setWorkerAddedData([])
                        setWorker({
                          first_name: '',
                          last_name: '',
                          father_name: '',
                          birth_place: '',
                          birth_cerificate_number: '',
                          birth_year: '',
                          national_code: '',
                          phone_number: '',
                          avatar: '',
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </SimpleCollapseWrapper>
          {/* vehicle  */}
          <SimpleCollapseWrapper
            wrpperTitle="مشخصات خودرو"
            wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
          >
            <div className="w-full flex flex-row items-center">
              <div className="w-full flex flex-wrap pr-2">
                <Input
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
          {/* personal Vehicle Owner */}
          <SimpleCollapseWrapper
            wrpperTitle="مشخصات مالک خودرو"
            wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
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
          {/* times */}
          <SimpleCollapseWrapper
            wrpperTitle="تقویم و برنامه کاری"
            wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
          >
            {dataTimeShow.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-row justify-between  border-b border-color1 pb-2 mb-4"
                >
                  <div className="w-4/5 flex flex-wrap">
                    <AddedTimeRow
                      classname="w-1/6"
                      title="از ساعت"
                      content={clockFormat(item['start_time'] || '000000')}
                      dir="ltr"
                    />
                    <AddedTimeRow
                      classname="w-1/6"
                      title="تا ساعت"
                      content={clockFormat(item['end_time'] || '000000')}
                      dir="ltr"
                    />
                    <AddedTimeRow
                      classname="w-1/6"
                      title="از روز"
                      content={DAYS_OF_WEEK_NUMBER_TO_PERSIAN[item['from_day']]}
                    />
                    <AddedTimeRow
                      classname="w-1/6"
                      title="تا روز"
                      content={DAYS_OF_WEEK_NUMBER_TO_PERSIAN[item['to_day']]}
                    />
                    <AddedTimeRow
                      classname="w-1/6"
                      title="از ماه"
                      content={NAME_OF_MONTH_NUMBER_TO_PERSIAN[item['from_month']]}
                    />
                    <AddedTimeRow
                      classname="w-1/6"
                      title="تا ماه"
                      content={NAME_OF_MONTH_NUMBER_TO_PERSIAN[item['to_month']]}
                    />
                  </div>
                  <div className="w-1/5 flex justify-end items-center  px-1 pt-5">
                    <Button
                      icon={TrashRed}
                      title="حذف "
                      backgroundColor="#fff"
                      border="border"
                      borderColor="border-error"
                      color="text-error"
                      width="50%"
                      click={() => {
                        setDataTimeShow((old) => old.filter((_, i) => i !== index))
                      }}
                      btnType="button"
                    />
                  </div>
                </div>
              )
            })}
            <div className="flex justify-between items-center">
              <div className="flex w-4/5">
                <div className="w-1/6 p-2 ltr flex flex-col select-clock">
                  <div className="text-color2 text-xs font-yekanbold relative mb-2">
                    از ساعت
                    <span className="absolute bg-error w-1 h-1 rounded-full "></span>
                  </div>
                  <div
                    className={`flex flex-row justify-between  w-full rounded-xlg bg-color5 px-2 py-3 border ${
                      timesError?.start_time ? 'border-error' : 'border-transparent'
                    }`}
                  >
                    <NumberFormat
                      onValueChange={(event) => {
                        const value = event.formattedValue

                        setTimes((prev) => {
                          return { ...prev, start_time: value.replace(/[^0-9]/g, '').trim() }
                        })
                        setTimesError({})
                        addRemoveTimeHandleChange({
                          target: {
                            value,
                            name: 'start_time',
                          },
                        })
                      }}
                      value={times?.start_time}
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
                    {timesError?.start_time}
                  </span>
                </div>
                <div className="w-1/6 p-2 ltr flex flex-col select-clock">
                  <div className="text-color2 text-xs font-yekanbold relative mb-2">
                    تا ساعت
                    <span className="absolute bg-error w-1 h-1 rounded-full "></span>
                  </div>
                  <div
                    className={`flex flex-row justify-between  w-full rounded-xlg bg-color5 px-2 py-3 border ${
                      timesError?.end_time ? 'border-error' : 'border-transparent'
                    }`}
                  >
                    <NumberFormat
                      onValueChange={(event) => {
                        const value = event.formattedValue

                        setTimes((prev) => {
                          return { ...prev, end_time: value.replace(/[^0-9]/g, '').trim() }
                        })
                        setTimesError({})
                        addRemoveTimeHandleChange({
                          target: {
                            value,
                            name: 'end_time',
                          },
                        })
                      }}
                      value={times?.end_time}
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
                    {timesError?.end_time}
                  </span>
                </div>
                <SelectDays
                  title="از روز"
                  width="w-1/6"
                  data={daysData}
                  change={(e) => {
                    const value = e.target.value

                    setTimes((prev) => {
                      return { ...prev, from_day: value }
                    })
                    setTimesError({})
                    addRemoveTimeHandleChange({
                      target: {
                        value,
                        name: 'from_day',
                      },
                    })
                  }}
                  borderColor={timesError?.from_day ? 'border-error' : 'border-transparent'}
                  error={timesError?.from_day}
                  required
                />
                <SelectDays
                  title="تا روز"
                  width="w-1/6"
                  data={daysData}
                  change={(e) => {
                    const value = e.target.value

                    setTimes((prev) => {
                      return { ...prev, to_day: value }
                    })
                    setTimesError({})
                    addRemoveTimeHandleChange({
                      target: {
                        value,
                        name: 'to_day',
                      },
                    })
                  }}
                  borderColor={timesError?.to_day ? 'border-error' : 'border-transparent'}
                  defaultValue={times?.to_day || 0}
                  error={timesError?.to_day}
                  required
                />
                <SelectMonths
                  title="از ماه"
                  width="w-1/6"
                  data={monthData}
                  change={(e) => {
                    const value = e.target.value
                    setTimes((prev) => {
                      return { ...prev, from_month: value }
                    })
                    setTimesError({})
                    addRemoveTimeHandleChange({
                      target: {
                        value,
                        name: 'from_month',
                      },
                    })
                  }}
                  defaultValue={times?.from_month || 0}
                  borderColor={timesError?.from_month ? 'border-error' : 'border-transparent'}
                  error={timesError?.from_month}
                  required
                />
                <SelectMonths
                  title="تا ماه"
                  width="w-1/6"
                  data={monthData}
                  change={(e) => {
                    const value = e.target.value
                    setTimes((prev) => {
                      return { ...prev, to_month: value }
                    })
                    setTimesError({})
                    addRemoveTimeHandleChange({
                      target: {
                        value,
                        name: 'to_month',
                      },
                    })
                  }}
                  defaultValue={times?.to_month || 0}
                  borderColor={timesError?.to_month ? 'border-error' : 'border-transparent'}
                  error={timesError?.to_month}
                  required
                />
              </div>
              <div className="w-1/5 h-full flex items-start justify-end ">
                <Button
                  icon={PlusBlue}
                  title="افزودن "
                  backgroundColor="#fff"
                  border="border"
                  borderColor="border-primary"
                  color="text-primary"
                  width="50%"
                  margin="mt-3 ml-2"
                  padding="px-4 py-2"
                  click={() => {
                    const fromHour = times?.start_time?.substr(0, 2)
                    const fromMinute = times?.start_time?.substr(2, 2)
                    const fromSecond = times?.start_time?.substr(4, 2)

                    const toHour = times?.end_time?.substr(0, 2)
                    const toMinute = times?.end_time?.substr(2, 2)
                    const toSecond = times?.end_time?.substr(2, 2)

                    if (
                      !times.start_time ||
                      times?.start_time.length !== 6 ||
                      fromHour > 23 ||
                      fromMinute > 60 ||
                      fromSecond > 60
                    ) {
                      setTimesError((prev) => {
                        return { start_time: 'ساعت شروع را به درستی وارد کنید' }
                      })
                    } else if (
                      !times.end_time ||
                      times?.end_time.length !== 6 ||
                      toHour > 23 ||
                      toMinute > 60 ||
                      toSecond > 60
                    ) {
                      setTimesError((prev) => {
                        return { end_time: 'ساعت پایان را به درستی وارد کنید' }
                      })
                    } else if (!times.from_day) {
                      setTimesError((prev) => {
                        return { from_day: 'روز شروع را به درستی وارد کنید' }
                      })
                    } else if (!times.to_day) {
                      setTimesError((prev) => {
                        return { to_day: 'روز پایان را به درستی وارد کنید' }
                      })
                    } else if (!times.from_month) {
                      setTimesError((prev) => {
                        return { from_month: 'ماه شروع را به درستی وارد کنید' }
                      })
                    } else if (!times.to_month) {
                      setTimesError((prev) => {
                        return { to_month: 'ماه پایان را به درستی وارد کنید' }
                      })
                    } else {
                      setDataTimeShow((prev) => prev.concat(times))
                      setDataTime([])
                      setTimes({ start_time: '', end_time: '' })
                    }
                  }}
                />
              </div>
            </div>
          </SimpleCollapseWrapper>
          {/* map */}
          <SimpleCollapseWrapper
            wrpperTitle="حوزه کاری راننده"
            wrpperSubtitle="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
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
export default AddDriver
