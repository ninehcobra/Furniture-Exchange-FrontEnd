'use client'
import React, { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

export default function SignIn(): React.ReactNode {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ username: string; password: string }>({ username: '', password: '' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newErrors: { username: string; password: string } = { username: '', password: '' }

    if (username.length < 6) {
      newErrors.username = 'Username should be at least 6 characters.'
    }
    if (!password) {
      newErrors.password = 'Password is required.'
    }

    setErrors(newErrors)

    if (!newErrors.username && !newErrors.password) {
      console.log({ username, password })
      // Handle form submission
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        <div className='col-lg-7 col-xl-8 bg-gradient p-0'>
          <div className='p-4 h-100'>
            <Link href='/dashboards/dashboard1'>
              <Image src='/assets/images/logos/dark-logo.svg' alt='logo' width={150} height={50} className='m-2' />
            </Link>
            <div className='d-none d-lg-flex align-items-center justify-content-center h-75'>
              <Image src='/assets/images/backgrounds/login-bg.svg' alt='login' width={500} height={500} />
            </div>
          </div>
        </div>
        <div className='col-lg-5 col-xl-4 p-0'>
          <div className='p-4 d-flex align-items-center justify-content-center h-100'>
            <div className='row justify-content-center w-100'>
              <div className='col-lg-9'>
                <h4 className='fw-bold fs-4 mb-0'>Welcome to Modernize</h4>
                <span className='d-block mb-4'>Your Admin Dashboard</span>

                <div className='row mt-4'>
                  <div className='col-12 col-sm-6 mb-3'>
                    <button className='btn btn-outline-secondary w-100'>
                      <Image
                        src='/assets/images/svgs/google-icon.svg'
                        alt='google'
                        width={16}
                        height={16}
                        className='me-2'
                      />
                      Sign in with Google
                    </button>
                  </div>
                  <div className='col-12 col-sm-6 mb-3'>
                    <button className='btn btn-outline-secondary w-100'>
                      <Image
                        src='/assets/images/svgs/facebook-icon.svg'
                        alt='facebook'
                        width={40}
                        height={40}
                        className='me-2'
                      />
                      Sign in with FB
                    </button>
                  </div>
                </div>

                <div className='text-center my-4'>or sign in with</div>

                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='username' className='form-label'>
                      Username
                    </label>
                    <input
                      type='text'
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      id='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input
                      type='password'
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                  </div>

                  <div className='mb-3 form-check'>
                    <input type='checkbox' className='form-check-input' id='rememberDevice' />
                    <label className='form-check-label' htmlFor='rememberDevice'>
                      Remember this Device
                    </label>
                  </div>

                  <div className='mb-3 text-end'>
                    <Link href='/authentication/side-forgot-pwd' className='text-primary text-decoration-none'>
                      Forgot Password?
                    </Link>
                  </div>

                  <button type='submit' className='btn btn-primary w-100'>
                    Sign In
                  </button>
                </form>

                <div className='mt-4 text-center'>
                  New to Modernize?{' '}
                  <Link href='/authentication/side-register' className='text-primary text-decoration-none'>
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
