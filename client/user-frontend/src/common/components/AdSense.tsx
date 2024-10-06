import Script from 'next/script'

export const AdSense = ({ pId }: { pId: string }): React.ReactNode => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin='anonymous'
      strategy='afterInteractive'
    ></Script>
  )
}
