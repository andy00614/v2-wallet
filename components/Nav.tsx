"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const AV = () => {
  return <Image
    src="/vv.png"
    width={36}
    height={36}
    style={{ width: 36, height: 36, borderRadius: '50%' }}
    // className='rounded-full'
    alt='profile'
    quality={100}
  />
}

const Avatar = () => {
  return <Menu>
    <MenuButton as='button'>
      <AV />
    </MenuButton>
    <MenuList>
      <MenuItem minH='48px'>
        <span>Fluffybuns the Destroyer</span>
      </MenuItem>
      <MenuItem minH='40px'>
        <span>Simon the pensive</span>
      </MenuItem>
    </MenuList>
  </Menu>
}

const Nav = () => {
  const router = useRouter();
  const isLogin = localStorage.getItem('publicKey');

  console.log('isLogin', isLogin);

  const handleCreate = (e: any) => {
    e.preventDefault();
    router.push('/create');
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/logo.png'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Dynasty-Wallet</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        <div className='flex gap-3 md:gap-5 flex-center'>
          {/* <Button variant="primary" color="purple" size="xs" onClick={handleCreate}>Create Wallet</Button>
          <Button variant="secondary" color="purple" size="xs">Sign in</Button> */}
          {!isLogin && <Button onClick={handleCreate} colorScheme="purple" size="sm">Create account</Button>}
          <Button variant='outline' colorScheme="purple" size="sm">Import account</Button>
          <Avatar />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className='flex'>
          <Avatar />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
