import { useState } from 'react'

import { Logout as IconLogout } from '@space-metaverse-ag/space-ui/icons'
import Image from 'next/image'

import Styled from './styles'

const routes = [
  {
    route: 'https://app.tryspace.com/faq',
    label: 'faq',
    disabled: false,
    isExternal: true
  }
]

const TopNav: React.FC = () => {
  const [responsive, setResponsive] = useState(false)

  return (
    <Styled.Wrapper show={responsive}>
      <Styled.Logo href="/">
        <Image
          src="/space-logo.png"
          alt="Logo space"
          width={58}
          height={24}
          priority
        />
      </Styled.Logo>

      <Styled.Routes>
        {routes.map(({
          route,
          label,
          disabled,
          isExternal
        }) => (
          <li key={route}>
            <Styled.Route
              href={route}
              target={isExternal ? '_blank' : '_self'}
              disabled={disabled}
            >
              {label}
            </Styled.Route>
          </li>
        ))}
      </Styled.Routes>

      <Styled.Actions href="https://app.tryspace.com/login">
        <IconLogout />

        <p>SIGN IN</p>
      </Styled.Actions>

      <Styled.Hamburger
        show={responsive}
        onClick={() => setResponsive((prev) => !prev)}
      >
        <div />
        <div />
        <div />
      </Styled.Hamburger>
    </Styled.Wrapper>
  )
}

export default TopNav
