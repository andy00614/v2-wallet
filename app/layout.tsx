import React, { ReactNode } from 'react';
import '@/styles/globals.css'
import Navbar from '@/components/Nav';
import { Providers } from './providers';
import Footer from './Footer';
import { AuthProvider } from './auth-provider';

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
          <AuthProvider>
            <div className='main'>
              <div className='gradient' />
            </div>
            <div className='app min-h-screen flex flex-col'>
              <Navbar />
              <main className='flex-grow w-full'>
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout;
