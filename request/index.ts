import { decrypt, encrypt } from "@/utils/encrypt";
import { request } from "./utils"

export interface Wallet {
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
  const encryptMnemonic = await encrypt(JSON.stringify(mnemonic))
  const { data } = await request<{ data: string }>('/blockchain/address', 'POST', { paramTypeEnum: 'MNEMONIC', mnemonic: encryptMnemonic })
  return data
}

export const getMnemonic = async () => {
  const { data } = await request<{ data: string[] }>('/blockchain/mnemonic', 'GET')
  const r = await decrypt(data as any as string)
  const res = JSON.parse(r) as string[]
  return res
}

export const getEkey = async (key: string[]) => {
  const encryptKey = await encrypt(JSON.stringify(key))
  const { data } = await request<{ data: string }>('/blockchain/encryptKey', 'POST', { "paramTypeEnum": "MNEMONIC", mnemonic: encryptKey })
  const decryptEkey = await decrypt(data as any as string)
  return decryptEkey
}

export const privateKey2PublickKey = async (privateKey: string) => {
  const privateKeyEncrypt = await encrypt(privateKey)
  const { data } = await request<{ data: string }>('/blockchain/address', 'POST', { paramTypeEnum: 'PRIVATE_KEY', privateKey: privateKeyEncrypt })
  return data
}

export const getEkeyFromPrivateKey = async (privateKey: string) => {
  const privateKeyEncrypt = await encrypt(privateKey)
  const { data } = await request<{ data: string }>('/blockchain/encryptKey', 'POST', { paramTypeEnum: 'PRIVATE_KEY', privateKey: privateKeyEncrypt })
  const decryptEkey = await decrypt(data as any as string)
  return decryptEkey
}
