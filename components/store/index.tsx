import { useState } from 'react'

import { Card, Chip, Button } from '@space-metaverse-ag/space-ui'
import { Image as IconImage } from '@space-metaverse-ag/space-ui/icons'
import type { RoomProps, ProductProps } from 'api/search'
import Link from 'next/link'

import Styles from './styles'

export interface StoreProps extends RoomProps {
  products: ProductProps[]
}

const Store: React.FC<StoreProps> = ({
  name,
  author,
  hub_sid: hubSid,
  hub_slug: hubSlug,
  products,
  categories,
  description
}) => {
  const [more, setMore] = useState(false)

  const filterProductsThatHaveAnImage = products.filter((product) => product.thumbnail_url)

  const removeDuplicateProducts = [...new Map(filterProductsThatHaveAnImage.map(item => [item.name, item])).values()]

  const numberOfProducts = more ? removeDuplicateProducts.length + 1 : 6

  return (
    <Styles.Wrapper>
      <Styles.Card>
        <Styles.Image>
          <IconImage width={40} height={40} />
        </Styles.Image>

        <Styles.Content>
          <h3>{name}</h3>

          <span>By {author.name}</span>

          {categories.length > 0 && (
            <div>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  color="grey"
                />
              ))}
            </div>
          )}

          <p>{description}</p>

          <Link
            href={`https://app.tryspace.com/${hubSid}/${hubSlug}`}
            target="_blank"
          >
            <Button
              size="medium"
              color="blue"
              label="ENTER STORE"
            />
          </Link>
        </Styles.Content>
      </Styles.Card>

      {removeDuplicateProducts.length > 0 && (
        <Styles.Products>
          {removeDuplicateProducts.slice(0, numberOfProducts).map(({
            name,
            price,
            currency,
            objectID,
            thumbnail_url: thumbnailUrl
          }) => (
            <Styles.Product
              key={objectID}
              href={`https://app.tryspace.com/${hubSid}/${hubSlug}`}
              target="_blank"
            >
              <Card image={thumbnailUrl}>
                <h2>{name}</h2>
                <span>
                  {price
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: currency ?? 'USD' }).format(price)
                    : '-'}
                </span>
              </Card>
            </Styles.Product>
          ))}
        </Styles.Products>
      )}

      {removeDuplicateProducts.length > 6 && (
        <Button
          size="medium"
          color="grey"
          label={more ? 'Less results' : 'More results'}
          outline
          onClick={() => setMore((prev) => !prev)}
        />
      )}
    </Styles.Wrapper>
  )
}

export default Store
