import { getFromLocalStorage } from '../../utils/local-storage'

export const checkAuthorization = (): boolean => {
  const accessToken = getFromLocalStorage('access-token')
  return !!accessToken
}
