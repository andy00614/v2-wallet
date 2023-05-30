import dynamic from 'next/dynamic'
const ComponentWithJSEncrypt = dynamic(
  () => import('./'), // path of your component
  { ssr: false }
)

export default () => {
  return <ComponentWithJSEncrypt />
}
