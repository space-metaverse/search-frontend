import type { Dispatch, SetStateAction } from 'react'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export interface TabsProps {
  options: Array<{
    key: string
    label: string
  }>
  selected: string
  onSelected: Dispatch<SetStateAction<string>>
}

const Button = styled.button<{ selected: boolean }>`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.dark[800]};
  border: none;
  cursor: pointer;
  padding: .75rem 1.5rem;
  z-index: 2;
  position: relative;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-radius: ${({ theme }) => theme.radius.full};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: transparent;

  &,
  path {
    transition: ${({ theme }) => theme.transitions.ease};
  }

  path {
    stroke: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.dark[800]};
  }

  &:hover {
    color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.dark[600]};

    path {
      stroke: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.dark[600]};
    }
  }
`

const Bullet = styled(motion.span)`
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.blue[400]};
`

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.dark[100]};
`

const Tabs: React.FC<TabsProps> = ({
  options,
  selected = 0,
  onSelected
}) => (
  <Wrapper
    role="tablist"
    aria-orientation="horizontal"
  >
    {options.map(({ key, label }) => (
      <Button
        id={`tabs-tab-${key}`}
        key={label}
        role="tab"
        type="button"
        onClick={() => onSelected(key)}
        selected={selected === key}
        tabIndex={selected === key ? 0 : -1}
        aria-selected={selected === key}
      >
        {label}

        {selected === key && (
          <Bullet
            key={label}
            layoutId="underline"
          />
        )}
      </Button>
    ))}
  </Wrapper>
)

const TabsStyles = {
  Button,
  Bullet
}

export {
  TabsStyles
}

export default Tabs
