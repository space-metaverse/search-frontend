import { Card, Button } from '@space-metaverse-ag/space-ui'
import Link from 'next/link'

import type { RoomProps, ProductProps } from '../../types'
import Styles from './styles'

export type StoreProps = RoomProps & {
  products: ProductProps[]
}

const Store: React.FC<StoreProps> = ({
  name,
  author,
  hub_slug: hubSlug,
  products,
  description
}) => (
  <Styles.Wrapper>
    <Styles.Card>
      <Styles.Content>
        <h3>{name}</h3>

        <span>By {author.name}</span>

        <p>{description}</p>

        <Link
          href={`https://app.tryspace.com/${hubSlug}`}
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

    {products.length > 0 && (
      <Styles.Products>
        {products.map(({
          name,
          price,
          currency,
          objectID,
          thumbnail_url: thumbnailUrl
        }) => (
          <Styles.Product
            key={objectID}
            href={`https://app.tryspace.com/${hubSlug}/product/${objectID}`}
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
  </Styles.Wrapper>
)

export default Store
