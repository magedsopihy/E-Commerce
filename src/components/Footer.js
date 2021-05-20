import React from 'react'
import styled from 'styled-components'
const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span>ComfySloth</span>
      </h5>
      <h5>All rights reserved</h5>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--clr-black);

  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  span {
    color: var(--clr-primary-5);
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`
export default Footer
