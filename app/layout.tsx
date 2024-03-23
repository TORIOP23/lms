// import type { Metadata } from 'next';
'use client';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Company Name',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
