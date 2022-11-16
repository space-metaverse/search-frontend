import api from 'services/api'
import useSWR, { type KeyedMutator } from 'swr'

interface ErrorProps extends Error {
  status?: number
}

const handler = async (params: string): Promise<any> => {
  const { data } = await api.get(params)

  if (data) return data

  const error = new Error('Unauthorized!') as ErrorProps

  error.status = 403

  throw error
}

const useFetch = <T>(url: string | null): {
  data?: T
  error: ErrorProps
  mutate: KeyedMutator<T>
  loading: boolean
} => {
  const {
    data,
    error,
    ...rest
  } = useSWR<T>(url, handler, {
    revalidateOnFocus: false
  })

  const loading = !data && !error

  return {
    data: data ?? undefined,
    error,
    loading,
    ...rest
  }
}

export default useFetch
