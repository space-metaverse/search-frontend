import { DropLeft, DropRight } from '@space-metaverse-ag/space-ui/icons'

import Styles from './styles'
import type { PaginateProps } from './types'
import { usePaginate, DOTS } from './usePaginate'

const Pagination: React.FC<PaginateProps> = ({
  onPage,
  pageSize,
  className,
  totalCount,
  currentPage,
  siblingCount = 1
}) => {
  const paginationRange = usePaginate({
    pageSize,
    totalCount,
    currentPage,
    siblingCount
  })

  if (paginationRange.length <= 1) return null

  const onNext = (): void => onPage((prev) => prev + 1)

  const onPrevious = (): void => onPage((prev) => prev - 1)

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <Styles.List className={`paginate ${className ?? ''}`}>
      <Styles.Bullet
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <DropLeft />
      </Styles.Bullet>

      {paginationRange.map(pageNumber => (
        <Styles.Bullet
          key={pageNumber === DOTS ? Math.random() : pageNumber}
          selected={pageNumber === currentPage}
          onClick={() => pageNumber !== DOTS && onPage(pageNumber as number)}
        >
          {pageNumber === DOTS ? DOTS : pageNumber}
        </Styles.Bullet>
      ))}

      <Styles.Bullet
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        <DropRight />
      </Styles.Bullet>
    </Styles.List>
  )
}

export default Pagination
