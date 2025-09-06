import type { Metadata } from 'next'
import './globals.css'
import MyStatsig from "./statsig";
import { generateBootstrapValues } from "./statsig-backend";

export const metadata: Metadata = {
  title: 'DentalConnect',
  description: 'Demo Statsig with a two-sided marketplace',
  generator: 'v0.dev',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const bootstrapValues = await generateBootstrapValues();

  return (
    <html lang="en">
      <body>
        <MyStatsig values={bootstrapValues}>
          {children}
        </MyStatsig>
      </body>
    </html>
  )
}
