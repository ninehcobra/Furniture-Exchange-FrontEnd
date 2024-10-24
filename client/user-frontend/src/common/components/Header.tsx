/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import './header.scss'
import Link from 'next/link'

import { useGetUserProfileQuery } from '@/services/user.service'
import { useCookies } from 'react-cookie'
import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Dropdown, Menu } from 'antd'

export default function Header(): ReactNode {
  const [cookies] = useCookies(['access-token'])
  const accessToken = cookies['access-token']

  const pathname = usePathname()

  const {
    data: userProfile,
    isSuccess: isUserProfileSuccess,
    error: userProfileError,
    isLoading: userProfileLoading,
    refetch: refetchUserProfile
  } = useGetUserProfileQuery(undefined, {
    skip: !accessToken
  })

  if (userProfileError) {
    console.error('Error fetching user profile:', userProfileError)
    return <div>Error loading header data</div>
  }

  if (userProfileLoading) {
    return <div>Loading...</div>
  }

  const handleLogout = (): void => {}

  const menu = (
    <Menu>
      <Menu.Item key='1'>
        <Link href='/profile'>Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item key='2' onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='header-container'>
      {/* Header */}
      <div className='header-wrapper container'>
        <div className='row align-items-center pt-1'>
          <div className='col-md-6'>
            <div className='d-flex'>
              <div className='body-xs header-text-btn me-3'>Kênh Người bán</div>
              <div className='body-xs header-text-btn me-3'>Trở thành Người bán ESOLD</div>
              <div className='body-xs header-text-btn'>
                Kết nối
                <i className='fa-brands fa-facebook ps-1'></i>
                <i className='fa-brands fa-square-instagram ps-1'></i>
              </div>
            </div>
          </div>
          <div className='col-md-6 text-neutral-light-5'>
            <div className='d-flex justify-content-end align-items-center'>
              <div className='body-xs me-3 header-btn'>
                <i className='fa-regular fa-bell me-1'></i>Thông báo
              </div>
              <div className='body-xs me-3 header-btn'>
                <i className='fa-regular fa-circle-question me-1'></i>Hỗ trợ
              </div>

              <div>
                {userProfile ? (
                  <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
                    <div className='body-xs d-flex align-items-center header-btn'>
                      <div className='rounded-circle overflow-hidden me-2' style={{ width: '20px', height: '20px' }}>
                        <img
                          src={userProfile.image_url || '/images/profile/user-1.jpg'}
                          alt='avatar'
                          width={20}
                          height={20}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div>{`${userProfile.first_name} ${userProfile.last_name}`}</div>
                    </div>
                  </Dropdown>
                ) : (
                  <Link href='/sign-in' className='body-xs header-btn text-neutral-light-5'>
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Search bar */}
        <div className='search-bar-wrapper mt-3'>
          <div className='row align-items-center'>
            <div className='col-md-1 logo-btn'>
              <Link href={'/'}>
                <img src='/images/logo-light.png' alt='Logo' height={70} />
              </Link>
            </div>
            <div className='col-md-10 ps-5 body-m'>
              <div className='input-group'>
                <input type='text' className='form-control p-2 body-m' placeholder='Tìm kiếm sản phẩm...' />
                <button className='btn btn-outline-primary ' type='button'>
                  <i className='fa-solid fa-search text-neutral-light-5'></i>
                </button>
              </div>
              <div className='mt-2 body-xs text-neutral-light-5 d-flex align-items-center'>
                <div className='pe-3 recommend-product'>Tai nghe Bose QuietComfort Ultra</div>
                <div className='pe-3 recommend-product'>Tecno Pova 5</div>
                <div className='pe-3 recommend-product'>Bàn phím cơ Yuki</div>
                <div className='pe-3 recommend-product'>Mặt nạ anh bưởi</div>
                <div className='pe-3 recommend-product'>Moondrop</div>
                <div className='pe-3 recommend-product'>Iphone 15</div>
              </div>
            </div>
          </div>
        </div>
        {/* End Search bar */}
      </div>
    </div>
  )
}
