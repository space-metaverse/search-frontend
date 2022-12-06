import '@space-metaverse-ag/space-ui/index.css'

import { Provider } from 'react-redux'

import { TopNav, ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import type { AppProps } from 'next/app'
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

const Root = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const layout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
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
