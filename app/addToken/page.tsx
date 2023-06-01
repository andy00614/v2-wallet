'use client'
import { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { addToken } from '@/request';
import { useRouter } from 'next/navigation';
import { TokenManager } from '@/utils/storage';

export default function AddTokenForm() {
  const [address, setAddress] = useState('');
  const [symbol, setSymbol] = useState('');
  const toast = useToast();
  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // 你的请求逻辑，例如发送给后端服务器
    try {
      const response = await addToken(address, symbol);
      toast({
        title: 'add token success',
        status: 'success',
        duration: 2000,
      })
      router.push(`/account/${TokenManager.getInstance().getPublicKey()}`)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={10}>
      <FormControl isRequired>
        <FormLabel htmlFor="address">Token Contract Address</FormLabel>
        <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel htmlFor="symbol">Token Symbol</FormLabel>
        <Input type="text" id="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      </FormControl>
      <Button mt={6} colorScheme="teal" type="submit">
        Submit
      </Button>
    </Box>
  );
}
