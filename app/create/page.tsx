'use client'
import AddressShow from "@/components/AddressShow"
import CheckWord from "@/components/CheckWord"
import { getEkey, getMnemonic, getPublicKey } from "@/request"
import { TokenManager } from "@/utils/storage"
import { Button } from "@tremor/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"


const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#7265e6', '#ffbf00', '#00a2ae', '#eb2f96', '#fa8c16', '#7cb305', '#f5222d', '#52c41a'];


function Create() {
  const [mnemonic, setMnemonic] = useState<string[]>([])
  const [publicKey, setPublicKey] = useState<string>('')
  const [isRemembered, setIsRemembered] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [eKey, setEkey] = useState<string>('')
  const router = useRouter()

  const shouldShowMnemonic = useMemo(() => mnemonic.length > 0, [mnemonic])

  const jumpToAccountPage = (publickKey: string) => {
    router.push(`/account/${publickKey}`)
  }

  const generatorAddress = useCallback(async () => {
    const mnemonic = await getMnemonic()
    const [publicKey, eKey] = await Promise.all([getPublicKey(mnemonic), getEkey(mnemonic)])
    setMnemonic(mnemonic)
    setPublicKey(publicKey)
    setEkey(eKey)
  }, [])

  useEffect(() => {
    (async function () {
      setLoading(true)
      await generatorAddress()
      // message.success('create success!')
      setLoading(false)
    })()
  }, [generatorAddress])


  const doSomeCheck = () => {
    setIsRemembered(true)
  }

  const onCheckSuccess = async () => {
    // message.success('mnemonic is right!')
    const tokenManager = TokenManager.getInstance()
    // await createAddress({ address: publicKey, encryptKey: eKey, balance: 0 })
    tokenManager.setToken(eKey)
    tokenManager.setPublickKey(publicKey)
    jumpToAccountPage(publicKey)
  }

  const onCheckFail = (word: string[]) => {
    // message.warning('mnemonic is wrong!')
    // 需要重试助记词
    setIsRemembered(false)
  }

  return <section className="w-full">
    <AddressShow address={publicKey} />
    {shouldShowMnemonic && <section className="mt-4">
      {/* 展示助记词 */}
      {
        isRemembered ?
          <>
            <CheckWord word={mnemonic} onFail={onCheckFail} onSuccess={onCheckSuccess} />
            <Button className="mt-4" onClick={() => setIsRemembered(false)}>forget, retry</Button>
          </>
          :
          <>
            <div className="p-4 bg-indigo-100 border border-indigo-300 rounded-md">
              <div className="flex flex-wrap flex-row">
                {mnemonic.map((word, index) => (
                  <div key={index} className="w-1/4 mb-4 px-2">
                    <Button className="min-w-full text-center mt-2 mr-2">
                      {word}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button className="mt-4" onClick={doSomeCheck}>I Remebered</Button>
          </>
      }

    </section>}
  </section>
}

export default Create
