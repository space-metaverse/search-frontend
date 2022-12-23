import { useState, type Dispatch, type SetStateAction } from 'react'

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
    
      > span {
        position: absolute;
        background-color: ${({ theme }) => theme.colors.blue[400]};
      }
    }
  }
`

const Categories: React.FC<CategoriesProps> = ({
  selected,
  categories,
  onSelected
}) => {
  const [tab, setTab] = useState('all')

  return (
    <Sidenav>
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        {categories.map(({ slug, name, children }) => {
          const actived = tab === slug
          const hasChildren = children.length > 0

          return (
            <m.div key={slug}>
              <Category
                onClick={() => {
                  setTab(slug)

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

              {actived && hasChildren && (
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
                    <li key={elem.id}>
                      <m.span>
                        {elem.slug === selected && (
                          <m.span />
                        )}
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
  )
}

export default Categories
