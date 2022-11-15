import { InstantSearch } from 'react-instantsearch-hooks-web'
import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import algoliasearch from 'algoliasearch/lite'
import axios from 'axios'
import Auth from 'components/Auth'
import TopNav from 'layouts/topnav'
import Layout from 'layouts/wrapper'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'

import type { NextPageWithLayout } from '../types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID as string, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string)

const api = axios.create({
  baseURL: 'https://api.dev.tryspace.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

const Root = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const layout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />

        <Auth />

        <TopNav />

        <InstantSearch
          indexName="dev_stores_products"
          searchClient={{
            ...client
            // async search(requests) {
            //   return await fetch('https://api.dev.tryspace.com/search/product', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ requests })
            //   }).then(async res => await res.json())
            // }
          }}
        >
          <Layout>
            {layout(<Component {...pageProps} />)}
          </Layout>
        </InstantSearch>
      </ThemeProvider>
    </Provider>
  )
}

export default Root
