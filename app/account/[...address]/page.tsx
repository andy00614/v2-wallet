import { statusMap, statusColorMap } from '@/config/map'
import { getAddress, getOperationRecord } from '@/request'
import { Badge, Card, Col, Grid, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'

interface IProps {
  params: { address: string[] }
}

async function Create({ params }: IProps) {
  const address = params.address[0]
  const [data, records] = await Promise.all([getAddress(address), getOperationRecord(address)])

  return (
    <div className='create-wrapper w-full'>
      <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
        <Col numColSpan={2} numColSpanLg={2}>
          <Card>
            <Text>Address</Text>
            <Metric className='overflow-hidden overflow-ellipsis whitespace-nowrap'>0x06aae7b6c123c2c310c6f46c9a20d56453a7b21a1</Metric>
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
            <Title>List of Swiss Federal Councillours</Title>
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
