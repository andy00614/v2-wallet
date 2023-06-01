'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Input, VStack, Heading, Select, Flex, useToast, InputGroup, Stack, FormControl, FormLabel, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { getAddress, transferCoin } from '@/request';
import { TokenManager } from '@/utils/storage';

const TransferFundsPage: React.FC = () => {
  const [currency, setCurrency] = useState('BNB');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [symbols, setSymbols] = useState<string[]>(['BNB']);

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const getCoinsSymbol = async () => {
      const data = await getAddress()
      const coinsSymbol = ['BNB', ...Object.keys(data.otherCoin)]
      setSymbols(coinsSymbol)
    }
    getCoinsSymbol()
  }, [])

  const handleTransfer = async () => {
    // Your transfer function here
    await transferCoin(address, currency, amount)
    toast({
      title: "Transfer Successful",
      description: `Transferred ${amount} ${currency} to ${address}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push(`/account/${TokenManager.getInstance().getPublicKey()}`)
  };

  return (
    <VStack spacing={4} align="stretch">
      <Header>Transfer Funds</Header>
      <Box>
        <FormControl id="address">
          <FormLabel>Recipient's Address</FormLabel>
          <Input
            placeholder="Enter recipient's address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={4}>
          <FormControl id="currency">
            <FormLabel>Currency</FormLabel>
            <Select bg="white" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {
                symbols.map((symbol) => {
                  return <option key={symbol} value={symbol}>{symbol}</option>
                })
              }
              {/* <option value="BNB">BNB</option>
              <option value="WDT">WDT</option> */}
            </Select>
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
        </Stack>
        <Button colorScheme="teal" onClick={handleTransfer} mt={4}>Transfer</Button>
      </Box>
    </VStack>
  );
};

export default TransferFundsPage;
