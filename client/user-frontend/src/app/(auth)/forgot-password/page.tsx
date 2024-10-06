'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ForgotPassword(): React.ReactNode {
  const [email, setEmail] = useState<string>('')
  const [errors, setErrors] = useState<{ email: string }>({ email: '' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newErrors: { email: string } = { email: '' }

    if (!email) {
      newErrors.email = 'Email không được để trống.'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Vui lòng nhập email hợp lệ.'
    }

    setErrors(newErrors)

    if (!newErrors.email) {
      // Handle password reset request
    }
  }

  return (
    <div className='row justify-content-center w-100'>
      <div className='w-100 d-flex align-items-center justify-content-center mb-2'>
        <Image src='/images/logo.png' alt='logo' width={100} height={100} />
      </div>
      <div className='col-lg-9'>
        <h4 className='fw-bold fs-4 mb-0'>Quên mật khẩu</h4>
        <span className='d-block mb-4 body-s mt-1'>Nhập email của bạn để đặt lại mật khẩu</span>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label body-s fw-bold'>
              Email
            </label>
            <input
              type='email'
              className={`form-control py-3 body-m ${errors.email ? 'is-invalid' : ''}`}
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Vui lòng nhập email'
            />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-4 py-2'>
            Gửi yêu cầu đặt lại mật khẩu
          </button>
        </form>

        <div className='mt-4 text-center'>
          <Link href='/sign-in' className='text-primary text-decoration-none'>
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}
