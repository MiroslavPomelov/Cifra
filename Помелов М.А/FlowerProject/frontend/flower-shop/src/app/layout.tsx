import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flower Shop - Мир прекрасных цветов',
  description: 'Добро пожаловать в мир прекрасных цветов. Заказывайте свежие букеты с доставкой по всей России.',
  keywords: 'цветы, букеты, доставка цветов, цветочный магазин, розы, тюльпаны',
  authors: [{ name: 'Flower Shop Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Flower Shop - Мир прекрасных цветов',
    description: 'Добро пожаловать в мир прекрасных цветов. Заказывайте свежие букеты с доставкой по всей России.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
