import { useMemo, useState } from 'react'

import { TextInput } from '@space-metaverse-ag/space-ui'
import useDebounce from 'hooks/useDebounce'
import useFetch from 'hooks/useFetch'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import type { RoomProps, ProductProps } from '../types'

type GroupProductsByRoomProps = RoomProps & {
  products: ProductProps[]
}

interface RequestSearchProductsProps {
  hits: ProductProps[]
  page: number
  params: string
}

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const App: NextPage = () => {
  const [search, setSearch] = useState('')

  const debounce = useDebounce(search)

  const {
    data
  } = useFetch<RequestSearchProductsProps>('/search/products')

  const groupByRoom = useMemo(() => {
    if (data) {
      const {
        hits
      } = data

      const reduce = hits.reduce<Record<string, GroupProductsByRoomProps>>((acc, curr) => {
        acc[curr.room.hub_id] = {
          ...curr.room,
          ...(acc[curr.room.hub_id] || { products: [] })
        }

        acc[curr.room.hub_id].products.push(curr)

        return acc
      }, {})

      return Object.values(reduce)
    }

    return []
  }, [data])

  return (
    <Page>
      <Head>
        <title>Search | SPACE</title>
        <meta name='description' content='SPACE Accounts' />
      </Head>

      <TextInput
        label=""
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        placeholder="Search for products or stores ..."
      />
    </Page>
  )
}

export default App
