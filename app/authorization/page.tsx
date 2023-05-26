'use client'
import { TokenManager } from '@/utils/storage';
import { Box, Button, Flex, Heading, Text, VStack, useToast } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation'

const AuthorizePage = () => {
  const toast = useToast()
  const params = useSearchParams()
  const isLogin = Boolean(TokenManager.getInstance().getPublicKey());
  const redirect_uri = params.get('redirect_uri') as string;
  const gameName = params.get('game_name');

  const handleAuthorize = () => {
    try {
      // Ensure redirect_uri is not null and is a valid URL
      if (!redirect_uri) {
        throw new Error("Missing redirect URI");
      }
      const newUrl = new URL(redirect_uri);

      const tokenManger = TokenManager.getInstance();

      // Ensure the token and public key exist
      const token = tokenManger.getToken();
      const publicKey = tokenManger.getPublicKey();

      if (!token || !publicKey) {
        throw new Error("Missing token or public key");
      }

      newUrl.searchParams.append('eKey', token);
      newUrl.searchParams.append('publicKey', publicKey);
      newUrl.searchParams.append('authorized', 'true');

      toast({
        title: "Authorization Success",
        description: `You have authorized ${gameName} to access your wallet information.`,
        status: "success",
      })

      setTimeout(() => {
        window.location.href = newUrl.toString();
      }, 800);
    } catch (error: any) {
      // Log the error and display a toast message
      console.error(error);
      toast({
        title: "Authorization Failed",
        description: `An error occurred: ${error.message}`,
        status: "error",
      })
    }
  };


  const handleReject = () => {
    const newUrl = new URL(redirect_uri);
    newUrl.searchParams.append('authorized', 'false');
    window.location.href = newUrl.toString();
  };

  return (
    <VStack spacing={5} align="center" justify="center">
      {
        <Box p="5" borderRadius="md" shadow="md" bg="white">
          {
            isLogin ? <>
              <Heading mb="5" textAlign="center">Authorization Page</Heading>
              <Text mb="5">
                {gameName} is requesting access to your Wallet information. If you agree to share your information with Game A, please click "Authorize". If you do not want to share your information, please click "Reject".
              </Text>
              <Flex direction="row">
                <Button className='mr-6' colorScheme="teal" bgGradient="linear(to-r, teal.500,green.500)" onClick={handleAuthorize}>Authorize</Button>
                <Button colorScheme="red" bgGradient="linear(to-r, red.500,orange.500)" onClick={handleReject}>Reject</Button>
              </Flex>
            </> : <>
              <Text mb="5">
                <Heading mb="5" textAlign="center">
                  Authorization Required
                </Heading>
                <Text mb="5">
                  You are currently not signed in to your wallet. Please <b>Import account</b> to continue with the authorization process.
                </Text>
                <Text mb="5">
                  If you do not have an account, <b>please create one first.</b> Thank you.
                </Text>
              </Text>
            </>
          }
        </Box>
      }
    </VStack>
  );
};

export default AuthorizePage;

