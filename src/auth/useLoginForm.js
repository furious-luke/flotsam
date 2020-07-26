import {useForm} from '../hooks/form'
import api, {$, setBearer} from '../api'
import {useGlobal} from '../useGlobal'
import {toLocalStorage} from '../utils/browser'

export function useLoginForm(initial) {
  const [, setAuth] = useGlobal('auth')
  return useForm(
    initial,
    async values => {
      const response = await api.api.mutation(
        {
          authenticate: [
            {
              input: $`values`
            },
            {
              token: true,
              user: {
                id: true,
                email: true
              }
            }
          ]
        },
        {
          values
        }
      )
      const result = response.authenticate || {}
      setBearer(result.token)
      toLocalStorage('auth', result)
      setAuth(result)
      return result
    }
  )
}
