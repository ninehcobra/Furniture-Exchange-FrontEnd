'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRegisterMutation } from '@/services/auth.service'
import { IRegisterPayload } from '@/types/auth'
import { ToastService } from '@/services/toast.service'
import { HandleErrorService } from '@/services/handle-error.service'
import { IErrorResponse } from '@/types/error'

export default function SignUp(): React.ReactNode {
  const [registerPayload, setRegisterPayload] = useState<IRegisterPayload>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    sex: ''
  })
  const [payloadErrors, setPayloadErrors] = useState<Partial<IRegisterPayload>>({})
  const [isPayloadValid, setIsPayloadValid] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter()
  const toastService = useMemo<ToastService>(() => new ToastService(), [])
  const handleErrorService = useMemo<HandleErrorService>(() => new HandleErrorService(), [])

  const [
    register,
    { data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError }
  ] = useRegisterMutation()

  const handleOnChangeRegisterPayload = (value: string, type: keyof IRegisterPayload): void => {
    setRegisterPayload((prev) => {
      const updatedPayload = { ...prev, [type]: value }
      const newErrors = validatePayload(updatedPayload)
      setPayloadErrors(newErrors)
      setIsPayloadValid(Object.keys(newErrors).length === 0)
      return updatedPayload
    })
  }

  const validatePayload = useCallback<(payload: IRegisterPayload) => Partial<IRegisterPayload>>(
    (payload: IRegisterPayload): Partial<IRegisterPayload> => {
      const errors: Partial<IRegisterPayload> = {}

      if (!/\S+@\S+\.\S+/.test(payload.email)) {
        errors.email = 'Vui lòng nhập email hợp lệ'
      }
      if (payload.password.length < 8) {
        errors.password = 'Mật khẩu phải có ít nhất 8 ký tự.'
      }
      if (!payload.firstName.trim()) {
        errors.firstName = 'Vui lòng nhập họ'
      }
      if (!payload.lastName.trim()) {
        errors.lastName = 'Vui lòng nhập tên'
      }
      if (!/^\d{10}$/.test(payload.phoneNumber)) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại hợp lệ'
      }
      if (!payload.sex) {
        errors.sex = 'Vui lòng chọn giới tính'
      }

      return errors
    },
    []
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isPayloadValid) {
      register(registerPayload)
    }
  }

  useEffect(() => {
    if (isRegisterSuccess) {
      toastService.success('Đăng ký thành công')
      const url = new URL(registerData.url)
      const q = url.searchParams.get('q')
      if (q) {
        router.push(`/verify-email?q=${q}`)
      }
    }
    if (isRegisterError) {
      handleErrorService.handleHttpError(registerError as IErrorResponse)
    }
  }, [isRegisterError, isRegisterSuccess])

  useEffect(() => {
    const errors = validatePayload(registerPayload)
    setPayloadErrors(errors)
    setIsPayloadValid(Object.keys(errors).length === 0)
  }, [])

  const randomString = (): string => Math.random().toString(36).substring(7)

  return (
    <div className='row justify-content-center w-100'>
      <div className='col-lg-9'>
        <h4 className='fw-bold fs-4 mb-0'>Tạo tài khoản ESOLD</h4>
        <span className='d-block mb-4 body-s mt-1'>Đăng ký để bắt đầu sử dụng dịch vụ của chúng tôi</span>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label body-s fw-bold'>
              Email
            </label>
            <input
              type='email'
              className={`form-control py-3 body-m ${payloadErrors.email ? 'is-invalid' : ''}`}
              id='email'
              value={registerPayload.email}
              name={`email-${randomString()}`}
              autoComplete='off'
              onChange={(e) => handleOnChangeRegisterPayload(e.target.value, 'email')}
              placeholder='Vui lòng nhập email'
            />
            {payloadErrors.email && <div className='invalid-feedback'>{payloadErrors.email}</div>}
          </div>

          <div className='mb-3 position-relative'>
            <label htmlFor='password' className='form-label body-s fw-bold'>
              Mật khẩu
            </label>
            <div className='input-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control py-3 body-m ${payloadErrors.password ? 'is-invalid' : ''}`}
                id='password'
                value={registerPayload.password}
                onChange={(e) => handleOnChangeRegisterPayload(e.target.value, 'password')}
                name={`password-${randomString()}`}
                autoComplete='new-password'
                placeholder='Vui lòng nhập mật khẩu'
              />
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {payloadErrors.password && <div className='invalid-feedback'>{payloadErrors.password}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='firstName' className='form-label body-s fw-bold'>
              Họ
            </label>
            <input
              type='text'
              className={`form-control py-3 body-m ${payloadErrors.firstName ? 'is-invalid' : ''}`}
              id='firstName'
              value={registerPayload.firstName}
              onChange={(e) => handleOnChangeRegisterPayload(e.target.value, 'firstName')}
              placeholder='Vui lòng nhập họ'
            />
            {payloadErrors.firstName && <div className='invalid-feedback'>{payloadErrors.firstName}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='lastName' className='form-label body-s fw-bold'>
              Tên
            </label>
            <input
              type='text'
              className={`form-control py-3 body-m ${payloadErrors.lastName ? 'is-invalid' : ''}`}
              id='lastName'
              value={registerPayload.lastName}
              onChange={(e) => handleOnChangeRegisterPayload(e.target.value, 'lastName')}
              placeholder='Vui lòng nhập tên'
            />
            {payloadErrors.lastName && <div className='invalid-feedback'>{payloadErrors.lastName}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='phoneNumber' className='form-label body-s fw-bold'>
              Số điện thoại
            </label>
            <input
              type='tel'
              className={`form-control py-3 body-m ${payloadErrors.phoneNumber ? 'is-invalid' : ''}`}
              id='phoneNumber'
              value={registerPayload.phoneNumber}
              onChange={(e) => handleOnChangeRegisterPayload(e.target.value, 'phoneNumber')}
              placeholder='Vui lòng nhập số điện thoại'
            />
            {payloadErrors.phoneNumber && <div className='invalid-feedback'>{payloadErrors.phoneNumber}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='sex' className='form-label body-s fw-bold'>
              Giới tính
            </label>
            <select
              className={`form-select py-3 body-m ${payloadErrors.sex ? 'is-invalid' : ''}`}
              id='sex'
              value={registerPayload.sex}
              onChange={(e) => handleOnChangeRegisterPayload(e.target.value, 'sex')}
            >
              <option value=''>Chọn giới tính</option>
              <option value='male'>Nam</option>
              <option value='female'>Nữ</option>
              <option value='other'>Khác</option>
            </select>
            {payloadErrors.sex && <div className='invalid-feedback'>{payloadErrors.sex}</div>}
          </div>

          <button disabled={!isPayloadValid} type='submit' className='btn btn-primary w-100 mt-4 py-2'>
            Đăng ký
          </button>
        </form>

        <div className='mt-4 text-center'>
          Đã có tài khoản ESOLD?{' '}
          <Link href='/sign-in' className='text-primary text-decoration-none'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}
