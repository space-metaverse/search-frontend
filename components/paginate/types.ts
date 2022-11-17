import type { Dispatch, SetStateAction } from 'react'

export interface BulletProps {
  disabled?: boolean
  selected?: boolean
}

export interface UsePaginateProps {
  pageSize: number
  totalCount: number
  currentPage: number
  siblingCount?: number
}

export interface PaginateProps extends UsePaginateProps {
  onPage: Dispatch<SetStateAction<number>>
  className?: string
}
