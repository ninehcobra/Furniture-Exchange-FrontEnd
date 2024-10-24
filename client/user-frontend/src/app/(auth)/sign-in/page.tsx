/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/services/auth.service'
import { ILoginPayload } from '@/types/auth'
import { ToastService } from '@/services/toast.service'
import { HandleErrorService } from '@/services/handle-error.service'
import { IErrorResponse } from '@/types/error'
import { setCookieFromClient } from '@/types/cookie'
import { useCookies } from 'react-cookie'

export default function SignIn(): React.ReactNode {
  const [loginPayload, setLoginPayload] = useState<ILoginPayload>({ email: '', password: '' })
  const [payloadErrors, setPayloadErrors] = useState<ILoginPayload>({ email: '', password: '' })

  const router = useRouter()

  const toastService = useMemo<ToastService>(() => new ToastService(), [])
  const handleErrorService = useMemo<HandleErrorService>(() => new HandleErrorService(), [])

  const [login, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError }] =
    useLoginMutation()

  const validatePayload = useCallback<(payload: ILoginPayload) => ILoginPayload>(
    (_payload: ILoginPayload): ILoginPayload => {
      const errors: ILoginPayload = { email: '', password: '' }
      if (_payload.email.length < 6) {
        errors.email = 'Tài khoản phải có ít nhất 6 ký tự.'
      }
      if (_payload.password === '') {
        errors.password = 'Mật khẩu không được để trống.'
      }
      return errors
    },
    []
  )

  const handleOnChangeLoginPayload = (value: string, type: keyof ILoginPayload): void => {
    setLoginPayload((prev) => {
      const updatedPayload = { ...prev, [type]: value }
      const newErrors = validatePayload(updatedPayload)
      setPayloadErrors(newErrors)
      return updatedPayload
    })
  }

  const isPayloadValid = useMemo<boolean>(
    () =>
      loginPayload.email.length >= 6 && loginPayload.password !== '' && !payloadErrors.email && !payloadErrors.password,
    [loginPayload, payloadErrors]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isPayloadValid) {
      login(loginPayload)
    }
  }

  const [cookies, setCookie, removeCookie] = useCookies()

  useEffect(() => {
    if (isLoginSuccess) {
      if (loginData?.accessToken && loginData?.refreshToken) {
        toastService.success('Đăng nhập thành công')

        setCookie('access-token', loginData.accessToken, {
          path: '/',
          sameSite: 'strict',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        setCookie('refresh-token', loginData.refreshToken, {
          path: '/',
          sameSite: 'strict',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        router.push('/home')
      } else if (loginData?.message && loginData?.url) {
        toastService.error(loginData.message)
        router.push(loginData.url)
      } else {
        toastService.error('Đăng nhập thất bại')
      }
    }
    if (isLoginError && loginError) {
      handleErrorService.handleHttpError(loginError as IErrorResponse)
    }
  }, [isLoginError, isLoginSuccess, loginData, loginError, router, toastService, handleErrorService])
  const randomString = (): string => Math.random().toString(36).substring(7)

  return (
    <div className='row justify-content-center w-100'>
      <div className='w-100 d-flex align-items-center justify-content-center mb-2'>
        <Image src='/images/logo.png' alt='logo' width={100} height={100} />
      </div>
      <div className='col-lg-9'>
        <h4 className='fw-bold fs-4 mb-0'>Chào mừng bạn đã đến ESOLD</h4>
        <span className='d-block mb-4 body-s mt-1'>Đăng nhập để sử dụng dịch vụ của chúng tôi</span>

        <div className='row mt-4'>
          <div className='col-12 col-sm-6 mb-3'>
            <button className='btn btn-outline-secondary w-100 body-s'>
              <Image src='/icon/google.png' alt='google' width={16} height={16} className='me-2' />
              Đăng nhập với Google
            </button>
          </div>
          <div className='col-12 col-sm-6 mb-3'>
            <button className='btn btn-outline-secondary w-100 body-s'>
              <Image src='/icon/facebook.png' alt='facebook' width={16} height={16} className='me-2' />
              Đăng nhập với Facebook
            </button>
          </div>
        </div>

        <div className='text-center my-4 or-border'>Hoặc đăng nhập với</div>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label body-s fw-bold '>
              Email
            </label>
            <input
              type='text'
              className={`form-control py-3 body-m ${payloadErrors.email ? 'is-invalid' : ''}`}
              id='email'
              value={loginPayload.email}
              name={`user-id-${randomString()}`}
              autoComplete='off'
              onChange={(e) => handleOnChangeLoginPayload(e.target.value, 'email')}
              placeholder='Vui lòng nhập email'
            />
            {payloadErrors.email && <div className='invalid-feedback'>{payloadErrors.email}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label body-s fw-bold'>
              Mật khẩu
            </label>
            <input
              type='password'
              className={`form-control py-3 body-m ${payloadErrors.password ? 'is-invalid' : ''}`}
              id='password'
              value={loginPayload.password}
              onChange={(e) => handleOnChangeLoginPayload(e.target.value, 'password')}
              name={`password${randomString()}`}
              autoComplete='new-password'
              placeholder='Vui lòng nhập mật khẩu'
            />
            {payloadErrors.password && <div className='invalid-feedback'>{payloadErrors.password}</div>}
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <div className='mb-3 form-check'>
              <input type='checkbox' className='form-check-input' id='rememberDevice' />
              <label className='form-check-label body-m' htmlFor='rememberDevice'>
                Nhớ tài khoản
              </label>
            </div>

            <div className='mb-3 text-end'>
              <Link href='/forgot-password' className='text-primary text-decoration-none body-m'>
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <button
            disabled={!isPayloadValid}
            onClick={() => router.push('/home')}
            type='submit'
            className='btn btn-primary w-100 mt-5 py-2'
          >
            Đăng nhập
          </button>
        </form>

        <div className='mt-4 text-center'>
          Lần đầu đến với ESOLD?{' '}
          <Link href='/sign-up' className='text-primary text-decoration-none'>
            Tạo tài khoản
          </Link>
        </div>
      </div>
    </div>
  )
}
