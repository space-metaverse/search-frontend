import '@algolia/autocomplete-theme-classic'

import { InstantSearch } from 'react-instantsearch-hooks-web'
import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import Auth from 'components/Auth'
import searchClient from 'helpers/algolia'
import TopNav from 'layouts/topnav'
import Layout from 'layouts/wrapper'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'

import type { NextPageWithLayout } from '../types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Root = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const layout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />

        <Auth />

        <TopNav />

        <Layout>
          {layout(<Component {...pageProps} />)}
        </Layout>

        {/* <InstantSearch
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
          searchClient={searchClient}
        >
          <Layout>
            {layout(<Component {...pageProps} />)}
          </Layout>
        </InstantSearch> */}
      </ThemeProvider>
    </Provider>
  )
}

export default Root
