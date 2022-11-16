import type { ReactNode, ReactElement } from 'react'

import type { NextPage } from 'next'

export * from './api'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}
