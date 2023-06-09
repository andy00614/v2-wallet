'use client'
import { statusMap, statusColorMap } from '@/config/map'
import { Wallet, getAddress, getOperationRecord } from '@/request'
import { useToast } from '@chakra-ui/react'
import { Badge, Card, Col, Grid, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { useEffect, useState } from 'react'

interface IProps {
  params: { address: string[] }
}

function Create({ params }: IProps) {
  const publicKey = params.address[0]
  // const [data, records] = await Promise.all([getAddress(address), getOperationRecord(address)])
  const [data, setData] = useState<Partial<Wallet>>({})
  const [records, setRecords] = useState<any[]>([])
  const updateData = async () => {
    const [data, recordsData] = await Promise.all([getAddress(publicKey), getOperationRecord(publicKey)])
    setData(data)
    setRecords(recordsData)
  }
  const toaster = useToast()

  const handleCopyAddress = () => {
    toaster({
      title: 'Address Copied',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    navigator.clipboard.writeText(publicKey)
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // 当页面从其他页面切换回来时，执行您的代码
        updateData()
      }
    };
    if (publicKey) {
      updateData()
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [])

  return (
    <div className='create-wrapper w-full'>
      <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
        <Col numColSpan={2} numColSpanLg={2}>
          <Card>
            <Text>Address</Text>
            <Metric onClick={handleCopyAddress} className='cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap'>{publicKey}</Metric>
          </Card>
        </Col>

        <Col numColSpan={2} numColSpanSm={1}>
          <Card>
            <Text>BNB</Text>
            <Metric className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{data.bnbBalance}</Metric>
          </Card>
        </Col>

        <Col numColSpan={2} numColSpanSm={1}>
          <Card>
            <Text>WDT</Text>
            <Metric className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{data.balance}</Metric>
          </Card>
        </Col>

        <Col numColSpan={2} numColSpanSm={2}>
          <Card>
            <Title>Transaction History</Title>
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Amount</TableHeaderCell>
                  <TableHeaderCell>Time</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Log</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((item) => {
                  return (
                    <TableRow key={item.amount}>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>
                        <Text>{item.updateTime}</Text>
                      </TableCell>
                      <TableCell>
                        {/* @ts-ignore */}
                        <Badge color={statusColorMap[item.status]}>
                          {statusMap[String(item.status)]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.digestLog}
                      </TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </Card>
        </Col>
      </Grid>
    </div>
  )
}

export default Create
