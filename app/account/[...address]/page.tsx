import { statusMap, statusColorMap } from '@/config/map'
import { Badge, Card, Col, Grid, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'

const tableData = [
  {
    "id": 54,
    "type": 0,
    "address": "0x4b3a81756fa0771c8efbd28219afda5f2a0e2149",
    "amount": 74,
    "status": 2,
    "digestLog": null,
    "createTime": "2023-05-12 11:36:44",
    "updateTime": "2023-05-12 11:36:59"
  },
  {
    "id": 53,
    "type": 0,
    "address": "0x4b3a81756fa0771c8efbd28219afda5f2a0e2149",
    "amount": 74,
    "status": 2,
    "digestLog": null,
    "createTime": "2023-05-12 11:32:15",
    "updateTime": "2023-05-12 11:32:15"
  },
  {
    "id": 52,
    "type": 0,
    "address": "0x4b3a81756fa0771c8efbd28219afda5f2a0e2149",
    "amount": 64,
    "status": 2,
    "digestLog": null,
    "createTime": "2023-05-12 11:29:43",
    "updateTime": "2023-05-12 11:29:58"
  },
  {
    "id": 51,
    "type": 0,
    "address": "0x4b3a81756fa0771c8efbd28219afda5f2a0e2149",
    "amount": 46,
    "status": 2,
    "digestLog": null,
    "createTime": "2023-05-12 11:18:52",
    "updateTime": "2023-05-12 11:19:07"
  },
  {
    "id": 50,
    "type": 0,
    "address": "0x4b3a81756fa0771c8efbd28219afda5f2a0e2149",
    "amount": 30,
    "status": -1,
    "digestLog": "BusinessException(code=0)",
    "createTime": "2023-05-12 11:10:19",
    "updateTime": "2023-05-12 11:10:19"
  }
]

interface IProps {
  params: { address: string[] }
}

async function Create({ params }: IProps) {
  console.log(params.address[0])
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
            <Metric className='overflow-hidden overflow-ellipsis whitespace-nowrap'>0.22</Metric>
          </Card>
        </Col>

        <Col numColSpan={2} numColSpanSm={1}>
          <Card>
            <Text>WDT</Text>
            <Metric className='overflow-hidden overflow-ellipsis whitespace-nowrap'>4443.2</Metric>
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
                {tableData.map((item) => {
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
