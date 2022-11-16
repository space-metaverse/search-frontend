import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import api from 'services/api'

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID as string, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string)

export const config: SearchClient = ({
  ...client,

  async search(requests) {
    const {
      data
    } = await api.post('/search/products', {
      requests
    })

    return data
  },

  async searchForFacetValues(requests) {
    const {
      data
    } = await api.post('/search/products/facet', {
      requests
    })

    return data
  }
})

export default config
