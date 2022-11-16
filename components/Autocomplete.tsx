
import {
  useRef,
  useMemo,
  Fragment,
  useState,
  useEffect,
  createElement
} from 'react'
import { render } from 'react-dom'
import { usePagination, useSearchBox } from 'react-instantsearch-hooks'

import { type BaseItem } from '@algolia/autocomplete-core'
import { autocomplete, type Render, type AutocompleteOptions } from '@algolia/autocomplete-js'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import { debounce } from '@algolia/autocomplete-shared'
import type { SearchClient } from 'algoliasearch/lite'

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string
  searchClient: SearchClient
}

interface SetInstantSearchUiStateOptions {
  query: string
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  className,
  searchClient,
  ...autocompleteProps
}) => {
  const autocompleteContainer = useRef<HTMLDivElement>(null)

  const {
    query,
    refine: setQuery
  } = useSearchBox()

  const {
    refine: setPage
  } = usePagination()

  const [instantSearchUiState, setInstantSearchUiState] = useState<SetInstantSearchUiStateOptions>({ query })

  const debouncedSetInstantSearchUiState = debounce(
    setInstantSearchUiState,
    500
  )

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: 'instantsearch',
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.label })
          }
        }
      }
    })

    const querySuggestions = createQuerySuggestionsPlugin({
      searchClient,
      indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string,
      getSearchParams() {
        return recentSearches.data!.getAlgoliaSearchParams({
          hitsPerPage: 6
        })
      },
      transformSource({ source }) {
        return {
          ...source,
          sourceId: 'querySuggestionsPlugin',
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.query })
          },
          getItems(params) {
            if (!params.state.query) {
              return []
            }

            return source.getItems(params)
          }
        }
      }
    })

    return [recentSearches, querySuggestions]
  }, [])

  useEffect(() => {
    setQuery(instantSearchUiState.query)
    setPage(0)
  }, [instantSearchUiState])

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      plugins,
      container: autocompleteContainer.current,
      initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: '' })
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query })
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          debouncedSetInstantSearchUiState({
            query: state.query
          })
        }
      },
      renderer: { createElement, Fragment, render: render as Render }
    })

    return () => autocompleteInstance.destroy()
  }, [plugins])

  return <div className={className} ref={autocompleteContainer} />
}

export default Autocomplete
