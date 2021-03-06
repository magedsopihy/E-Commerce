import React from 'react'
import styled from 'styled-components'

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars, reviews }) => {
  const tempStar = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index}>
        {stars >= index ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })

  return (
    <Wrapper>
      <section className='stars'>{tempStar}</section>
      <p className='reveiws'>({reviews} customer reveiw)</p>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
`
export default Stars
