import { useState } from 'react'

import icons from 'components/icons'
import Tabs, { TabsStyles } from 'components/tabs'
import Head from 'next/head'
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
`

const Wrapper = styled.div``

const Sidenav = styled.nav`
  gap: 1.5rem;
  width: 100%;
  display: flex;
  padding: 1.5rem;
  max-width: 20.5rem;
  border-radius: ${({ theme }) => theme.radius['2xl']};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark[100]};
`

const Category = styled(TabsStyles.Button)`
  display: flex;
  text-align: left;
  align-items: center;

  small {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme, selected }) => selected ? theme.colors.blue[400] : theme.colors.dark[800]};
    padding: .25rem .5rem;
    transition: ${({ theme }) => theme.transitions.ease};
    margin-left: .5rem;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    border-radius: ${({ theme }) => theme.radius.full};
    background-color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.dark[200]};
  }

  > div {
    margin-right: 1rem;
  }
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

const categories = [
  {
    id: 'all',
    name: 'All',
    children: []
  },
  {
    id: 'art',
    name: 'Arts & Crafts',
    children: []
  },
  {
    id: 'retail',
    name: 'Beauty & Health',
    children: [
      'Beauty And Personal Care',
      'Makeup',
      'Skin Care',
      'Hair Care',
      'Fragrance',
      'Foot, Hand & Nail Care',
      'Tools & Accessories'
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    children: []
  },
  {
    id: 'concerts',
    name: 'Shows',
    children: [
      'Fragrance',
      'Foot, Hand & Nail Care',
      'Tools & Accessories'
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    children: []
  }
]

const Browse: React.FC = () => {
  const [tab, setTab] = useState('FEATURED')
  const [category, setCategory] = useState('all')

  return (
    <Page>
      <Head>
        <title>Search | SPACE</title>
        <meta name='description' content='SPACE Accounts' />
      </Head>

      <Header>
        <h1><b>All Categories</b> 3,200 results</h1>

        <Tabs
          options={tabs}
          selected={tab}
          onSelected={setTab}
        />
      </Header>

      <Body>
        <Sidenav>
          {categories.map(({ id, name }) => (
            <div key={id}>
              <Category
                onClick={() => setCategory(id)}
                selected={category === id}
              >
                {icons[id as keyof typeof icons]}

                {name}

                <small>
                  150
                </small>

                {category === id && (
                  <TabsStyles.Bullet
                    key={id}
                    layoutId="categories"
                  />
                )}
              </Category>
            </div>
          ))}
        </Sidenav>

        <Wrapper />
      </Body>
    </Page>
  )
}

export default Browse
