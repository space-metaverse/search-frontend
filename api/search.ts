import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface RoomProps {
  name: string
  stars: number
  hub_id: string
  author: {
    name: string
  }
  hub_sid: string
  hub_slug: string
  categories: string[]
  description: string | null
  commerce_type: string
}

export interface ProductProps {
  name: string
  room: RoomProps
  price: number
  currency: string
  objectID: string
  quantity: boolean
  model_url: string
  description: string
  product_type: 'digital' | 'physical'
  thumbnail_url: string
}

interface RequestSearchProductsProps {
  page: number
  search: string
}

interface ResponseSearchProductsProps {
  hits: ProductProps[]
  page: number
  params: string
  nbHits: number
  nbPages: number
  hitsPerPage: number
}

const getBaseURL = (): string => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'https://api.dev.tryspace.com'
    case 'dev':
      return 'https://api.dev.tryspace.com'
    case 'qa':
      return 'https://api.qa.tryspace.com'
    case 'prod':
      return 'https://api.tryspace.com'
    default:
      console.log('No ENV set')
      return 'https://api.dev.tryspace.com'
  }
}

export const searchApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: (builder) => ({
    products: builder.query<ResponseSearchProductsProps, RequestSearchProductsProps>({
      query: ({ page, search }) => ({
        url: `/search/products?page=${page}${search ? `&search=${search}` : ''}`,
        method: 'GET'
      })
    })
  }),
  reducerPath: 'searchApi'
})

export const {
  useProductsQuery
} = searchApi
