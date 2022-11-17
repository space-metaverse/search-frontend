import { useMemo, useState } from 'react'

import { TextInput } from '@space-metaverse-ag/space-ui'
import { Products as IconProducts } from '@space-metaverse-ag/space-ui/icons'
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

const Empty = styled.div`
  width: 100%;
  display: flex;
  padding: 10rem 1.5rem;
  align-items: center;
  border-radius: ${({ theme }) => `${theme.radius.xl} 0 0 ${theme.radius.xl}`};
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.dark['100']};

  h2 {
    ${({ theme }) => theme.fonts.size.xl};
    color: ${({ theme }) => theme.colors.dark['800']};
    max-width: 18rem;
    margin-top: 1rem;
    text-align: center;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  
    b {
      color: ${({ theme }) => theme.colors.blue['400']};
    }
  }

  path {
    stroke: ${({ theme }) => theme.colors.blue['400']};
  }
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
  height: 100%;
  display: flex;
  position: relative;
  margin-top: 1.5rem;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  flex-direction: column;

  .spinner {
    margin: 2rem 0;
  }

  .is-scroll-view {
    gap: 1.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const App: NextPage = () => {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')

  const debounce = useDebounce(search)

  const {
    data,
    isLoading
  } = useProductsQuery({ page, search: debounce })

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

        {!isLoading && groupByStore.length <= 0 && (
          <Empty>
            <IconProducts width={40} height={40} />
            <h2>
              Sorry, we couldn&apos;t find any information for
              <b> &apos;{debounce}&apos;</b>
            </h2>
          </Empty>
        )}

        {!isLoading && groupByStore.map((store) => (
          <Card key={store.hub_id} {...store} />
        ))}
      </Products>
    </Page>
  )
}

export default App
