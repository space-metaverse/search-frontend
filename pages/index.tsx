import { useMemo, useState } from 'react'

import { TextInput } from '@space-metaverse-ag/space-ui'
import Card, { type StoreProps } from 'components/store'
import useDebounce from 'hooks/useDebounce'
import useFetch from 'hooks/useFetch'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import type { ProductProps } from '../types'

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

const Title = styled.h2`
  ${({ theme }) => theme.fonts.size['3xl']};
  color: ${({ theme }) => theme.colors.dark['800']};
  margin-top: 1.5rem;
  font-weight: ${({ theme }) => theme.fonts.weight.normal};

  b {
    margin-left: .5rem;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }
`

const Products = styled.div`
  gap: 1.5rem;
  display: flex;
  margin-top: 1.5rem;
  flex-direction: column;
`

const App: NextPage = () => {
  const [search, setSearch] = useState('')

  const debounce = useDebounce(search)

  const {
    data
  } = useFetch<RequestSearchProductsProps>('/search/products')

  const groupByStore = useMemo(() => {
    if (data) {
      const {
        hits
      } = data

      const reduce = hits.reduce<Record<string, StoreProps>>((acc, curr) => {
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

      {debounce && groupByStore.length > 0 && (
        <Title>
          Search Results:
          <b>
            {groupByStore.length} store{groupByStore.length > 1 ? 's' : ''}
          </b>
        </Title>
      )}

      <Products>
        {groupByStore.map((store) => (
          <Card key={store.hub_id} {...store} />
        ))}
      </Products>
    </Page>
  )
}

export default App
