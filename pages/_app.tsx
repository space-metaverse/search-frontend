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
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
          searchClient={{
            ...client,

            async search(requests) {
              const {
                data
              } = await api.post('/search/products', {
                requests
              })

              return data
            },

            async searchForFacetValues(requests) {
              const {
                data
              } = await api.post('/search/products/facet', {
                requests
              })

              return data
            }
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
