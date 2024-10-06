import React from 'react'
import './footer.scss'
import Image from 'next/image'

export default function Footer({ isSecondary = false }: { isSecondary?: boolean }): React.ReactNode {
  return (
    <footer className={`footer  ${isSecondary ? 'secondary-footer' : ''}`}>
      <div className='container'>
        <div className='row top-content'>
          <div className='col-md-3'>
            <h5>Chăm sóc khách hàng</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='#'>Trung tâm trợ giúp</a>
              </li>
              <li>
                <a href='#'>ESOLD Blog</a>
              </li>
              <li>
                <a href='#'>ESOLD Mall</a>
              </li>
              <li>
                <a href='#'>Hướng dẫn mua hàng</a>
              </li>
              <li>
                <a href='#'>Hướng dẫn bán hàng</a>
              </li>
            </ul>
          </div>
          <div className='col-md-3'>
            <h5>Về ESOLD</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='#'>Giới thiệu về ESOLD Việt Nam</a>
              </li>
              <li>
                <a href='#'>Tuyển dụng</a>
              </li>
              <li>
                <a href='#'>Điều Khoản Shopee</a>
              </li>
              <li>
                <a href='#'>Chính sách bảo mật</a>
              </li>
              <li>
                <a href='#'>Chính Hãng</a>
              </li>
            </ul>
          </div>
          <div className='col-md-3'>
            <h5>Thanh toán</h5>
            <div className='payment-methods'>
              <div className='payment-item px-2 py-1'>
                <Image src='/images/payment/visa.png' alt='Payment Methods' width={40} height={40} />
              </div>
              <div className='payment-item px-2 py-1'>
                <Image src='/images/payment/mastercard.png' alt='Payment Methods' width={40} height={40} />
              </div>
              <div className='payment-item px-2 py-1'>
                <Image src='/images/payment/paypal.png' alt='Payment Methods' width={40} height={40} />
              </div>
            </div>
            <h5>Đơn vị vận chuyển</h5>
            <div className='payment-methods'>
              <div className='payment-item px-2 py-1'>
                <Image src='/images/delivery/ghn.png' alt='Payment Methods' width={40} height={40} />
              </div>
              <div className='payment-item px-2 py-1'>
                <Image src='/images/delivery/viettel.png' alt='Payment Methods' width={40} height={40} />
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <h5>Theo dõi chúng tôi trên</h5>
            <ul className='list-unstyled social-links'>
              <li>
                <a href='#'>
                  <i className='fab fa-facebook'></i> Facebook
                </a>
              </li>
              <li>
                <a href='#'>
                  <i className='fab fa-instagram'></i> Instagram
                </a>
              </li>
              <li>
                <a href='#'>
                  <i className='fab fa-linkedin'></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='row mt-4 bottom-content'>
          <div className='col-12'>
            <p className='text-center'>© 2024 ESOLD. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
