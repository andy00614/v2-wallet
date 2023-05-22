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

export const getPublicKey = async (mnemonic: string[]) => {
  const { data } = await request<{ data: string }>('/blockchain/address', 'POST', { paramTypeEnum: 'MNEMONIC', mnemonic })
  return data
}

export const getMnemonic = async () => {
  const { data } = await request<{ data: string[] }>('/blockchain/mnemonic', 'GET')
  return data
}

export const getEkey = async (key: string[]) => {
  const { data } = await request<{ data: string }>('/blockchain/encryptKey', 'POST', { "paramTypeEnum": "MNEMONIC", mnemonic: key })
  return data
}
