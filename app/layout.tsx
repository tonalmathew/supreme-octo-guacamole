import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'todo',
  description: 'todo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="night" lang="en">
      <body className={`${inter.className} flex justify-center`}>{children}</body>
    </html>
  )
}
