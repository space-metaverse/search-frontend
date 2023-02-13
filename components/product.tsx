import { Button } from '@space-metaverse-ag/space-ui'
import { Image as IconImage } from '@space-metaverse-ag/space-ui/icons'
import type { ProductProps as CustomProductProps } from 'api/search'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

interface ProductProps extends CustomProductProps {
  store: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .wrapper {
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
        object-fit: cover;
        border-radius: ${({ theme }) => theme.radius['2xl']};
      }
    }
  }
`

const Product: React.FC<ProductProps> = ({
  name,
  price,
  store,
  thumbnail,
  description
}) => (
  <Wrapper>
    <div className="wrapper-image">
      {!thumbnail && <IconImage width={40} height={40} />}

      {thumbnail && (
        <Image
          src={thumbnail}
          alt=""
          fill
        />
      )}
    </div>

    <div className="wrapper-body">
      <h3>{name}</h3>

      {price && (
        <span>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format(price)}
        </span>
      )}

      {description && <p>{description}</p>}

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
  </Wrapper>
)

export default Product
