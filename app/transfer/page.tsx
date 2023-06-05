'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Input, VStack, Select, useToast, FormControl, FormLabel, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { getAddress, transferCoin, getTransferGasFee } from '@/request';
import { TokenManager } from '@/utils/storage';

const TransferFundsPage: React.FC = () => {
  const [currency, setCurrency] = useState('BNB');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [symbols, setSymbols] = useState<string[]>(['BNB']);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [transferGasFee, setTransferGasFee] = useState<string | null | number>(null);
  const [isLoading, setIsLoading] = useState(false);
  const symbolMap = useRef<Record<string, string | number>>({})
  const cancelRef = React.useRef<any>();

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const getCoinsSymbol = async () => {
      const data = await getAddress()
      symbolMap.current = {
        'BNB': data.bnbBalance,
        ...data.otherCoin
      }
      const coinsSymbol = ['BNB', ...Object.keys(data.otherCoin)]
      setSymbols(coinsSymbol)
    }
    getCoinsSymbol()
  }, [])

  const handleTransferConfirm = async () => {
    setIsLoading(true);
    const gasFee = await getTransferGasFee({ amt: amount, symbol: currency, toAddress: address, ekey: TokenManager.getInstance().getToken() as string });
    setTransferGasFee(gasFee);
    setIsAlertOpen(true);
    setIsLoading(false);
  }

  const handleTransfer = async () => {
    setIsLoading(true);
    setIsAlertOpen(false);
    await transferCoin(address, currency, amount)
    toast({
      title: "Transfer Successful",
      description: `Transferred ${amount} ${currency} to ${address}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setIsLoading(false);
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
                  return <option key={symbol} value={symbol}>{symbol}({symbolMap.current[symbol] || 0})</option>
                })
              }
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
        <Button colorScheme="teal" isLoading={isLoading} onClick={handleTransferConfirm} mt={4}>Transfer</Button>
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsAlertOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Transfer Confirmation
              </AlertDialogHeader>

              <AlertDialogBody>
                This operation will consume approximately {transferGasFee} gas fee. Do you wish to continue?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleTransfer} ml={3}>
                  Continue
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </VStack>
  );
};

export default TransferFundsPage;
