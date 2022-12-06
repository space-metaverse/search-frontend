import {
  useMemo,
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren
} from 'react'

import { SideNav, type SideNavProps } from '@space-metaverse-ag/space-ui'
import {
  Art,
  Show,
  Sport,
  Space,
  Meetup,
  Retail,
  Fashion,
  Concert,
  Influence
} from '@space-metaverse-ag/space-ui/icons'
import { type FacetsProps } from 'api/search'
import type { NextPage } from 'next'

import Styled from './styles'

const options = [
  {
    Icon: Art,
    label: 'Art'
  },
  {
    Icon: Influence,
    label: 'Influencer Rooms'
  },
  {
    Icon: Fashion,
    label: 'Fashion'
  },
  {
    Icon: Show,
    label: 'Shows'
  },
  {
    Icon: Sport,
    label: 'Sports'
  },
  {
    Icon: Meetup,
    label: 'Meetups'
  },
  {
    Icon: Concert,
    label: 'Concerts'
  },
  {
    Icon: Retail,
    label: 'Retail'
  }
]

interface LayoutProps {
  categories: FacetsProps['room.categories']
  onCategory: Dispatch<SetStateAction<string | null>>
}

const Layout: NextPage<PropsWithChildren<LayoutProps>> = ({
  children,
  categories,
  onCategory
}) => {
  const onNavigate = (route: string): void => onCategory((prev) => prev !== route ? route : null)

  const filterCategories: SideNavProps['routes'] = useMemo(() => {
    const filterByQuantity = Object.entries(categories).filter(([_, value]) => value > 0)

    return filterByQuantity.map(([key, value]) => {
      const findOption = options.find(({ label }) => label.toLowerCase().includes(key))

      return ({
        key,
        Icon: findOption?.Icon ?? Space,
        label: `${key} (${value})`,
        route: key,
        disabled: false
      })
    })
  }, [categories])

  return (
    <Styled.Wrapper>
      <SideNav
        title="Categories"
        routes={filterCategories}
        onNavigate={onNavigate}
      />

      <Styled.Content>
        {children}
      </Styled.Content>
    </Styled.Wrapper>
  )
}

export default Layout
