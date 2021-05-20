import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroBcg1 from './../assets/hero-bcg.jpeg'
import heroBcg2 from './../assets/hero-bcg-2.jpeg'

const Hero = () => {
  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <h1>
          design your <br />
          comfort zone
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sed
          cum exercitationem cupiditate hic doloribus adipisci culpa dicta nihil
          dolores pariatur iste dignissimos consequatur, nostrum nesciunt,
          quidem necessitatibus voluptatum placeat.
        </p>
        <Link to='/products' className='btn hero-btn'>
          shop now
        </Link>
      </article>
      <article className='img-container'>
        <img src={heroBcg1} alt='hero image' className='main-img' />
        <img src={heroBcg2} alt='hero image' className='accent-img' />
      </article>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
  p {
    line-height: 2;
    font-size: 1rem;
    color: var(--clr-grey-5);
    max-width: 45em;
    margin-bottom: 2rem;
  }

  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    column-gap: 8rem;

    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translate(-50%);
      width: 250px;
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: -8%;
      height: 80%;
      width: 10%;
      background: var(--clr-primary-9);
      border-radius: var(--radius);
    }
  }
`
export default Hero
