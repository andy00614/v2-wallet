'use client'
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

function Header({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Flex justify="space-between" align="center" mb={4}>
        <IconButton
          aria-label="Go back"
          icon={<ArrowBackIcon />}
          onClick={() => router.back()}
          colorScheme="gray"
          variant="outline"
          isRound
        />
        {/* <Heading as="h1" size="lg">Transfer Funds</Heading> */}
        <h1 className="text-xl md:text-2xl ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
          {children}
        </h1>

        <Box w="50px" />  {/* This is to keep the layout balanced */}
      </Flex>
    </>
  )
}
export default Header
