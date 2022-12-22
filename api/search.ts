import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface AlgoliaRoomProps {
  name: string
  stars: number
  image: string
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

export interface FacetsProps {
  price: Record<string, number>
  quantity: {
    true: number
    false: number
  }
  'room.stars': Record<string, number>
  product_type: {
    digital: number
    phygital: number
    physical: number
  }
  'room.categories': Record<string, number>
  'room.author.name': Record<string, number>
}

export interface AlgoliaProductProps {
  name: string
  room: AlgoliaRoomProps
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
  type: string
  category: string
}

interface RequestSearchAlgoliaProductsProps {
  page: number
  search: string
  category: string | null
}

interface ResponseSearchAlgoliaProductsProps {
  hits: AlgoliaProductProps[]
  page: number
  params: string
  nbHits: number
  nbPages: number
  hitsPerPage: number
}

export const getBaseURL = (): string => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'http://localhost:3333'
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
    rooms: builder.query<ResponseSearchAlgoliaProductsProps, RequestSearchProductsProps>({
      query: ({ type, page, category }) => ({
        url: `/search/rooms?page=${page}&size=16&orderBy=${type}${category !== 'all' ? `&category=${category}` : ''}`,
        method: 'GET'
      })
    }),
    algoliaProducts: builder.query<ResponseSearchAlgoliaProductsProps, RequestSearchAlgoliaProductsProps>({
      query: ({ page, search, category }) => ({
        url: `/search/algolia/products?page=${page}${search ? `&search=${search}` : ''}${category ? `&room_categories=${category}` : ''}`,
        method: 'GET'
      })
    })
  }),
  reducerPath: 'searchApi'
})

export const {
  useRoomsQuery,
  useAlgoliaProductsQuery
} = searchApi
