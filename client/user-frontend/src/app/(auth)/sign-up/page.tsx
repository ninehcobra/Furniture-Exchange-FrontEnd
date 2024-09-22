'use client'
import React, { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

export default function SignUp(): React.ReactNode {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ email: string; password: string; confirmPassword: string }>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newErrors: { email: string; password: string; confirmPassword: string } = {
      email: '',
      password: '',
      confirmPassword: ''
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Vui lòng nhập email hợp lệ'
    }
    if (password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự.'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = ' Mật khẩu và xác nhận mật khẩu không khớp.'
    }

    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      console.log({ email, password })
      // Handle form submission
    }
  }

  const randomString = (): string => Math.random().toString(36).substring(7)

  return (
    <div className='row justify-content-center w-100'>
      <div className='w-100 d-flex align-items-center justify-content-center mb-2'>
        <Image src='/images/logo.png' alt='logo' width={100} height={100} />
      </div>
      <div className='col-lg-9'>
        <h4 className='fw-bold fs-4 mb-0'>Tạo tài khoản ESOLD</h4>
        <span className='d-block mb-4 body-s mt-1'>Đăng ký để bắt đầu sử dụng dịch vụ của chúng tôi</span>

        <div className='row mt-4'>
          <div className='col-12 col-sm-6 mb-3'>
            <button className='btn btn-outline-secondary w-100 body-s'>
              <Image src='/icon/google.png' alt='google' width={16} height={16} className='me-2' />
              Đăng ký với Google
            </button>
          </div>
          <div className='col-12 col-sm-6 mb-3'>
            <button className='btn btn-outline-secondary w-100 body-s'>
              <Image src='/icon/facebook.png' alt='facebook' width={16} height={16} className='me-2' />
              Đăng ký với FB
            </button>
          </div>
        </div>

        <div className='text-center my-4 or-border'>Hoặc đăng ký với</div>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label body-s fw-bold '>
              Email
            </label>
            <input
              type='email'
              className={`form-control py-3 body-m ${errors.email ? 'is-invalid' : ''}`}
              id='email'
              value={email}
              name={`email-${randomString()}`}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Vui lòng nhập email'
            />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label body-s fw-bold'>
              Mật khẩu
            </label>
            <input
              type='password'
              className={`form-control py-3 body-m ${errors.password ? 'is-invalid' : ''}`}
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name={`password-${randomString()}`}
              autoComplete='new-password'
              placeholder='Vui lòng nhập mật khẩu'
            />
            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='form-label body-s fw-bold'>
              Xác nhận mật khẩu
            </label>
            <input
              type='password'
              className={`form-control py-3 body-m ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name={`confirm-password-${randomString()}`}
              autoComplete='new-password'
              placeholder='Vui lòng xác nhận mật khẩu'
            />
            {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
          </div>

          <div className='mb-3 form-check'>
            <input type='checkbox' className='form-check-input' id='agreeTerms' required />
            <label className='form-check-label body-m' htmlFor='agreeTerms'>
              Tôi đồng ý với{' '}
              <Link href='/terms' className='text-primary text-decoration-none'>
                Điều khoản sử dụng
              </Link>{' '}
              và{' '}
              <Link href='/privacy' className='text-primary text-decoration-none'>
                Chính sách bảo mật
              </Link>
            </label>
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-4 py-2'>
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
