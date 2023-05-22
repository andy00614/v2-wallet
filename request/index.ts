import { request } from "./utils"

interface Wallet {
  id: number;
  address: string;
  balance: string;
  bnbBalance: string;
  userId: number | null;
  optTime: string;
}

export async function getAddress(address: string) {
  const { data } = await request<{ data: Wallet }>('/blockchain/wallet', 'GET', { address })
  return data
}

export async function getOperationRecord(address: string) {
  const { data } = await request<{ data: { records: any[] } }>('/blockchain/operationRecord', 'POST', { address, pageNo: 1, pageSize: 1000 })
  return data.records
}

