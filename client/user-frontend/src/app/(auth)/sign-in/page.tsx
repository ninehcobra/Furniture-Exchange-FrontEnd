'use client'
import React, { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SignIn(): React.ReactNode {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ username: string; password: string }>({ username: '', password: '' })

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newErrors: { username: string; password: string } = { username: '', password: '' }

    if (username.length < 6) {
      newErrors.username = 'Tài khoản phải có ít nhất 6 ký tự.'
    }
    if (!password) {
      newErrors.password = 'Mật khẩu không được để trống.'
    }

    setErrors(newErrors)

    if (!newErrors.username && !newErrors.password) {
      console.log({ username, password })
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
            <label htmlFor='username' className='form-label body-s fw-bold '>
              Email
            </label>
            <input
              type='text'
              className={`form-control py-3 body-m ${errors.username ? 'is-invalid' : ''}`}
              id='username'
              value={username}
              name={`user-id-${randomString()}`}
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Vui lòng nhập email'
            />
            {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
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
              name={`password${randomString()}`}
              autoComplete='new-password'
              placeholder='Vui lòng nhập mật khẩu'
            />
            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
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

          <button onClick={() => router.push('/home')} type='submit' className='btn btn-primary w-100 mt-5 py-2'>
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
