'use client'

import React, { useEffect, useMemo, useCallback, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useVerifyEmailMutation } from '@/services/auth.service'
import { IVerifyEmailPayload } from '@/types/auth'
import { ToastService } from '@/services/toast.service'
import { HandleErrorService } from '@/services/handle-error.service'
import { IErrorResponse } from '@/types/error'

export default function VerifyEmail(): React.ReactNode {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

function VerifyEmailContent(): React.ReactNode {
  const [otp, setOtp] = useState<string[]>(Array(5).fill(''))

  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''

  const toastService = useMemo<ToastService>(() => new ToastService(), [])
  const handleErrorService = useMemo<HandleErrorService>(() => new HandleErrorService(), [])

  const [verifyEmail, { isSuccess: isVerifySuccess, isError: isVerifyError, error: verifyError }] =
    useVerifyEmailMutation()

  const handleOtpChange = useCallback<(index: number, value: string) => void>((index: number, value: string): void => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      setOtp((prev) => {
        const newOtp = [...prev]
        newOtp[index] = value
        return newOtp
      })

      if (value !== '' && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
    }
  }, [])

  const isPayloadValid = useMemo<boolean>(() => otp.every((digit) => digit !== '') && q !== '', [otp, q])

  const handleSubmit = useCallback<(e: React.FormEvent<HTMLFormElement>) => void>(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      if (isPayloadValid) {
        const payload: IVerifyEmailPayload = {
          q,
          otp: otp.join('')
        }
        verifyEmail(payload)
      }
    },
    [isPayloadValid, q, otp, verifyEmail]
  )

  useEffect(() => {
    if (q === '') {
      router.push('/sign-up')
    }
  }, [q, router])

  useEffect(() => {
    if (isVerifySuccess) {
      toastService.success('Email verified successfully')
      router.push('/sign-in')
    }
    if (isVerifyError) {
      handleErrorService.handleHttpError(verifyError as IErrorResponse)
    }
  }, [isVerifyError, isVerifySuccess, router, toastService, handleErrorService, verifyError])

  return (
    <div className='row justify-content-center w-100'>
      <div className='col-lg-9'>
        <h4 className='fw-bold fs-4 mb-0'>Xác thực tài khoản</h4>
        <span className='d-block mb-4 body-s mt-1'>Nhập mã OTP đã được gửi đến mail của bạn</span>

        <form onSubmit={handleSubmit}>
          <div className='mb-3 d-flex justify-content-between'>
            {otp.map((digit, index) => (
              <input
                key={index}
                type='text'
                id={`otp-${index}`}
                className='form-control text-center'
                style={{ width: '3rem' }}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>

          <button disabled={!isPayloadValid} type='submit' className='btn btn-primary w-100 mt-4 py-2'>
            Verify Email
          </button>
        </form>
      </div>
    </div>
  )
}
