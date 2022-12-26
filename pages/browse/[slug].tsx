import { getBaseURL, type RoomProps } from 'api/search'
import axios from 'axios'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

const Room: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <div>
    {data.name}
  </div>
)

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],

  fallback: true
})

export const getStaticProps: GetStaticProps<{ data: RoomProps }> = async ({ params }) => {
  const baseUrl = getBaseURL()

  const res = await axios.get(`${baseUrl}/search/rooms/${params?.slug as string}`)

  const rooms: RoomProps = res.data

  if (!rooms) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: rooms
    },

    revalidate: 60 * 60 * 24 // 24h
  }
}

export default Room
