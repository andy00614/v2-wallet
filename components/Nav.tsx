"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { Button, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { getEkeyFromPrivateKey, privateKey2PublickKey } from "@/request";
import { TokenManager } from "@/utils/storage";
import { isAuthorizationPage } from "@/utils/route";

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
  const tokenManger = TokenManager.getInstance();
  const [isLogin, setIsLogin] = useState(Boolean(tokenManger.getPublicKey()));
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const pathName = usePathname()

  useEffect(() => {
    setTimeout(() => {
      const res = Boolean(tokenManger.getPublicKey())
      setIsLogin(res)
    }, 200);
  }, [pathName])

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (isAuthorizationPage(pathName)) {
      let path = window.location.pathname; // "/authorization"
      let queryString = window.location.search;
      const redirectUrl = encodeURIComponent(`${path}${queryString}`);
      console.log({ redirectUrl: `${path}${queryString}` })
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
          {/* <Button variant="primary" color="purple" size="xs" onClick={handleCreate}>Create Wallet</Button>
          <Button variant="secondary" color="purple" size="xs">Sign in</Button> */}
          {!isLogin && <Button onClick={handleCreate} colorScheme="purple" size="sm">Create account</Button>}
          <Button variant='outline' colorScheme="purple" size="sm" onClick={handleImport}>Import account</Button>
          {isLogin && <Avatar logout={() => setIsLogin(false)} />}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className='flex'>
          {isLogin && <Avatar logout={() => setIsLogin(false)} />}
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
