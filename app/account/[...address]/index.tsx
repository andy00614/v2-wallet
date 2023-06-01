'use client'
import { statusMap, statusColorMap, typeMap } from '@/config/map'
import { Wallet, getAddress, getOperationRecord } from '@/request'
import { TokenManager } from '@/utils/storage'
import { useToast } from '@chakra-ui/react'
import { Badge, Card, Col, Grid, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { useEffect, useMemo, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import FunctionalIcon from '@/components/FunctionalIcon'
import { BiTransfer } from 'react-icons/bi'
import { IoGameControllerOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'


interface IProps {
  address: string[]
}

function Create({ address }: IProps) {
  const router = useRouter()
  const publicKey = address[0]
  const [data, setData] = useState<Partial<Wallet>>({})
  const [records, setRecords] = useState<any[]>([])
  const toast = useToast()
  const updateData = async () => {
    const [data, recordsData] = await Promise.all(
      [
        getAddress(),
        getOperationRecord(publicKey)
      ]
    )
    setData(data)
    setRecords(recordsData)
  }
  const toaster = useToast()

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(publicKey)
    toaster({
      title: 'Address Copied',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  useEffect(() => {
    const cachePublicKey = TokenManager.getInstance().getPublicKey()
    if (publicKey !== cachePublicKey) {
      toast({
        title: 'Invalid Address',
        description: 'Please check your address',
        status: 'error',
        duration: 2000,
      })
      router.push(`/invalid`)
    }
  }, [publicKey])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // 当页面从其他页面切换回来时，执行您的代码
        updateData()
      }
    };
    let timer = setInterval(() => {
      if (!document.hidden) {
        updateData()
      }
    }, 5000)
    if (publicKey) {
      updateData()
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(timer)
    };
  }, [])


  const coins = useMemo(() => {
    const otherCoins = Object.keys(data?.otherCoin || {}).map(key => ({ key, value: data.otherCoin?.[key] || 0 }))
    return [
      {
        key: 'BNB',
        value: data.bnbBalance
      },
      ...otherCoins
    ]
  }, [data])

  return (
    <div className='create-wrapper w-full'>
      <Grid numCols={1} numColsSm={2} numColsLg={2} className="gap-2">

        <Col numColSpan={2} numColSpanSm={2} className='flex gap-6 mb-2'>
          <FunctionalIcon text='Import token' TypeIcon={AddIcon} onClick={() => router.push('/addToken')} />
          <FunctionalIcon text='Transfer Funds' TypeIcon={BiTransfer} onClick={() => router.push('/transfer')} />
          <FunctionalIcon text='Play Games' TypeIcon={IoGameControllerOutline} onClick={() => router.push('/game')} />
        </Col>

        <Col numColSpan={2} numColSpanLg={2}>
          <Card>
            <Text>Address</Text>
            <Metric onClick={handleCopyAddress} className='cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap'>{publicKey}</Metric>
          </Card>
        </Col>

        {
          coins.map((item, index) => {
            const isLastItem = index === coins.length - 1;
            const colSpanValue = (isLastItem && coins.length % 2 !== 0) ? 2 : 1;

            return (
              <Col key={item.key} numColSpan={2} numColSpanSm={colSpanValue}>
                <Card>
                  <Text>{item.key}</Text>
                  <Metric className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{item.value || 0}</Metric>
                </Card>
              </Col>
            )
          })
        }


        <Col numColSpan={2} numColSpanSm={2}>
          <Card>
            <Title>Transaction History</Title>
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Create Time</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Amount</TableHeaderCell>
                  <TableHeaderCell>From address</TableHeaderCell>
                  <TableHeaderCell>To address</TableHeaderCell>
                  <TableHeaderCell>Symbol</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Log</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((item) => {
                  return (
                    <TableRow key={item.amount}>
                      <TableCell>
                        <Text>{item.createTime}</Text>
                      </TableCell>
                      <TableCell>{typeMap[String(item.type)]}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.fromAddress}</TableCell>
                      <TableCell>{item.toAddress}</TableCell>
                      <TableCell>{item.symbol}</TableCell>
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
