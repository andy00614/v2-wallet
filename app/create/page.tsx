import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('./Home'),
  { ssr: false }
)

// 使用你的组件
function Component() {
  return <DynamicComponentWithNoSSR />
}

export default Component;
