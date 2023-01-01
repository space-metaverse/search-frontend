import {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction
} from 'react'

import { Button } from '@space-metaverse-ag/space-ui'
import { useOutsideClick } from '@space-metaverse-ag/space-ui/hooks'
import { Filter, Check } from '@space-metaverse-ag/space-ui/icons'
import { type CategoryProps } from 'api/search'
import icons from 'components/icons'
import { m, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

import { TabsStyles } from './tabs'

export interface CategoriesProps {
  selected: string
  categories: CategoryProps[]
  onSelected: Dispatch<SetStateAction<string>>
}

const Sidenav = styled.nav`
  gap: 1.5rem;
  top: 5rem;
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 1.5rem;
  position: sticky;
  max-width: 20.5rem;
  border-radius: ${({ theme }) => theme.radius['2xl']};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark[100]};

  @media screen and (max-width: 1199px) {
    top: inherit;
    left: 1.25rem;
    width: calc(100% - 2.5rem);
    height: 0;
    opacity: 0;
    position: absolute;
    max-width: 100%;
    transition: ${({ theme }) => theme.transitions.ease};
    pointer-events: none;
  }
`

const Action = styled(Button)`
  display: none;

  div {
    margin-right: .5rem;

    path {
      stroke: ${({ theme }) => theme.colors.blue[400]};
      transition: ${({ theme }) => theme.transitions.ease};
    }
  }

  &:hover path {
    stroke: ${({ theme }) => theme.colors.blue[500]};
  }

  @media screen and (max-width: 1199px) {
    display: flex;

    &.is-responsive + nav {
      height: fit-content;
      opacity: 1;
      z-index: 99;
      pointer-events: auto;
    }
  }
`

const Category = styled(TabsStyles.Button)`
  display: flex;
  padding: .5rem .5rem .5rem 1rem;
  text-align: left;
  align-items: center;

  small {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme, selected }) => selected ? theme.colors.blue[400] : theme.colors.dark[800]};
    padding: .25rem .5rem;
    transition: ${({ theme }) => theme.transitions.ease};
    margin-left: .5rem;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    border-radius: ${({ theme }) => theme.radius.full};
    background-color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.dark[200]};
  }

  > div {
    margin-right: 1rem;
  }
`

const Dropdown = styled(m.ul)`
  margin: 1rem 0 0 0;
  padding: 0;
  position: relative;

  li {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark[800]};
    cursor: pointer;
    display: flex;
    padding: .75rem 1.25rem;
    align-items: center;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    text-transform: uppercase;

    > span {
      width: 1rem;
      height: 1rem;
      border: ${({ theme }) => `1px solid ${theme.colors.dark[400]}`};
      display: flex;
      position: relative;
      min-width: 1rem;
      align-items: center;
      margin-right: 1rem;
      border-radius: ${({ theme }) => theme.radius.full};
      justify-content: center;
    
      > div {
        width: .25rem;
        height: .25rem;
        opacity: 0;
        position: absolute;
        transition: ${({ theme }) => theme.transitions.ease};
      
        path {
          stroke: ${({ theme }) => theme.colors.white};
          stroke-width: 4px;
        }
      }
    }

    &.is-active {
      > span {
        border-color: ${({ theme }) => theme.colors.blue[400]};
        background-color: ${({ theme }) => theme.colors.blue[400]};
      
        > div {
          width: .625rem;
          height: .625rem;
          opacity: 100;
        }
      }
    }
  }
`

const Categories: React.FC<CategoriesProps> = ({
  selected,
  categories,
  onSelected
}) => {
  const [dropdown, setDropdown] = useState(-1)
  const [responsive, setResponsive] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => setResponsive(false))

  return (
    <>
      <Action
        size="medium"
        color="blue"
        label={(
          <>
            <Filter width={20} height={20} />
            FILTERS
          </>
        )}
        outline
        onClick={() => setResponsive((prev) => !prev)}
        className={responsive ? 'is-responsive' : ''}
      />

      <Sidenav ref={ref}>
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {categories.map(({ slug, name, children }, index) => {
            const actived = selected === slug || dropdown === index
            const hasChildren = children.length > 0

            return (
              <m.div key={slug}>
                <Category
                  onClick={() => {
                    setDropdown(index)

                    if (!hasChildren) onSelected(slug)
                  }}
                  selected={actived}
                >
                  {name}

                  {/* <small>
                    150
                  </small> */}

                  {actived && (
                    <TabsStyles.Bullet
                      key={slug}
                      layoutId="categories"
                    />
                  )}
                </Category>

                {dropdown === index && hasChildren && (
                  <Dropdown
                    exit={{ top: -16, height: 0, opacity: 0 }}
                    animate={{
                      top: 0,
                      height: 'auto',
                      opacity: 100
                    }}
                    initial={{ top: -16, height: 0, opacity: 0 }}
                    transition={{ type: 'spring' }}
                  >
                    {children?.map((elem) => (
                      <li
                        key={elem.id}
                        onClick={() => onSelected(elem.slug)}
                        className={`${elem.slug === selected ? 'is-active' : ''}`}
                      >
                        <m.span>
                          {elem.slug === selected && <Check />}
                        </m.span>

                        {elem.name}
                      </li>
                    ))}
                  </Dropdown>
                )}
              </m.div>
            )
          })}
        </AnimatePresence>
      </Sidenav>
    </>
  )
}

export default Categories
