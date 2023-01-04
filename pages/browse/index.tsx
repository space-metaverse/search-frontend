import { useMemo, useState, useEffect } from 'react'

import { Button, Spinner } from '@space-metaverse-ag/space-ui'
import { getBaseURL, useRoomsQuery, type CategoryProps } from 'api/search'
import axios from 'axios'
import Categories from 'components/categories'
import Empty from 'components/empty'
import Card from 'components/store/room'
import Tabs from 'components/tabs'
import { type NextPage, type GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Page = styled.div`
  width: 100%;
  display: flex;
  padding: 1.5rem 4rem;
  margin-top: 6rem;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 0 1.25rem 2rem 1.25rem;
    margin-top: 5rem;
  }
`

const Body = styled.div`
  gap: 1.5rem;
  display: flex;
  margin-top: 2.5rem;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    ${({ theme }) => theme.fonts.size['2xl']};
    color: ${({ theme }) => theme.colors.dark[800]};
    font-weight: ${({ theme }) => theme.fonts.weight.normal};

    b {
      margin-right: .5rem;
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
    }
  }

  @media screen and (max-width: 1199px) {
    align-items: flex-start;
    flex-direction: column;

    > h1 {
      margin-bottom: 2rem;
    }
  }
`

const Wrapper = styled.div`
  gap: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  &.is-loading {
    justify-content: center;
  }
`

const LoadMore = styled(Button)`
  width: fit-content;
  margin: 3rem auto;
`

const tabs = [
  {
    key: 'FEATURED',
    label: 'Featured'
  },
  {
    key: 'MOST_POPULAR',
    label: 'Most Popular'
  },
  {
    key: 'LATEST',
    label: 'Latest'
  }
]

const Browse: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ categories }) => {
  const [tab, setTab] = useState('FEATURED')
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('all')

  const {
    query
  } = useRouter()

  const {
    data,
    isLoading,
    isFetching
  } = useRoomsQuery({
    page,
    type: tab,
    category
  })

  useEffect(() => {
    if (query?.category) setCategory(query.category as string)
  }, [query])

  const formatCategories = useMemo(() => {
    return [
      {
        id: -1,
        name: 'All',
        slug: 'all',
        children: []
      },
      ...categories
    ]
  }, [categories])

  const findCategory = useMemo(() => {
    return formatCategories.find(({ slug, children }) => {
      if (slug === category) return true

      if (children.length > 0) {
        const findChildren = children.filter((elem) => elem.slug === category)

        if (findChildren.length > 0) return true
      }

      return false
    })
  }, [category, formatCategories])

  return (
    <Page>
      <Head>
        <title>Rooms | SPACE</title>
      </Head>

      <Header>
        <h1><b>{(!findCategory || (findCategory && findCategory.id === -1) ? 'All Categories' : findCategory.name)}</b></h1>

        <Tabs
          options={tabs}
          selected={tab}
          onSelected={setTab}
        />
      </Header>

      <Body>
        <Categories
          selected={category}
          categories={formatCategories}
          onSelected={setCategory}
        />

        {isLoading && (
          <Wrapper className="is-loading">
            <Spinner />
          </Wrapper>
        )}

        {data && !isLoading && (
          <Wrapper>
            {!isFetching && !isLoading && data.data.length <= 0 && (
              <Empty>
                We did not find rooms with this category.
              </Empty>
            )}

            {!isLoading && data.data.map((store) => <Card key={store.id} {...store} />)}

            {isFetching && <Spinner />}

            {data.next_page && (
              <LoadMore
                size="large"
                color="blue"
                label="LOAD MORE"
                onClick={() => setPage((prev) => prev + 1)}
              />
            )}
          </Wrapper>
        )}
      </Body>
    </Page>
  )
}

export const getStaticProps: GetStaticProps<{ categories: CategoryProps[] }> = async () => {
  const baseUrl = getBaseURL()

  const res = await axios.get(`${baseUrl}/search/categories`)

  const categories: CategoryProps[] = res.data

  return {
    props: {
      categories: categories || []
    },

    revalidate: 60 * 60 * 24 // 24h
  }
}

export default Browse
