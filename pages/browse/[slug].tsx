import { useState } from 'react'

import { Chip, Button, Spinner } from '@space-metaverse-ag/space-ui'
import { Share as IconShare, Image as IconImage } from '@space-metaverse-ag/space-ui/icons'
import { getBaseURL, type RoomProps } from 'api/search'
import axios from 'axios'
import Tabs, { type TabsProps } from 'components/tabs'
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

  .products-head {
    gap: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      ${({ theme }) => theme.fonts.size['2xl']};
      color: ${({ theme }) => theme.colors.dark[800]};
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
    }
  }
`

const Room: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const [copied, setCopied] = useState(false)
  const [category, setCategory] = useState('all')

  const {
    isFallback
  } = useRouter()

  if (isFallback) return <Spinner size="small" />

  const {
    name,
    slug,
    hub_sid: hubSid,
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

  const listCategories = (): TabsProps['options'] => {
    return ([
      {
        key: 'all',
        label: 'All'
      },
      ...categories?.map((cat) => ({
        key: cat,
        label: cat
      }))
    ])
  }

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

      <Products>
        <div className="products-head">
          <h2>Products</h2>

          {categories.length > 0 && (
            <Tabs
              options={listCategories()}
              selected={category}
              onSelected={setCategory}
          />
          )}
        </div>
      </Products>
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],

  fallback: true
})

export const getStaticProps: GetStaticProps<{ data: RoomProps }> = async ({ params }) => {
  const baseUrl = getBaseURL()

  const res = await axios.get(`${baseUrl}/search/rooms/${params?.slug as string}`)

  const room: RoomProps = res.data

  if (!room) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: room
    },

    revalidate: 60 * 60 * 24 // 24h
  }
}

export default Room
