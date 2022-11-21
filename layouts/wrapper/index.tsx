import type { PropsWithChildren } from 'react'

import { SideNav, type SideNavProps } from '@space-metaverse-ag/space-ui'
import {
  Art,
  Show,
  Sport,
  Meetup,
  Retail,
  Fashion,
  Concert,
  Influence
} from '@space-metaverse-ag/space-ui/icons'
import type { NextPage } from 'next'

import Styled from './styles'

const options: SideNavProps['routes'] = [
  {
    Icon: Art,
    label: 'Art',
    route: null,
    disabled: false
  },
  {
    Icon: Influence,
    label: 'Influencer Rooms',
    route: null,
    disabled: false
  },
  {
    Icon: Fashion,
    route: null,
    label: 'Fashion',
    disabled: false
  },
  {
    Icon: Show,
    route: null,
    label: 'Shows',
    disabled: false
  },
  {
    Icon: Sport,
    route: null,
    label: 'Sports',
    disabled: false
  },
  {
    Icon: Meetup,
    route: null,
    label: 'Meetups',
    disabled: false
  },
  {
    Icon: Concert,
    route: null,
    label: 'Concerts',
    disabled: false
  },
  {
    Icon: Retail,
    route: null,
    label: 'Retail',
    disabled: false
  }
]

const Layout: NextPage<PropsWithChildren> = ({ children }) => (
  <Styled.Wrapper>
    <SideNav routes={options} />

    <Styled.Content>
      {children}
    </Styled.Content>
  </Styled.Wrapper>
)

export default Layout
