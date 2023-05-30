import AccountPage from './index'

interface IProps {
  params: { address: string[] }
}

async function Home(props: IProps) {
  const { params } = props
  const isCollectAddress = () => {
    return false
  }
  const isCollect = isCollectAddress()
  return (
    <AccountPage address={params.address}></AccountPage>
  )
}

export default Home
