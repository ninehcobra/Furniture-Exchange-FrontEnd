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
const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossOrigin='anonymous'
        />
        <script src='https://kit.fontawesome.com/03244eb91d.js' crossOrigin='anonymous' async></script>
        <AdSense pId='ca-pub-6214420931907905' />
        {/* <script src='https://ninehcobra.github.io/chat-template/chat-widget.js' async></script> */}
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
