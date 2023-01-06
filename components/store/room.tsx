import { Card, Chip, Button } from '@space-metaverse-ag/space-ui'
import { Image as IconImage } from '@space-metaverse-ag/space-ui/icons'
import type { ProductProps, RoomProps as ExtendRoomProps } from 'api/search'
import Image from 'next/image'
import Link from 'next/link'

import Styles from './styles'

type RoomProps = ExtendRoomProps & {
  onProduct: (props: ProductProps) => void
}

const Room: React.FC<RoomProps> = ({
  name,
  slug,
  hub_sid: hubSid,
  products,
  onProduct,
  thumbnail,
  categories,
  author_name: authorName,
  description
}) => {
  return (
    <Styles.Wrapper>
      <Styles.Card>
        <Styles.Image>
          {thumbnail && (
            <Image
              alt={name}
              src={thumbnail}
              fill
            />
          )}

          {!thumbnail && <IconImage width={40} height={40} />}
        </Styles.Image>

        <Styles.Content className="is-room">
          <h3>{name}</h3>

          {authorName && <span>By {authorName}</span>}

          {categories.length > 0 && (
            <div className="card-content-categories">
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

          <div className="card-content-actions">
            <Link
              href={`https://app.tryspace.com/${hubSid}/${slug}`}
              target="_blank"
            >
              <Button
                size="medium"
                color="blue"
                label="ENTER STORE"
              />
            </Link>

            <Link href={`/browse/${slug}`}>
              <Button
                size="medium"
                color="blue"
                label="LEARN MORE"
                outline
              />
            </Link>
          </div>
        </Styles.Content>
      </Styles.Card>

      {products.length > 0 && (
        <Styles.Products>
          {products.map((props, index) => {
            const {
              name,
              price,
              thumbnail
            } = props

            return (
              <Styles.Product
                as="div"
                key={`${name}-${index}`}
                onClick={() => onProduct(props)}
              >
                <Card image={thumbnail && thumbnail.length > 0 ? thumbnail : '/placeholder.jpg'}>
                  <h2>{name}</h2>
                  <span>
                    {price
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
                      : '-'}
                  </span>
                </Card>
              </Styles.Product>
            )
          })}
        </Styles.Products>
      )}
    </Styles.Wrapper>
  )
}

export default Room
