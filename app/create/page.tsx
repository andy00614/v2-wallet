'use client'
import AddressShow from "@/components/AddressShow"
import CheckWord from "@/components/CheckWord"
import { layoutOfMnemonic } from "@/config/map"
import { getEkey, getMnemonic, getPublicKey } from "@/request"
import { TokenManager } from "@/utils/storage"
import { Box, Button, Card, CardBody, SimpleGrid, useToast } from "@chakra-ui/react"
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
  const toast = useToast()

  const shouldShowMnemonic = useMemo(() => mnemonic.length > 0, [mnemonic])

  const jumpToAccountPage = (publickKey: string) => {
    router.push(`/account/${publickKey}`)
  }

  const generatorAddress = useCallback(async () => {
    const mnemonic = await getMnemonic()
    const [publicKey, eKey] = await Promise.all([getPublicKey(mnemonic), getEkey(mnemonic)])
    setMnemonic(mnemonic.slice(0, 2))
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
    toast({
      title: 'Mnemonic is right!',
      description: "Please wait a moment",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
    const tokenManager = TokenManager.getInstance()
    tokenManager.setToken(eKey)
    tokenManager.setPublickKey(publicKey)
    jumpToAccountPage(publicKey)
  }

  const onCheckFail = () => {
    toast({
      title: 'Mnemonic is wrong!',
      description: "Please check your mnemonic",
      status: "warning",
      duration: 2000,
      isClosable: true,
    })
    setIsRemembered(false)
  }

  return <section className="w-full">
    <AddressShow address={publicKey} />
    {shouldShowMnemonic && <section className="mt-4">
      {/* 展示助记词 */}
      {
        isRemembered ?
          <div className="check-div w-full">
            <CheckWord word={mnemonic} onFail={onCheckFail} onSuccess={onCheckSuccess} />
            <Button className="mt-4" onClick={() => setIsRemembered(false)}>forget, retry</Button>
          </div>
          :
          <>
            <Card>
              <CardBody>
                <SimpleGrid columns={layoutOfMnemonic} spacing={10}>
                  {mnemonic.map((word, index) => (
                    <Button key={index} size="sm" colorScheme="blue">
                      {word}
                    </Button>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
            <Button className="mt-4" onClick={doSomeCheck}>I Remebered</Button>
          </>
      }

    </section>}
  </section>
}

export default Create
