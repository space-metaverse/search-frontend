import { useRef, useState } from 'react'

import {
  Chip,
  Card,
  Modal,
  Button,
  Spinner,
  type ModalProps
} from '@space-metaverse-ag/space-ui'
import { Share as IconShare, Image as IconImage } from '@space-metaverse-ag/space-ui/icons'
import { getBaseURL, type RoomProps, type ProductProps } from 'api/search'
import axios from 'axios'
// import Tabs, { type TabsProps } from 'components/tabs'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Page = styled.div`
  width: 100%;
  margin: 6rem auto 0;
  display: flex;
  padding: 1.5rem;
  max-width: 85.5rem;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    margin-top: 5rem;
  }
`

const Head = styled.div`
  display: flex;
  margin-top: 1.5rem;
  align-items: center;
  justify-content: space-between;

  h1 {
    ${({ theme }) => theme.fonts.size['3xl']};
    color: ${({ theme }) => theme.colors.dark[800]};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  .head-actions {
    gap: 1rem;
    display: flex;
    align-items: center;

    &-share {
      display: flex;
      align-items: center;

      div {
        margin-right: .5rem;

        path {
          stroke: ${({ theme }) => theme.colors.dark[600]};
          transition: ${({ theme }) => theme.transitions.ease};
        }
      }

      &:hover path {
        stroke: ${({ theme }) => theme.colors.dark[500]};
      }
    }
  }

  @media screen and (max-width: 1024px) {
    gap: 1.5rem;
    align-items: flex-start;
    flex-direction: column;
  }

  @media screen and (max-width: 584px) {
    .head-actions {
      width: 100%;
      flex-direction: column;

      a,
      button {
        width: 100%;
      }
    }
  }
`

const Body = styled.div`
  gap: 1rem;
  margin: 1.5rem 0;
  display: grid;
  padding: 1.5rem 0;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  grid-template-columns: repeat(2, 1fr);

  .body {
    &-content {
      gap: 1.5rem;
      display: flex;
      flex-direction: column;

      p {
        ${({ theme }) => theme.fonts.size.md};
        color: ${({ theme }) => theme.colors.dark[600]};
        max-width: 42.5rem;
        font-family: ${({ theme }) => theme.fonts.family.body};
      }

      &-categories {
        gap: .5rem;
        display: flex;
        align-items: center;
      }
    }

    &-preview {
      width: 100%;
      height: 15.5rem;
      border-radius: ${({ theme }) => theme.radius['2xl']};
      background-color: ${({ theme }) => theme.colors.dark[200]};
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const Banner = styled.div`
  width: 100%;
  height: 18.75rem;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius['2xl']};
  justify-content: center;

  img {
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius['2xl']};
  }
`

const Products = styled.div`
  gap: 2rem;
  display: flex;
  flex-direction: column;

  .modal {
    > div {
      max-width: 31rem;

      > div {
        padding: 0;
      }
    }

    &-wrapper {
      display: flex;
      flex-direction: column;

      &-body {
        display: flex;
        padding: 2rem;
        flex-direction: column;

        h3,
        span {
          ${({ theme }) => theme.fonts.size.xl};
        }

        a {
          margin-top: 2rem;

          &,
          button {
            width: 100%;
          }
        }

        p {
          ${({ theme }) => theme.fonts.size.md};
          color: ${({ theme }) => theme.colors.dark[600]};
          margin-top: .5rem;
          font-family: ${({ theme }) => theme.fonts.family.body};
        }

        h3 {
          color: ${({ theme }) => theme.colors.dark[800]};
        }

        span {
          color: ${({ theme }) => theme.colors.dark[600]};
        }
      }

      &-image {
        width: 100%;
        height: 25rem;
        display: flex;
        position: relative;
        align-items: center;
        border-radius: ${({ theme }) => theme.radius['2xl']};
        justify-content: center;

        img {
          border-radius: ${({ theme }) => theme.radius['2xl']};
        }
      }
    }
  }

  .products {
    &-head {
      gap: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        ${({ theme }) => theme.fonts.size['2xl']};
        color: ${({ theme }) => theme.colors.dark[800]};
        font-weight: ${({ theme }) => theme.fonts.weight.normal};
        
        b {
          font-weight: ${({ theme }) => theme.fonts.weight.bold};
          margin-right: 1.5rem;
        }
      }
    }

    &-body {
      gap: 1.5rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      h2 {
        ${({ theme }) => theme.fonts.size.xl};
        color: ${({ theme }) => theme.colors.dark[800]};
      }
      
      span {
        ${({ theme }) => theme.fonts.size.md};
        color: ${({ theme }) => theme.colors.dark[600]};
        margin-top: .5rem;
        font-family: ${({ theme }) => theme.fonts.family.body};
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .products-body {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 724px) {
    .products-body {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 524px) {
    .products-body {
      grid-template-columns: repeat(1, 1fr);

      h2 {
        ${({ theme }) => theme.fonts.size.md};
      }

      img {
        height: 11rem;
        min-height: 11rem;
      }

      > div {
        width: 100%;
      }
    }
  }
`

const Room: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const [copied, setCopied] = useState(false)
  const [product, setProduct] = useState<ProductProps | null>(null)
  // const [category, setCategory] = useState('all')

  const ref = useRef<ModalProps>(null)

  const {
    isFallback
  } = useRouter()

  if (isFallback) return <Spinner size="small" />

  const {
    name,
    slug,
    hub_sid: hubSid,
    products,
    thumbnail,
    categories,
    description
  } = data

  const store = `https://app.tryspace.com/${hubSid}/${slug}`

  const copy = (): void => {
    navigator.clipboard.writeText(store)

    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  // const listCategories = (): TabsProps['options'] => {
  //   return ([
  //     {
  //       key: 'all',
  //       label: 'All'
  //     },
  //     ...categories?.map((cat) => ({
  //       key: cat,
  //       label: cat
  //     }))
  //   ])
  // }

  return (
    <Page>
      <Banner>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={name}
            fill
            priority
          />
        )}

        {!thumbnail && <IconImage width={40} height={40} />}
      </Banner>

      <Head>
        <h1>{name}</h1>

        <div className="head-actions">
          <Link
            href={store}
            target="_blank"
          >
            <Button
              size="medium"
              color="blue"
              label="ENTER STORE"
            />
          </Link>

          <Button
            size="medium"
            color="grey"
            label={(
              <>
                <IconShare />
                {copied ? 'COPIED LINK' : 'SHARE STORE'}
              </>
            )}
            outline
            onClick={copy}
            className="head-actions-share"
          />
        </div>
      </Head>

      <Body>
        <div className="body-content">
          {categories.length > 0 && (
            <div className="body-content-categories">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  color="grey"
                />
              ))}
            </div>
          )}

          {description && <p>{description}</p>}
        </div>

        <div className="body-preview" />
      </Body>

      {products.length > 0 && (
        <Products>
          <div className="products-head">
            <h2>
              <b>Products</b>
              {products.length} result{products.length > 1 ? 's' : ''}
            </h2>

            {/* {categories.length > 0 && (
              <Tabs
                options={listCategories()}
                selected={category}
                onSelected={setCategory}
            />
            )} */}
          </div>

          <div className="products-body">
            {products.map((props, index) => {
              const {
                name,
                price,
                thumbnail
              } = props

              return (
                <Card
                  key={`${name}-${index}`}
                  image={thumbnail && thumbnail.length > 0 ? thumbnail : '/placeholder.jpg'}
                  onClick={() => {
                    setProduct(props)

                    ref.current?.opened()
                  }}
                >
                  <h2>{name}</h2>

                  <span>
                    {price
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format(price)
                      : '-'}
                  </span>
                </Card>
              )
            })}
          </div>

          <Modal
            ref={ref}
            close={false}
            className="modal"
          >
            {product && (
              <div className="modal-wrapper">
                <div className="modal-wrapper-image">
                  {!product.thumbnail && <IconImage width={40} height={40} />}

                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt=""
                      fill
                    />
                  )}
                </div>

                <div className="modal-wrapper-body">
                  <h3>{product.name}</h3>

                  {product.price && (
                    <span>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format(product.price)}
                    </span>
                  )}

                  {product.description && <p>{product.description}</p>}

                  <Link
                    href={store}
                    target="_blank"
                  >
                    <Button
                      size="medium"
                      color="blue"
                      label="VIEW PRODUCT IN 3D STORE"
                    />
                  </Link>
                </div>
              </div>
            )}
          </Modal>
        </Products>
      )}
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],

  fallback: true
})

export const getStaticProps: GetStaticProps<{ data: RoomProps }> = async ({ params }) => {
  const baseUrl = getBaseURL()

  const {
    data
  } = await axios.get(`${baseUrl}/search/rooms/${params?.slug as string}`)

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data
    },

    revalidate: 60 * 60 * 24 // 24h
  }
}

export default Room
