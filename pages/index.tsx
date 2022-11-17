import { useMemo, useState } from 'react'

// import InfiniteScroll from 'react-infinite-scroller'
import { TextInput } from '@space-metaverse-ag/space-ui'
import { useProductsQuery } from 'api/search'
import Spinner from 'components/Spinner'
import Card, { type StoreProps } from 'components/store'
import useDebounce from 'hooks/useDebounce'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

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
  height: 100%;
  display: flex;
  position: relative;
  margin-top: 1.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .spinner {
    margin: 2rem 0;
  }
`

const App: NextPage = () => {
  // const [size, setSize] = useState(0)
  const [search, setSearch] = useState('')

  const debounce = useDebounce(search)

  const {
    data,
    isLoading
  } = useProductsQuery({ search: debounce })

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
        {isLoading && <Spinner />}

        {!isLoading && groupByStore.map((store) => (
          <Card key={store.hub_id} {...store} />
        ))}
      </Products>
    </Page>
  )
}

export default App
