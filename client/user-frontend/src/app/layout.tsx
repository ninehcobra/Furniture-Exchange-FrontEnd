'use client'

import './globals.scss'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { theme } from '@/core/configs/theme/theme'
import { Poppins } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AdSense } from '@/common/components/AdSense'
import Script from 'next/script'
import GoogleAdUnitClient from 'nextjs13_google_adsense/dist/esm/GoogleAdUnitClient'
const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang='en'>
      <head>
        <title>ESOLD</title>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <meta name='description' content='App bán đồ nội thất cũ' />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossOrigin='anonymous'
        />
        <script src='https://kit.fontawesome.com/03244eb91d.js' crossOrigin='anonymous' async></script>
        <Script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6214420931907905'
          crossOrigin='anonymous'
          strategy='lazyOnload'
        />
      </head>
      <Provider store={store}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <body className={poppins.className}>{children}</body>
          </ConfigProvider>
        </AntdRegistry>
        <ToastContainer />
      </Provider>
    </html>
  )
}
