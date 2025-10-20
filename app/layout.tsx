import type { Metadata } from 'next'
import './globals.css'
import StatsigProvider from '@/components/StatsigProvider';
import StatsigPlugins from '@/components/StatsigPlugins';
import ConsentBar from '@/components/ConsentBar';

export const metadata: Metadata = {
  title: 'DentalConnect',
  description: 'Demo Statsig with a two-sided marketplace',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StatsigProvider>
          <StatsigPlugins />
          {children}
          <ConsentBar />
        </StatsigProvider>
      </body>
    </html>
  )
}
