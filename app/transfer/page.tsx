'use client'
import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Select, Flex, useToast, InputGroup, Stack, FormControl, FormLabel, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const TransferFundsPage: React.FC = () => {
  const [currency, setCurrency] = useState('BNB');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const toast = useToast();
  const router = useRouter();

  const handleTransfer = () => {
    // Your transfer function here
    toast({
      title: "Transfer Successful",
      description: `Transferred ${amount} ${currency} to ${address}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" align="center" mb={4}>
        <IconButton
          aria-label="Go back"
          icon={<ArrowBackIcon />}
          onClick={() => router.back()}
          colorScheme="gray"
          variant="outline"
          isRound
        />
        <Heading as="h1" size="lg">Transfer Funds</Heading>
        <Box w="50px" />  {/* This is to keep the layout balanced */}
      </Flex>
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
              <option value="BNB">BNB</option>
              <option value="WDT">WDT</option>
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
