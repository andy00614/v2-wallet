"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { Button, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { getEkeyFromPrivateKey, privateKey2PublickKey } from "@/request";
import { TokenManager } from "@/utils/storage";
import { isAuthorizationPage } from "@/utils/route";
import { AuthContext } from "@/app/auth-provider";

const AV = () => {
  return <Image
    src="/vv.png"
    width={36}
    height={36}
    style={{ width: 36, height: 36, borderRadius: '50%' }}
    alt='profile'
    quality={100}
  />
}

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
      <AV />
    </MenuButton>
    <MenuList>
      <MenuItem minH='48px' onClick={handleLogout}>
        <span>Log out</span>
      </MenuItem>
    </MenuList>
  </Menu>
}

const Nav = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const pathName = usePathname()
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (isAuthorizationPage(pathName)) {
      let path = window.location.pathname; // "/authorization"
      let queryString = window.location.search;
      const redirectUrl = encodeURIComponent(`${path}${queryString}`);
      router.push(`/create?redirectUrl=${redirectUrl}`);
    } else {
      router.push('/create');
    }
  }

  const handleImport = () => {
    onOpen()
  }

  const handleConfirm = async () => {
    try {
      const privateKey = inputRef.current?.value
      if (!privateKey) {
        toast({
          title: 'please input private key',
          status: 'warning',
          duration: 2000,
        })
        return;
      }
      const [publicKey, eKey] = await Promise.all([
        await privateKey2PublickKey(privateKey),
        await getEkeyFromPrivateKey(privateKey)
      ])
      onClose()
      TokenManager.getInstance().setToken(eKey)
      router.push(`/account/${publicKey}`)
    } catch (e: any) {
      if (e?.response?.status === 403) {
        toast({
          title: 'private key is invalid',
          status: 'error',
          duration: 2000,
        })
      }
    }
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
          {!isAuthenticated && <Button onClick={handleCreate} colorScheme="purple" size="sm">Create account</Button>}
          <Button variant='outline' colorScheme="purple" size="sm" onClick={handleImport}>Import account</Button>
          {isAuthenticated && <Avatar logout={logout} />}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className='flex'>
          {isAuthenticated && <Avatar logout={logout} />}
        </div>
      </div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input ref={inputRef} placeholder='Enter your private key string here:' />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' size="md" onClick={handleConfirm}>Import</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </nav>
  );
};

export default Nav;
