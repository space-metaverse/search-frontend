export interface RoomProps {
  name: string
  stars: number
  hub_id: string
  author: {
    name: string
  }
  hub_slug: string
  description: string | null
  commerce_type: string
}

export interface ProductProps {
  name: string
  room: RoomProps
  price: number
  currency: string
  objectID: string
  quantity: boolean
  model_url: string
  description: string
  product_type: 'digital' | 'physical'
  thumbnail_url: string
}
