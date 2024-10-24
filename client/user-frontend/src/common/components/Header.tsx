/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import Image from 'next/image'
import './header.scss'
import Link from 'next/link'
import { Dropdown, List, Avatar, Badge } from 'antd'
import type { MenuProps } from 'antd'
import { useGetConversationQuery } from '@/services/chat.service'
import { useGetUserProfileQuery } from '@/services/user.service'

export default function Header(): JSX.Element {
  const accessToken = ''
  const { data: userProfile, isSuccess: isUserProfileSuccess } = useGetUserProfileQuery()
  const { data: conversations, isSuccess } = useGetConversationQuery(undefined, {
    skip: !accessToken
  })

  const notificationMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <List
            itemLayout='horizontal'
            dataSource={conversations}
            renderItem={(item) => (
              <List.Item className='p-3 hover:bg-gray-100 chat-noti-item '>
                <List.Item.Meta
                  avatar={<Avatar src={item.other.image_url} size={48} />}
                  title={
                    <a href='#' className='font-bold'>
                      {`${item.other.first_name} ${item.other.last_name}`}
                    </a>
                  }
                  description={<div className='text-sm text-gray-600'>{item.last_message.content}</div>}
                />
              </List.Item>
            )}
          />
          <div className='text-center p-2'>
            <Link href='/messages' className='text-primary hover:text-primary-dark'>
              Xem tất cả
            </Link>
          </div>
        </>
      )
    }
  ]

  const unreadCount = conversations?.filter((conv) => !conv.last_message.isRead).length || 0

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
              {isUserProfileSuccess && userProfile ? (
                <div className='body-xs d-flex align-items-center header-btn'>
                  <div className='rounded-circle overflow-hidden me-2' style={{ width: '20px', height: '20px' }}>
                    <Image
                      src={userProfile.image_url || '/images/profile/user-1.jpg'}
                      alt='avatar'
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>{`${userProfile.first_name} ${userProfile.last_name}`}</div>
                </div>
              ) : (
                <Link href='/sign-in' className='body-xs header-btn fw-500 text-neutral-light-5'>
                  Đăng nhập
                </Link>
              )}
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
            <div className='col-md-1 text-end text-neutral-light-5 d-flex'>
              {accessToken && isSuccess && (
                <Dropdown
                  menu={{ items: notificationMenu }}
                  placement='bottomRight'
                  trigger={['click']}
                  overlayStyle={{ width: '400px' }}
                >
                  <Badge offset={[-15, 5]} count={unreadCount} overflowCount={99}>
                    <i
                      className='fa-solid fa-bell me-3 heading-h3 cart-btn'
                      style={{ fontSize: '24px', color: 'white' }}
                    ></i>
                  </Badge>
                </Dropdown>
              )}
              <i className='fa-solid fa-shopping-cart me-2 heading-h3 cart-btn'></i>
            </div>
          </div>
        </div>
        {/* End Searh bar */}
      </div>
    </div>
  )
}
