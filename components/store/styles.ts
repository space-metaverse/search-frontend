import Link from 'next/link'
import styled from 'styled-components'

const Card = styled.div`
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  display: flex;
  border-radius: ${({ theme }) => theme.radius.xl};
  align-items: center;
`

const Image = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  min-width: 24rem;
  max-width: 24rem;
  min-height: 16rem;
  align-items: center;
  border-radius: ${({ theme }) => `${theme.radius.xl} 0 0 ${theme.radius.xl}`};
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.dark['100']};

  img {
    border-radius: ${({ theme }) => `${theme.radius.xl} 0 0 ${theme.radius.xl}`};
  }

  path {
    stroke: ${({ theme }) => theme.colors.blue['400']};
  }
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
    font-family: ${({ theme }) => theme.fonts.family.body};
  }

  > span {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark['500']};
    margin-top: .25rem;
    font-family: ${({ theme }) => theme.fonts.family.body};
  }

  &.is-room {
    > p {
      margin-top: 1rem;
    }
  }

  &.is-algolia {
    > p {
      margin-top: .5rem;
      margin-bottom: 1rem;
    }
  }

  .card-content {
    &-actions {
      gap: 1rem;
      margin-top: 1.5rem;

      a {
        text-decoration: none;
      }
    }

    &-categories {
      gap: .5rem;
      margin-top: .75rem;
    }

    &-actions,
    &-categories {
      display: flex;
      align-items: center;
    }
  }
`

const Product = styled(Link)`
  color: inherit;
  cursor: pointer;
  text-decoration: none;

  > div {
    cursor: inherit;
  }

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

const Wrapper = styled.div`
  gap: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  > button {
    width: fit-content;
    margin: 0 auto;
  }

  @media screen and (max-width: 1024px) {
    ${Card} {
      flex-direction: column;

      ${Image} {
        height: 10rem;
        min-width: 100%;
        max-width: 100%;
      }
    }
  }

  @media screen and (max-width: 720px) {
    ${Products} {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 524px) {
    ${Products} {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`

export default {
  Card,
  Image,
  Product,
  Wrapper,
  Content,
  Products
}
