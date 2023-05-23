import React, { ReactNode } from 'react';
import '@/styles/globals.css'
import Navbar from '@/components/Nav';
import { Providers } from './providers';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Dynasty-Wallet",
  description: "Dynasty User Wallet App",
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <div className='main'>
            <div className='gradient' />
          </div>
          <div className='app'>
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout;
