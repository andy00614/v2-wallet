import { Card, Metric, Text } from '@tremor/react'
import React from 'react'

interface IProps {
  address: string
}
function AddressShow({ address }: IProps) {
  return (
    <Card>
      <Text>Address</Text>
      <Metric className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{address}</Metric>
    </Card>
  )
}

export default AddressShow
