import { useState } from 'react'
import { SearchBox } from 'react-instantsearch-hooks-web'

import { TextInput } from '@space-metaverse-ag/space-ui'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const App: NextPage = () => {
  const [search, setSearch] = useState('')

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
        placeholder="Search"
      />

      <SearchBox />
    </Page>
  )
}

export default App
