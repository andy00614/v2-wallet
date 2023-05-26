export const authorizationRouteName = 'authorization'
export const isAuthorizationPage = (pathname: string) => {
  return pathname.includes(`/${authorizationRouteName}`)
}
export const authorizationKey = 'redirectUrl'
