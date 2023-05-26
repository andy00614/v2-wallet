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
  const encryptMnemonic = encrypt(JSON.stringify(mnemonic))
  const { data } = await request<{ data: string }>('/blockchain/address', 'POST', { paramTypeEnum: 'MNEMONIC', mnemonic: encryptMnemonic })
  return data
}

export const getMnemonic = async () => {
  const { data } = await request<{ data: string[] }>('/blockchain/mnemonic', 'GET')
  const r = decrypt(data as any as string)
  const res = JSON.parse(r) as string[]
  return res
}

export const getEkey = async (key: string[]) => {
  const encryptKey = encrypt(JSON.stringify(key))
  const { data } = await request<{ data: string }>('/blockchain/encryptKey', 'POST', { "paramTypeEnum": "MNEMONIC", mnemonic: encryptKey })
  const decryptEkey = decrypt(data as any as string)
  console.log({ decryptEkey })
  return decryptEkey
}

export const privateKey2PublickKey = async (privateKey: string) => {
  const privateKeyEncrypt = encrypt(privateKey)
  const { data } = await request<{ data: string }>('/blockchain/address', 'POST', { paramTypeEnum: 'PRIVATE_KEY', privateKey: privateKeyEncrypt })
  return data
}

export const getEkeyFromPrivateKey = async (privateKey: string) => {
  const privateKeyEncrypt = encrypt(privateKey)
  const { data } = await request<{ data: string }>('/blockchain/encryptKey', 'POST', { paramTypeEnum: 'PRIVATE_KEY', privateKey: privateKeyEncrypt })
  const decryptEkey = decrypt(data as any as string)
  return decryptEkey
}
