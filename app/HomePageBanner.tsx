'use client'
import { Transition } from '@headlessui/react';
import Image from 'next/image';

const HomePageBanner = () => {
  return (
    <Transition
      as="div"
      appear={true}
      show={true}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="p-8">
        <div className="p-8" >
          <h1 className="flex text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 pb-2 leading-10">
            Welcome to Dynasty Wallet
            <Image
              src='/banana.png'
              alt='logo'
              width={40}
              height={40}
              className='object-contain ml-4'
            />
          </h1>
          <p className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black">Your premier Web3 wallet focused on the Binance Smart Chain (BSC). Our goal is to provide you with a secure, reliable, and user-friendly tool for managing your digital currencies, making the world of blockchain accessible no matter where you are.</p>
          <p className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black mt-4">Our exclusive token, WDT, empowers your gaming experience. With WDT, you can not only purchase virtual goods within your games, but also trade, invest, and even participate in community governance. Gaming with us is more than just play - it's a whole new adventure.</p>
          <p className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black mt-4">Here at Dynasty Wallet, we're big believers in Non-Fungible Tokens (NFTs). Whether they're digital artwork or rare items within a game, you can create, buy, sell, and trade your NFTs right here with us. We believe everyone should have the right to own and trade their digital assets, and we're here to make that vision a reality.</p>
          <p className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black mt-4">Join Dynasty Wallet to embark on your blockchain journey and explore endless possibilities.</p>
        </div>
      </div>
    </Transition>
  );
};


export default HomePageBanner
