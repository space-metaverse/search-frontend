import { Snippet } from 'react-instantsearch-hooks-web'

import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types'

interface HitProps {
  hit: AlgoliaHit<{
    name: string
    image: string
    brand: string
    categories: string[]
  }>
}

const Hit = ({ hit }: HitProps) => {
  console.log(hit)

  return (
    <article className="hit">
      <div className="hit-image">
        <img src={hit.thumbnail_url} alt={hit.name} />
      </div>
      <div>
        <h1>
          <Snippet hit={hit} attribute="name" />
        </h1>
        <div>
          <p>{hit.description}</p>
        </div>
      </div>
    </article>
  )
}

export default Hit
