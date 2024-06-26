import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import BootstrapClient from '@/components/bootstrap-client';
import envConfig from '@/envConfig';
import AppProvider from '@/app/app-provider';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import localFont from 'next/font/local';

// const inter = Inter({ subsets: ['latin'] });

const myFont = localFont({
  src: [
    {
      path: './font/Inter/static/Inter-Regular.ttf',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: envConfig.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App',
  description: envConfig.NEXT_PUBLIC_COMPANY_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* antialiased is tailwind class for font smoothing */}
      <body className={`${myFont.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
        <ToastContainer pauseOnHover={false} autoClose={2000} />
        <BootstrapClient />
      </body>
    </html>
  );
}
