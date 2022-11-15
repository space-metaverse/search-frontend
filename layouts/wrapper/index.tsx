import type { PropsWithChildren } from 'react'

import type { NextPage } from 'next'

import SideNav from '../sidenav'
import Styled from './styles'

const Layout: NextPage<PropsWithChildren> = ({ children }) => (
  <Styled.Wrapper>
    <SideNav />

    <Styled.Content>
      {children}
    </Styled.Content>
  </Styled.Wrapper>
)

export default Layout
