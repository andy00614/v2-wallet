'use client'
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import React from 'react'

interface IProps {
  address: string
}
function AddressShow({ address }: IProps) {
  return (
    <Card>
      <CardBody>
        <Box>
          <Heading size='xs' >
            Public Address
          </Heading>
          <Text pt='2' fontSize='sm'>
            {address}
          </Text>
        </Box>
      </CardBody>
    </Card>
  )
}

export default AddressShow
