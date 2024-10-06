/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { useEffect } from 'react'

export const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive
}: {
  dataAdSlot: string
  dataAdFormat: string
  dataFullWidthResponsive: boolean
}): React.ReactNode => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block' }}
      data-ad-client='ca-pub-6214420931907905'
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    >
      {' '}
    </ins>
  )
}
