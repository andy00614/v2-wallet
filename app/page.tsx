'use client'
import { Badge, Box, Button, Image } from '@chakra-ui/react'
import React from 'react'

import dynamic from 'next/dynamic';

const HomePageBannerDynamic = dynamic(
  () => import('./HomePageBanner'),
  { ssr: false }
);

function Home() {
  return (
    <div>
      <HomePageBannerDynamic />
    </div>
  )
}

export default Home
