import Link from 'next/link'
import styled from 'styled-components'

const Card = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  display: flex;
  border-radius: ${({ theme }) => theme.radius.xl};
  align-items: center;
`

const Wrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  padding: 1.5rem;
  flex-direction: column;

  > h3 {
    ${({ theme }) => theme.fonts.size.xl};
    color: ${({ theme }) => theme.colors.dark['800']};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  > p {
    ${({ theme }) => theme.fonts.size.md};
    color: ${({ theme }) => theme.colors.dark['500']};
    margin-top: .5rem;
    font-family: ${({ theme }) => theme.fonts.family.body};
    margin-bottom: 1rem;
  }

  > span {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark['500']};
    margin-top: .25rem;
    font-family: ${({ theme }) => theme.fonts.family.body};
  }
`

const Product = styled(Link)`
  color: inherit;
  text-decoration: none;

  h2 {
    ${({ theme }) => theme.fonts.size.md};
    color: ${({ theme }) => theme.colors.dark['800']};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  span {
    ${({ theme }) => theme.fonts.size.md};
    color: ${({ theme }) => theme.colors.dark['500']};
    margin-top: .5rem;
    font-family: ${({ theme }) => theme.fonts.family.body};
  }

  img {
    height: 100%;
    max-height: 12rem;
  }

  > div {
    width: 100%;
  }
`

const Products = styled.div`
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export default {
  Card,
  Product,
  Wrapper,
  Content,
  Products
}
