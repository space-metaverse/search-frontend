import styled from 'styled-components'

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  gap: 3rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 1.5rem 4rem;
  position: relative;
  margin-top: 6rem;

  @media screen and (max-width: 1024px) {
    gap: 1rem;
    padding: 0 1.25rem 2rem 1.25rem;
    margin-top: 5rem;
    flex-direction: column;
  }
`

export default {
  Wrapper,
  Content
}
