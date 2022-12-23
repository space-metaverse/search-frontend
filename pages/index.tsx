import { useMemo, useState, useEffect } from 'react'

import { Spinner, TextInput, Pagination } from '@space-metaverse-ag/space-ui'
import { getBaseURL, type FacetsProps, useAlgoliaProductsQuery } from 'api/search'
import axios from 'axios'
import Empty from 'components/empty'
import Layout from 'components/layout'
import Card, { type StoreProps } from 'components/store/algolia'
import useDebounce from 'hooks/useDebounce'
import { type NextPage, type GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .paginate {
    margin: 1.5rem auto;
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
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  margin: 1.5rem 0;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

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

const App: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  facets
}) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const debounce = useDebounce(search)

  const {
    query
  } = useRouter()

  const {
    data,
    isLoading,
    isFetching
  } = useAlgoliaProductsQuery({
    page: page - 1,
    search: debounce,
    category
  })

  useEffect(() => {
    if (query.q ?? query.keyword) setSearch((query.q ?? query.keyword) as string)

    if (query.category) setCategory(query.category as string)
  }, [query])

  useEffect(() => {
    if (debounce) setPage(1)
  }, [debounce])

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
    <Layout
      categories={facets['room.categories']}
      onCategory={setCategory}
    >
      <Head>
        <title>Search | SPACE</title>
      </Head>

      <Page>
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
          {(isFetching || isLoading) && <Spinner />}

          {!isFetching && !isLoading && groupByStore.length <= 0 && (
            <Empty>
              Sorry, we couldn&apos;t find any information for
              <b> &apos;{debounce}&apos;</b>
            </Empty>
          )}

          {!isFetching && !isLoading && groupByStore.map((store) => (
            <Card key={store.hub_id} {...store} />
          ))}
        </Products>

        {data && !isFetching && !isLoading && (
          <Pagination
            onPage={(position) => {
              setPage(position)

              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            pageSize={data.hitsPerPage}
            totalCount={data.nbHits}
            currentPage={page}
          />
        )}
      </Page>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ facets: FacetsProps }> = async () => {
  const baseUrl = getBaseURL()

  const res = await axios.get(`${baseUrl}/search/algolia/facets`)

  const facets: FacetsProps = res.data

  return {
    props: {
      facets
    },

    revalidate: 60 * 60 * 24 // 24h
  }
}

export default App
