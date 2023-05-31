'use client'
import React, { useContext, useState } from 'react';
import { Box, Button, Input, VStack, Tag, TagLabel, TagCloseButton, Stack, useToast, Heading, Flex } from '@chakra-ui/react';
import { getEkeyFromMnemonic, getEkeyFromPrivateKey, mnemonic2PublickKey, privateKey2PublickKey } from '@/request';
import { AuthContext } from '@/app/auth-provider';
import { useRouter } from 'next/navigation';

const WalletImportPage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [mnemonicInput, setMnemonicInput] = useState('');
  const authContext = useContext(AuthContext);
  const router = useRouter()

  const toast = useToast();

  const handleMnemonicKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (mnemonicInput) {
        if (mnemonic.length < 12) {
          setMnemonic([...mnemonic, mnemonicInput]);
          setMnemonicInput('');
        } else {
          toast({
            title: "Warning",
            description: "You can only enter 12 mnemonic words.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  const handleMnemonicRemove = (mnemonicToRemove: string) => {
    setMnemonic(mnemonic.filter((m) => m !== mnemonicToRemove));
  };

  const onPrivateKeyLogin = async (privateKey: string) => {
    try {
      // Your login function here
      console.log('Login with private key:', privateKey);
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
      toast({
        title: 'login success',
        status: 'success',
        duration: 1000,
      })
      authContext.login(eKey, publicKey)
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
  };

  const onMnemonicLogin = async (mnemonic: string[]) => {
    // Your login function here
    console.log('Login with mnemonic:', mnemonic);
    const [publicKey, eKey] = await Promise.all([
      await mnemonic2PublickKey(mnemonic),
      await getEkeyFromMnemonic(mnemonic)
    ])
    authContext.login(eKey, publicKey)
    router.push(`/account/${publicKey}`)
    toast({
      title: 'login success',
      status: 'success',
      duration: 1000,
    })
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h1" size="lg" textAlign="center" mb={4}>Login Page</Heading>
      <Box>
        <Input
          placeholder="Enter your private key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          mb={2}
        />
        <Button onClick={() => onPrivateKeyLogin(privateKey)}>Login with Private Key</Button>
      </Box>
      <Box>
        <Input
          placeholder="Enter your mnemonic"
          value={mnemonicInput}
          onChange={(e) => setMnemonicInput(e.target.value)}
          onKeyDown={handleMnemonicKeyDown}
          mb={2}
        />
        <Flex wrap="wrap" mb={2}>
          {mnemonic.map((m, index) => (
            <Tag key={index} size="lg" variant="solid" colorScheme="teal" m={1}>
              <TagLabel>{m}</TagLabel>
              <TagCloseButton onClick={() => handleMnemonicRemove(m)} />
            </Tag>
          ))}
        </Flex>
        <Button onClick={() => onMnemonicLogin(mnemonic)}>Login with Mnemonic</Button>
      </Box>
    </VStack>
  );
};

export default WalletImportPage;
