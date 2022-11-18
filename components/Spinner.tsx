import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export default styled.span.attrs({
  className: 'spinner'
})`
  width: 2.5rem;
  height: 2.5rem;
  border: ${({ theme }) => `4px solid ${theme.colors.dark['200']}`};
  display: inline-block;
  animation: ${rotate} 1.1s infinite linear;
  border-radius: ${({ theme }) => theme.radius.full};
  border-top-color: ${({ theme }) => theme.colors.blue['400']};
`
