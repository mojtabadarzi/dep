import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

//redux
import { useDispatch } from 'react-redux'
import { LoginAction } from '../action/user'

// components
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import MessageBox from 'src/components/MessageBox'

// const
import { baseURL, LOGIN } from 'src/config'
import { handleError } from '../utils/helpers'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [messageClass, setMessageClass] = useState('message-hidden')
  const [message, setMessage] = useState('message-hidden')

  const closeMessageClass = () => {
    setMessageClass('message-hidden')
  }

  const errorClass =
    'rounded-xlg border border-error  bg-color5 px-2 py-3 text-color-4 text-sm font-yekanlight focus:bg-white'
  const clearClass =
    'rounded-xlg border border-color5 bg-color5 px-2 py-3 text-color-4 text-sm font-yekanlight focus:bg-white'

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => {
          setLoading(true)
          closeMessageClass()
          const data = {
            username: values.username,
            password: values.password,
          }
          axios
            .post(`${baseURL}${LOGIN}`, data)
            .then((response) => {
              console.log('response : ', response)
              history.replace('/live-report')
              setLoading(false)
              dispatch(LoginAction(response.data))
            })
            .catch((error) => {
              console.log('error : ', error, error.response.data[0])
              setLoading(false)
              console.log('error.response ___ ', error?.response)

              if (error.response) {
                const { status = '' } = error.response
                const msg = error.response.data?.non_field_errors[0] || ''
                setMessage(handleError(status, msg))
                setMessageClass('message-show')
              } else {
                setMessage('دسترسی به اینترنت را بررسی کنید')
                setMessageClass('message-show')
              }
            })
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('نام کاربری را وارد نمایید'),
          password: Yup.string().required('رمز عبور را وارد نمایید'),
        })}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props
          const handleKeyPressLogin = (target) => {
            if (target.charCode === 13) {
              handleSubmit()
            }
          }
          return (
            <form onSubmit={handleSubmit}>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center">
                <div className="login bg-white rounded-lg p-8 ">
                  <div className="font-base text-color2 mb-4 font-yekanbold text-center">
                    برای ورود نام کاربری و کلمه عبور را وارد کنید
                  </div>
                  <Input
                    parentClass="mb-2"
                    title="نام کاربری"
                    placeholder="نام کاربری را وارد کنید"
                    className={touched.username && errors.username ? errorClass : clearClass}
                    id="username"
                    padding=""
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPressLogin}
                    error={errors.username && touched.username && errors.username}
                  />
                  <Input
                    parentClass="mb-2"
                    title="کلمه عبور"
                    placeholder="کلمه عبور را وارد کنید"
                    className={touched.password && errors.password ? errorClass : clearClass}
                    id="password"
                    padding=""
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPressLogin}
                    error={errors.password && touched.password && errors.password}
                  />
                  <Button
                    title="ورود"
                    backgroundColor="#1641ff"
                    border="border-0"
                    color="text-white"
                    width="100%"
                    disabled={loading}
                    height="48px"
                    margin="mt-4"
                    btnType="submit"
                    font="text-base"
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          )
        }}
      </Formik>

      <MessageBox
        messageClass={messageClass}
        message={message}
        closeMessageClass={closeMessageClass}
      />
    </div>
  )
}

export default Login
