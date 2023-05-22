import React, { ReactNode } from 'react';
import '@/styles/globals.css'
import Navbar from '@/components/Nav';

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
        <div className='main'>
          <div className='gradient' />
        </div>
        <div className='app'>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout;
