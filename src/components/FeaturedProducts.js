import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useProductsContext } from './../context/products-context'
import Loading from './Loading'
import Error from './Error'
import Product from './Product'
const FeaturedProducts = () => {
  const {
    featuredProducts,
    productsError,
    productsLoading,
  } = useProductsContext()

  if (productsLoading) {
    return <Loading />
  }
  if (productsError) {
    return <Error />
  }

  return (
    <Wrapper className='section'>
      <section className='title'>
        <h2>featured products</h2>
        <div className='underline'> </div>
      </section>
      <section className='section-center featured'>
        {featuredProducts.slice(0, 3).map((product) => {
          return <Product key={product} {...product} />
        })}
      </section>
      <Link to='/products' className='btn'>
        all products
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  margin-top: 4rem;
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`
export default FeaturedProducts
