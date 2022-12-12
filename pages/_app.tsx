import '@space-metaverse-ag/space-ui/index.css'

import { Provider } from 'react-redux'

import * as snippet from '@segment/snippet'
import { TopNav, ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { store } from 'redux/store'

import type { NextPageWithLayout } from '../types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const routes = [
  {
    route: 'https://app.tryspace.com/faq',
    label: 'faq',
    disabled: false,
    isExternal: true
  }
]

const analytics = (): string => {
  const options = {
    page: true,
    apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
  }

  if (process.env.NODE_ENV === 'development') return snippet.max(options)

  return snippet.min(options)
}

const Root = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const layout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: analytics() }}
      />

      <ThemeProvider>
        <GlobalStyles />

        <TopNav
          routes={routes}
          signInRoute="https://app.tryspace.com/login"
        />

        {layout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  )
}

export default Root
