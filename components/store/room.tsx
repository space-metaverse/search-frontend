import { Chip, Button } from '@space-metaverse-ag/space-ui'
import { Image as IconImage } from '@space-metaverse-ag/space-ui/icons'
import type { RoomProps } from 'api/search'
import Image from 'next/image'
import Link from 'next/link'

import Styles from './styles'

const Room: React.FC<RoomProps> = ({
  name,
  slug,
  hub_sid: hubSid,
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
    </Styles.Wrapper>
  )
}

export default Room
