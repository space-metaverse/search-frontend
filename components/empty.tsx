import type { PropsWithChildren } from 'react'

import { Products as IconProducts } from '@space-metaverse-ag/space-ui/icons'
import styled from 'styled-components'

const Styled = styled.div`
  width: 100%;
  display: flex;
  padding: 10rem 1.5rem;
  align-items: center;
  border-radius: ${({ theme }) => `${theme.radius.xl} 0 0 ${theme.radius.xl}`};
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.dark['100']};

  h2 {
    ${({ theme }) => theme.fonts.size.xl};
    color: ${({ theme }) => theme.colors.dark['800']};
    max-width: 18rem;
    margin-top: 1rem;
    text-align: center;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  
    b {
      color: ${({ theme }) => theme.colors.blue['400']};
    }
  }

  path {
    stroke: ${({ theme }) => theme.colors.blue['400']};
  }
`

const Empty: React.FC<PropsWithChildren> = ({ children }) => (
  <Styled>
    <IconProducts width={40} height={40} />

    <h2>
      {children}
    </h2>
  </Styled>
)

export default Empty
