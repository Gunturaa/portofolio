import './globals.css'

export const metadata = {
  title: 'Portfolio - Creative Developer',
  description: 'Portfolio website built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}