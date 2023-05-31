"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { Button, Menu, MenuButton, MenuItem, MenuList, IconButton, Text, Box } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { useContext } from "react";
import { TokenManager } from "@/utils/storage";
import { isAuthorizationPage } from "@/utils/route";
import { AuthContext } from "@/app/auth-provider";

// Avatar component
const Avatar = ({ logout }: { logout?: () => void }) => {
  const router = useRouter();
  const handleLogout = () => {
    const tokenMananger = TokenManager.getInstance();
    tokenMananger.removeToken();
    tokenMananger.removePublicKey();
    router.push('/')
    logout && logout()
  }
  return <Menu>
    <MenuButton as='button'>
      <Image
        src="/vv.png"
        width={36}
        height={36}
        style={{ width: 36, height: 36, borderRadius: '50%' }}
        alt='profile'
        quality={100}
      />
    </MenuButton>
    <MenuList>
      <MenuItem minH='48px' onClick={handleLogout}>
        <span>Log out</span>
      </MenuItem>
    </MenuList>
  </Menu>
}

// Navigation component
const Nav = () => {
  const router = useRouter();
  const pathName = usePathname()
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleNavigation = (path: string) => {
    if (isAuthorizationPage(pathName)) {
      let path = window.location.pathname; // "/authorization"
      let queryString = window.location.search;
      const redirectUrl = encodeURIComponent(`${path}${queryString}`);
      router.push(`${path}?redirectUrl=${redirectUrl}`);
    } else {
      router.push(path);
    }
  }

  const handleCreate = (e: any) => {
    e.preventDefault();
    handleNavigation('/create');
  }

  const handleImport = () => {
    handleNavigation('/import');
  }

  const gotoWallet = () => {
    router.push(`/account/${TokenManager.getInstance().getPublicKey()}`)
  }

  console.log(isAuthenticated)
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
        <h1 className="text-xl md:text-2xl ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Dynasty-Wallet
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        <div className='flex gap-3 md:gap-5 flex-center'>
          {!isAuthenticated && <Button onClick={handleCreate} colorScheme="purple" size="sm">Create account</Button>}
          {isAuthenticated && !pathName.includes('/account') && <Button onClick={gotoWallet} colorScheme="purple" size="sm">Go to Wallet</Button>}
          {pathName !== '/import' && <Button variant='outline' colorScheme="purple" size="sm" onClick={handleImport}>Import account</Button>}
          {isAuthenticated && <Avatar logout={logout} />}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className='flex gap-4'>
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} />
            <MenuList>
              {!isAuthenticated && <MenuItem onClick={handleCreate}>Create account</MenuItem>}
              {isAuthenticated && !pathName.includes('/account') && <MenuItem onClick={gotoWallet}>Go to Wallet</MenuItem>}
              {pathName !== '/import' && <MenuItem onClick={handleImport}>Import account</MenuItem>}
              {isAuthenticated && <MenuItem onClick={logout}>Log out</MenuItem>}
            </MenuList>
          </Menu>
          {isAuthenticated &&
            <Avatar logout={logout} />
          }
        </div>
      </div>

    </nav>
  );
};

export default Nav;
