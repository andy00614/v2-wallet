'use client'
import CheckWord from "@/components/CheckWord"
import PasswordSetter from "@/components/SetPassword"
import CreateStep from "@/components/Step"
import { layoutOfMnemonic } from "@/config/map"
import { steps } from "@/config/step"
import { getEkey, getMnemonic, getPublicKey } from "@/request"
import { authorizationKey } from "@/utils/route"
import { Button, Card, CardBody, Center, Heading, SimpleGrid, Text, useSteps, useToast } from "@chakra-ui/react"
import { useSearchParams, useRouter } from "next/navigation"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import Confetti from 'react-confetti';
import { AuthContext } from "../auth-provider"



const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#7265e6', '#ffbf00', '#00a2ae', '#eb2f96', '#fa8c16', '#7cb305', '#f5222d', '#52c41a'];


function Create() {
  const [mnemonic, setMnemonic] = useState<string[]>([])
  const [publicKey, setPublicKey] = useState<string>('')
  const [isRemembered, setIsRemembered] = useState<boolean>(false)
  const [eKey, setEkey] = useState<string>('')
  const router = useRouter()
  const toast = useToast()
  const parmas = useSearchParams()
  const auth = useContext(AuthContext)
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 1,
    count: steps.length,
  })
  const [isFinish, setIsFinish] = useState(false);


  const shouldShowMnemonic = useMemo(() => mnemonic.length > 0, [mnemonic])

  const jumpToAccountPage = (publickKey: string) => {
    const redirectPath = parmas.get(authorizationKey)
    if (redirectPath) {
      const url = decodeURIComponent(redirectPath)
      router.push(url)
    } else {
      router.push(`/account/${publickKey}`)
    }
  }

  const generatorAddress = useCallback(async () => {
    const mnemonic = await getMnemonic()
    const eKey = await getEkey(mnemonic);
    const publicKey = await getPublicKey(mnemonic);
    setMnemonic(mnemonic.slice(0, 2))
    setPublicKey(publicKey)
    setEkey(eKey)
  }, [])

  useEffect(() => {
    (async function () {
      await generatorAddress()
    })()
  }, [generatorAddress])


  const doSomeCheck = () => {
    setIsRemembered(true)
    goToNext()
  }

  const completeRegister = () => {
    toast({
      title: 'Mnemonic is right!',
      description: "Please wait a moment",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
    auth.login(eKey, publicKey)
    jumpToAccountPage(publicKey)
  }

  const onCheckSuccess = async () => {
    toast({
      title: 'Mnemonic is right!',
      description: "Please wait a moment",
      status: "success",
      duration: 2000,
    })
    goToNext()
  }

  const onCheckFail = () => {
    toast({
      title: 'Mnemonic is wrong!',
      description: "Please check your mnemonic",
      status: "warning",
      duration: 2000,
      isClosable: true,
    })
    goToPrevious()
    setIsRemembered(false)
  }

  const Mnemonic = () => {
    return <>{
      isRemembered ?
        <div className="check-div w-full">
          <CheckWord word={mnemonic} onFail={onCheckFail} onSuccess={onCheckSuccess} />
          <Button className="mt-4" onClick={
            () => {
              setIsRemembered(false)
              goToPrevious()
            }
          } colorScheme="orange" >forget, retry</Button>
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
          <Button className='mt-4' onClick={doSomeCheck} colorScheme="teal" bgGradient="linear(to-r, teal.500,green.500)">I Remembered</Button>
        </>
    }
    </>
  }

  const finish = () => {
    setIsFinish(true)
  }

  const gotoWallet = () => {
    completeRegister()
  }

  return <section className="w-full">
    {/* <AddressShow address={publicKey} /> */}

    {
      !isFinish ?
        <>
          <CreateStep activeStep={activeStep} className="mb-6" />
          <section>
            {
              activeStep < 3 && shouldShowMnemonic && <Mnemonic />
            }
            {activeStep === 3 && <PasswordSetter callback={finish} />}
          </section>
        </> :
        <>
          <Center flexDirection="column">
            <Heading
              mb="2rem"
              fontSize="4xl"
              fontWeight="bold"
              css={{
                background: "linear-gradient(to right, red , yellow)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Congratulations!
            </Heading>
            <Text
              mb="2rem"
              fontSize="3xl"
              fontWeight="bold"
              css={{
                background: "linear-gradient(to right, blue , green)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              You have successfully created your wallet.
            </Text>
            <Button
              onClick={gotoWallet}
              background="linear-gradient(to right, #4FC3F7, #9575CD)"
              color="white"
              _hover={{
                background: "linear-gradient(to right, #9575CD, #4FC3F7)",
              }}
            >
              Go to Wallet
            </Button>
            <Confetti />
          </Center>
        </>
    }



  </section>
}

export default Create
